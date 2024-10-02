import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getIconUrl } from "@/utils/getIconURl";
import Image from "next/image";
import fb from "@/assets/facebookIcon.png";

export function ProfileAvatar({
  url = "https://github.com/shadcn.png",
  name = "avatar",
}: {
  url: string;
  name: string;
}) {
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={url} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
}

export const ProfileAvatarWithBadge = ({
  url,
  name,
  accountName,
}: {
  url: string;
  name: string;
  accountName: string;
}) => {
  const iconUrl = getIconUrl(accountName);

  return (
    <div className="relative w-8 h-8">
      {/* Avatar */}
      <img src={url} alt={name} className="w-full h-full rounded-full" />

      <Image
        width={12}
        height={33}
        src={iconUrl}
        alt={`${name} badge`}
        className="absolute bottom-0 right-0 w-3 h-3 rounded-full"
      />
    </div>
  );
};
