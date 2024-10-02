import instagram from "@/assets/instagramIcon.png";
import twitter from "@/assets/twitter.png";
import facebook from "@/assets/facebookIcon.png";
import linkedin from "@/assets/linkedin.png";

export const getIconUrl = (iconName: string) => {
  const iconUrls: { [key in typeof iconName]: any } = {
    facebook,
    instagram,
    linkedin,
    twitter,
  };

  return iconUrls[iconName.toLocaleLowerCase()] || ""; // Return empty string if no icon found
};
