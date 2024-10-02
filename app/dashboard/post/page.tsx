"use client";
import { useState } from "react";

export default function PostScheduler({ groups }) {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [content, setContent] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const handlePost = async () => {
    const accountsToPost = selectedGroup
      ? selectedGroup.socialAccounts
      : selectedAccounts;

    for (const account of accountsToPost) {
      await fetch("/api/schedule", {
        method: "POST",
        body: JSON.stringify({
          content,
          scheduledTime: new Date(scheduledTime),
          platform: account.platform,
          accountId: account.accountId,
        }),
      });
    }
  };

  return (
    <div>
      <h1>Schedule a Post</h1>

      <select
        onChange={(e) =>
          setSelectedGroup(groups.find((g) => g._id === e.target.value))
        }
      >
        <option value="">Select Group</option>
        {groups.map((group) => (
          <option key={group._id} value={group._id}>
            {group.name}
          </option>
        ))}
      </select>

      {!selectedGroup && (
        <div>
          <h2>Select Individual Accounts</h2>
          {groups.map((group) =>
            group.socialAccounts.map((account) => (
              <div key={account.accountId}>
                <input
                  type="checkbox"
                  value={account.accountId}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAccounts([...selectedAccounts, account]);
                    } else {
                      setSelectedAccounts(
                        selectedAccounts.filter(
                          (a) => a.accountId !== account.accountId
                        )
                      );
                    }
                  }}
                />
                {account.platform} - {account.accountName}
              </div>
            ))
          )}
        </div>
      )}

      <textarea
        placeholder="Write your post here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="datetime-local"
        value={scheduledTime}
        onChange={(e) => setScheduledTime(e.target.value)}
      />
      <button onClick={handlePost}>Post</button>
    </div>
  );
}
