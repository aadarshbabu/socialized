// import NextAuth from "next-auth";
// import Facebook from "next-auth/providers/facebook";

// const handler = NextAuth({
//   providers: [
//     Facebook({
//       clientId: process.env.FACEBOOK_CLIENT_ID || "",
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
//     }),

//     // ...add more providers here
//   ],
//   callbacks: {
//     async jwt({ token, account }) {
//       // Persist the OAuth access_token to the token right after signin
//       if (account) {
//         token.accessToken = account.access_token;
//       }
//       return token;
//     },
//     async session({ session, token, user }) {
//       // Send properties to the client, like an access_token from a provider.
//       //   session?.accessToken = token.accessToken;
//       console.log("se", session, user, token);
//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";
import { connectToDatabase } from "@/lib/mongodb"; // Your MongoDB connection
import ProductGroup from "@/models/ProductGroup"; // Your group model

const handler = NextAuth({
  providers: [
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    // Add more providers if needed
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.accountId = account.providerAccountId; // Social media account ID
        token.platform = account.provider; // Platform (e.g., facebook, twitter, etc.)
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.accountId = token.accountId;
      session.platform = token.platform;

      // Directly add the social account to the user's group in the database
      // Assuming that you pass the group ID from the frontend to session callback
      const groupId = session.groupId; // This can be passed from frontend
      console.log("g", token);

      if (groupId) {
        await connectToDatabase();

        const group = await ProductGroup.findById(groupId);
        if (group) {
          const socialAccount = {
            platform: session.platform,
            accountName: session.user.name, // Profile name, e.g., Facebook Page name
            accountId: session.accountId,
            accessToken: token.accessToken,
          };

          // Check if the account is already linked
          const accountExists = group.socialAccounts.some(
            (acc) => acc.accountId === socialAccount.accountId
          );

          if (!accountExists) {
            group.socialAccounts.push(socialAccount);
            await group.save(); // Save the updated group with the new social account
          }
        }
      }

      return session;
    },
    async signIn({ user, account, profile }) {
      // Extract groupId from the callbackUrl (query parameters)
      const groupId = null;

      if (groupId && account) {
        // Connect to the database
        await connectToDatabase();

        // Find the selected group by ID
        const group = await ProductGroup.findById(groupId);

        if (!group) {
          throw new Error("Group not found");
        }

        // Add the social account to the group
        const socialAccount = {
          provider: account.provider,
          accessToken: account.access_token,
          accountName: profile.name || profile.email,
          accountId: profile.id || profile.sub,
        };
        group.socialAccounts.push(socialAccount);
        await group.save();
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
