"use client";
import { signIn } from "next-auth/react";
import { useState, useEffect, Key } from "react";
import { useAuth } from "@clerk/nextjs";

export default function Dashboard() {
  const { sessionId } = useAuth();
  const [groupId, setGroupId] = useState("");
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    // Fetch user's groups from the backend
    const res = await fetch("/api/groups");

    const data = await res.json();
    console.log("re", data);
    setGroups(data.groups);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const addSocialAccount = async (platform: string) => {
    signIn(platform).then((result) => {
      console.log("res", result);
      if (result?.ok) {
        //   // Assuming NextAuth returns the account details after authentication
        //   const { accountName, accountId, accessToken } = result;

        //   // Send the new social account data to the server
        //   await fetch(`/api/groups/${groupId}/accounts`, {
        //     method: "POST",
        //     body: JSON.stringify({
        //       groupId,
        //       socialAccount: {
        //         platform,
        //         accountName,
        //         accountId,
        //         accessToken,
        //       },
        //     }),
        //   });
        fetchGroups(); // Refresh the group data after adding the account
      }
    });
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

      <button onClick={() => addSocialAccount("facebook")}>
        Connect Facebook
      </button>
      <button onClick={() => addSocialAccount("instagram")}>
        Connect Instagram
      </button>
      <button onClick={() => addSocialAccount("linkedin")}>
        Connect LinkedIn
      </button>
      <button onClick={() => addSocialAccount("twitter")}>
        Connect Twitter
      </button>

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
