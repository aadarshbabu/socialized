import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import {
  Home,
  ShoppingCart,
  Badge,
  Package,
  Users,
  LineChart,
  Group,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ProfileAvatar } from "../Avatar";
import DynamicAccordion from "../DynamicAccordion";
import { Label } from "@radix-ui/react-dropdown-menu";

export function SideBar() {
  return (
    <div className=" min-w-[280px]">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-6 gap-3">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-4 text-muted-foreground transition-all hover:text-primary"
        >
          <Home className="h-4 w-4" />
          Calender
        </Link>

        <div className=" flex flex-col">
          <Label className=" flex items-center gap-3 rounded-lg px-3 py-2 font-semibold">
            Groups
          </Label>
          <DynamicAccordion></DynamicAccordion>
        </div>
      </nav>
    </div>
  );
}
