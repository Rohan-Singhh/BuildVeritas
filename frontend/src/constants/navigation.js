import {
  Rocket,
  Users,
  LifeBuoy,
  BookOpen,
  Star,
  DollarSign,
  Camera,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    id: "features",
    label: "Features",
    icon: Rocket,
    path: "/features",
    type: "link",
  },
  {
    id: "pricing",
    label: "Pricing",
    icon: DollarSign,
    path: "/pricing",
    type: "link",
  },
  {
    id: "about",
    label: "About",
    icon: Users,
    path: "/about",
    type: "link",
  },
  {
    id: "contact",
    label: "Contact",
    icon: LifeBuoy,
    type: "link",
    path: "/contact",
  },
  {
    id: "blogs",
    label: "Blogs",
    icon: BookOpen,
    path: "/blogs",
    type: "link",
  },
  {
    id: "testimonials",
    label: "Testimonials",
    icon: Star,
    type: "link",
    path: "/testimonials",
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: Camera,
    type: "link",
    path: "/gallery",
  },
];
