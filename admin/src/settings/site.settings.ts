import { adminAndOwnerOnly, adminOwnerAndStaffOnly } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";

export const siteSettings = {
  name: "Acharyakulam",
  description: "Acharyakulam.",
  logo: {
    url: "/logo/logo.jpeg",
    alt: "retailunnati.com",
    href: "/",
    width: 128,
    height: 52,
  },

  defaultLanguage: "en",
  author: {
    name: "Acharyakulam",
    websiteUrl: "https: //retailunnati.com",
    address: `Acharyakulam Pvt Ltd
    Plot No: 130 | Phase-1 | Industrial Area | Chandigarh`,
    phone: "+91 77430 42380",
  },

  headerLinks: [],
  authorizedLinks: [
    {
      href: ROUTES.PROFILE_UPDATE,
      labelTransKey: "authorized-nav-item-profile",
    },
    {
      href: ROUTES.LOGOUT,
      labelTransKey: "authorized-nav-item-logout",
    },
  ],
  
  currencyCode: "INR",
  sidebarLinks: {
    admin: [
      {
        href: ROUTES.DASHBOARD, 
        label: "Dashboard",
        icon: "DashboardIcon",
      },
      {
        href: ROUTES.DASHBOARD, 
        label: "checking",
        icon: "DashboardIcon",
      },
      {
        href: ROUTES.COURSES,
        label: "Courses",
        icon: "ShopIcon",
      },
      {
        href: ROUTES.EXAMS,
        label: "Exams",
        icon: "ShopIcon",
      },
      {
        href: ROUTES.EXAM_SECTIONS,
        label: "Exam Sections",
        icon: "ShopIcon",
      },
      // {
      //   href: ROUTES.EXAM_SECTIONS,
      //   label: "Marking Scheme",
      //   icon: "ShopIcon",
      // },
      {
        href: ROUTES.EXAM_QUESTIONS,
        label: "Questions",
        icon: "ShopIcon",
      },
      {
        href: ROUTES.QUESTION_TYPE,
        label: "Questions Type",
        icon: "ShopIcon",
      },
      {
        href: ROUTES.MARKING_SCHEME,
        label: "Marking Scheme",
        icon: "ShopIcon",
      },
      // {
      //   href: ROUTES.TEACHERS,
      //   label: "Teachers",
      //   icon: "ShopIcon",
      // },
      {
        href: ROUTES.USERS,
        label: "Students",
        icon: "UsersIcon",
      },
      {
        href: ROUTES.TAGS,
        label: "Tags",
        icon: "TagIcon",
      },
      {
        href: ROUTES.RESULTS,
        label: "Results",
        icon: "TagIcon",
      },
      {
        href: ROUTES.BATCH,
        label: "Batch",
        icon: "TagIcon",
      },    
      {
        href: ROUTES.CLASS,
        label: "Class",
        icon: "TagIcon",
      },    
      {
        href: ROUTES.CLASS_STREAM,
        label: "Class Stream",
        icon: "TagIcon",
      },    
      {
        href: ROUTES.BOOK,
        label: "Book",
        icon: "SettingsIcon",
      },
      {
        href: ROUTES.STUDYMATERIAL,
        label: "Study Material/Notes",
        icon: "TagIcon",
      },
      // {
      //   href: ROUTES.VIDEOS,
      //   label: "Videos",
      //   icon: "SettingsIcon",
      // },
      {
        href: ROUTES.SETTINGS,
        label: "Settings",
        icon: "SettingsIcon",
      },
      
      
    ], 
    
    shop: [
      {
        href: (shop: string) => `/${shop}${ROUTES.ORDERS}`,
        label: "Orders",
        icon: "OrdersIcon",
        permissions: adminOwnerAndStaffOnly,
      },
    ],
  },

  product: {
    placeholder: "/product-placeholder.svg",
  },
  avatar: {
    placeholder: "/avatar-placeholder.svg",
  },

};
