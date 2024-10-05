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
import User from "@/models/ProductGroup"; // Import the User model
import { getClerkUserId } from "@/utils/getClerkUrserId";
import SocialAccountSchema from "@/models/SocialAccountSchema";
import InstagramProvider from "next-auth/providers/instagram";
import LinkedInProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";

const handler = NextAuth({
  providers: [
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      client: {
        redirect_uris: ["https://localhost:3000/api/auth/callback/instagram"],
      },
      authorization: {
        // Define the required scopes here
        params: {
          scope: "user_profile,user_media",
        },
      },
    }),
    // LinkedInProvider({
    //   clientId: process.env.LINKEDIN_CLIENT_ID || "",
    //   clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
    // }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      version: "2.0",
    }),
    // Add more providers if needed
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accountId = account?.providerAccountId;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.accountId = token.accountId;
      return session;
    },
    async signIn({ user, account }) {
      connectToDatabase();
      const socialSchema = await SocialAccountSchema.find({
        accountId: user.id,
      });

      if (socialSchema[0]?.accountId === user?.id) {
        // console.log("true", socialSchema[0]?.accountId, user?.id);
        return true;
      }

      const socialAccount = {
        platform: account?.provider,
        accessToken: account?.access_token,
        accountId: user.id,
        picture: user.image,
        email: user.email,
        exp: account?.expires_at,
      };
      try {
        const saveSocialAccount = new SocialAccountSchema(socialAccount);
        saveSocialAccount.save();
      } catch (error) {
        console.log("e", error);
        return false;
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
