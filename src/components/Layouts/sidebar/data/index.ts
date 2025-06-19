import * as Icons from "../icons";
import { UI_ELEMENTS } from "./ui-elements-list";
import { useTranslations } from "next-intl";

export const NAV_DATA = [
  {
    label: "AUTH",
    icon: Icons.Authentication,
    items: [
      {
        title: "Sign In",
        url: "/auth/signin",
        icon: Icons.Authentication,
        items: [],
      },
      {
        title: "Sign Up",
        url: "/auth/signup",
        icon: Icons.Authentication,
        items: [],
      },
      {
        title: "Reset Password",
        url: "/auth/forgot-password",
        icon: Icons.Authentication,
        items: [],
      },
    ],
  },
  {
    label: "MAIN MENU",
    items: [
      {
        title: "User session",
        url: "/session",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Protected page",
        url: "/protected",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
    ],
  },
  {
    label: "SUPPORT",
    items: [
      {
        title: "Messages",
        icon: Icons.Chat,
        badge: 9,
        items: [],
        isPro: true,
      },
      {
        title: "Inbox",
        icon: Icons.Inbox,
        items: [],
        isPro: true,
      },
    ],
  },
];
