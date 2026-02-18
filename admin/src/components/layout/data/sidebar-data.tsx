import {
  IconApps,
  IconChecklist,
  IconChartLine,
  IconCode,
  IconCoin,
  IconLayoutDashboard,
  IconNotification,
  IconSettings,
  IconTool,
  IconUser,
  IconUsers,
  IconWriting,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { type SidebarData } from "../types"

export const sidebarData: SidebarData = {
  user: {
    name: "Nick Vossburg",
    email: "nick@redsovereign.com",
    avatar: "/logo.png",
  },
  teams: [
    {
      name: "Red Sovereign",
      logo: ({ className }: { className: string }) => (
        <Logo className={cn("invert dark:invert-0", className)} />
      ),
      plan: "Operations",
    },
  ],
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          icon: IconLayoutDashboard,
          items: [
            {
              title: "Overview",
              url: "/",
            },
            {
              title: "Analytics",
              url: "/dashboard-2",
            },
          ],
        },
        {
          title: "Clients",
          url: "/users",
          icon: IconUsers,
        },
        {
          title: "Tasks",
          url: "/tasks",
          icon: IconChecklist,
        },
      ],
    },
    {
      title: "Operations",
      items: [
        {
          title: "Content Queue",
          url: "/tasks",
          badge: "12",
          icon: IconWriting,
        },
        {
          title: "SEO Monitoring",
          url: "/dashboard-3",
          icon: IconChartLine,
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Settings",
          icon: IconSettings,
          items: [
            {
              title: "General",
              icon: IconTool,
              url: "/settings",
            },
            {
              title: "Profile",
              icon: IconUser,
              url: "/settings/profile",
            },
            {
              title: "Billing",
              icon: IconCoin,
              url: "/settings/billing",
            },
            {
              title: "Plans",
              icon: IconChecklist,
              url: "/settings/plans",
            },
            {
              title: "Connected Apps",
              icon: IconApps,
              url: "/settings/connected-apps",
            },
            {
              title: "Notifications",
              icon: IconNotification,
              url: "/settings/notifications",
            },
          ],
        },
        {
          title: "Developers",
          icon: IconCode,
          items: [
            {
              title: "Overview",
              url: "/developers/overview",
            },
            {
              title: "API Keys",
              url: "/developers/api-keys",
            },
            {
              title: "Webhooks",
              url: "/developers/webhooks",
            },
            {
              title: "Events/Logs",
              url: "/developers/events-&-logs",
            },
          ],
        },
      ],
    },
  ],
}
