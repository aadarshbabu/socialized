import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { Group } from "lucide-react";
import { ProfileAvatar, ProfileAvatarWithBadge } from "./Avatar";

const accordionData = [
  {
    groupName: "The Coder",
    channels: [
      { name: "Facebook", url: "https://github.com/shadcn.png" },
      { name: "Instagram", url: "https://github.com/shadcn.png" },
    ],
  },
  {
    groupName: "Social",
    channels: [
      { name: "Linkedin", url: "https://github.com/shadcn.png" },
      { name: "Twitter", url: "https://github.com/shadcn.png" },
    ],
  },
  {
    groupName: "Personal",
    channels: [
      { name: "Gmail", url: "https://github.com/shadcn.png" },
      { name: "WhatsApp", url: "https://github.com/shadcn.png" },
    ],
  },
];

export default function DynamicAccordion() {
  return (
    <Accordion type="single" collapsible>
      {accordionData.map((group, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="hover:bg-primary-foreground w-full">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Group />
              {group.groupName}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible>
              {group.channels.map((channel, idx) => (
                <AccordionItem key={idx} value={`subitem-${idx}`}>
                  <AccordionTrigger className="hover:bg-primary-foreground w-full">
                    <div className="flex items-center gap-3 rounded-lg px-4 py-2 text-muted-foreground transition-all hover:text-primary">
                      <ProfileAvatarWithBadge
                        url={channel.url}
                        name={channel.name}
                        accountName={channel.name}
                      />
                      {channel.name}
                    </div>
                  </AccordionTrigger>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
