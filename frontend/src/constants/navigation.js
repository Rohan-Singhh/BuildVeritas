import { Rocket, Users, LifeBuoy, BookOpen, Star, DollarSign } from "lucide-react";

export const NAV_ITEMS = [
  {
    id: 'features',
    label: 'Features',
    icon: Rocket,
    path: '/features',
    type: 'link'
  },
  {
    id: 'pricing',
    label: 'Pricing',
    icon: DollarSign,
    type: 'scroll',
    scrollTo: 'pricing'
  },
  {
    id: 'about',
    label: 'About',
    icon: Users,
    path: '/about',
    type: 'link'
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: LifeBuoy,
    type: 'scroll',
    scrollTo: 'contact'
  },
  {
    id: 'blogs',
    label: 'Blogs',
    icon: BookOpen,
    path: '/blogs',
    type: 'link'
  },
  {
    id: 'testimonials',
    label: 'Testimonials',
    icon: Star,
    type: 'scroll',
    scrollTo: 'testimonials'
  }
];
