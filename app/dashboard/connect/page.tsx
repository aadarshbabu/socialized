"use client";
import { signIn, useSession } from "next-auth/react";
import { useState, Key, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { sessionId, userId } = useAuth();
  const [groupId, setGroupId] = useState("");
  const [groups, setGroups] = useState([]);
  const { data: session } = useSession();
  const { user } = useUser();

  console.log("sssss", user);

  const saveUser = async () => {
    await fetch(`/api/user`, {
      method: "POST",
      body: JSON.stringify({
        clerkId: userId,
        accountId: session?.accountId,
        email: user?.emailAddresses[0].emailAddress,
        name: user?.fullName,
      }),
    });
  };

  useEffect(() => {
    if (session) {
      saveUser();
    }
  }, [session]);

  // const fetchGroups = async () => {
  //   // Fetch user's groups from the backend
  //   const res = await fetch("/api/groups");

  //   const data = await res.json();
  //   console.log("re", data);
  //   setGroups(data.groups);
  // };

  // useEffect(() => {
  //   fetchGroups();
  // }, []);

  // console.log("Session.Data", data);
  // if (data.data) {
  //   console.log("Session.Data", data);
  // }

  const addSocialAccount = async (platform: string) => {
    signIn(platform, { callbackUrl: "/dashboard/connect" });
    // fetchGroups();

    // .then((result) => {
    //   console.log("res", result);
    //   if (result?.ok) {
    //   // Assuming NextAuth returns the account details after authentication
    //   const { accountName, accountId, accessToken } = result;

    //   // Send the new social account data to the server
    //
    // Refresh the group data after adding the account
    //   }
    // });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <select onChange={(e) => setGroupId(e.target.value)}>
        <option value="">Select Group</option>
        {groups?.map((group) => (
          <option key={group._id} value={group._id}>
            {group.name}
          </option>
        ))}
      </select>
      <div className=" flex gap-3">
        <Button onClick={() => addSocialAccount("facebook")}>
          Connect Facebook
        </Button>
        <Button onClick={() => addSocialAccount("instagram")}>
          Connect Instagram
        </Button>
        <Button onClick={() => addSocialAccount("linkedin")}>
          Connect LinkedIn
        </Button>
        <Button onClick={() => addSocialAccount("twitter")}>
          Connect Twitter
        </Button>
      </div>

      <div>
        <h2>Groups</h2>
        {groups?.map((group) => (
          <div key={group._id}>
            <h3>{group.name}</h3>
            <ul>
              {group?.socialAccounts.map(
                (account: {
                  accountId: Key | null | undefined;
                  platform: string;

                  accountName: string;
                }) => (
                  <li key={account.accountId}>
                    {account.platform} - {account.accountName}
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
