"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function Dashboard() {
  const { sessionId, userId } = useAuth();
  const [groupName, setGroupName] = useState("");
  const [postContent, setPostContent] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);

  const createGroup = async () => {
    const res = await fetch("/api/groups", {
      method: "POST",
      body: JSON.stringify({ name: groupName, ownerId: userId }),
    });
    const data = await res.json();
    console.log("Created group:", data.group);
  };

  const schedulePost = async () => {
    const res = await fetch("/api/schedule", {
      method: "POST",
      body: JSON.stringify({
        content: postContent,
        scheduledTime: new Date(scheduledTime),
        platform: "facebook", // Simplified for demo
        accountId: "1235",
      }),
    });
    const data = await res.json();
    console.log("Scheduled post:", data.post);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button onClick={createGroup}>Create Group</button>

      <input
        type="text"
        placeholder="Post Content"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <input
        type="datetime-local"
        value={scheduledTime}
        onChange={(e) => setScheduledTime(e.target.value)}
      />
      <button onClick={schedulePost}>Schedule Post</button>
    </div>
  );
}
