import { DigitalProduct, DigitalService, WorkProject, Testimonial } from "./types";

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: "prod-1",
    name: "Veloce Premium UI Kit",
    category: "Figma Assets",
    description: "The ultimate minimalist high-contrast design system for modern web and SaaS applications. Built with flexible variables, full auto-layout, and dark-theme first design tokens.",
    price: 49,
    features: [
      "250+ responsive UI components",
      "Dark and Light mode styles included",
      "Fully documented design tokens",
      "Lifetime updates and community support"
    ],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    salesCount: 342,
    fileSize: "48.2 MB",
    fileFormat: ".fig"
  },
  {
    id: "prod-2",
    name: "Aura Minimal Icon Suite",
    category: "Vector Assets",
    description: "500+ hand-crafted vector icons with a subtle glowing dual-tone style, optimized for high-end dark user interfaces and digital terminals.",
    price: 19,
    features: [
      "520 unique responsive icons",
      "Included as SVG, Figma, and React Components",
      "Optimized 24px grid alignment",
      "Commercial use license"
    ],
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    salesCount: 812,
    fileSize: "12.5 MB",
    fileFormat: ".svg / .fig / .tsx"
  },
  {
    id: "prod-3",
    name: "Synapse SaaS Framer Template",
    category: "Web Templates",
    description: "A production-grade Framer template tailored for tech startups and AI products. Includes gorgeous scroll-linked interactive states and high-performance layouts.",
    price: 69,
    features: [
      "8 fully responsive pages",
      "Dynamic interactive search and filter",
      "Advanced motion design integrations",
      "SEO optimized layout"
    ],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    salesCount: 198,
    fileSize: "18.1 MB",
    fileFormat: "Framer Link"
  },
  {
    id: "prod-4",
    name: "Apex Responsive Mockups",
    category: "Graphics Pack",
    description: "Photorealistic 3D clay device mockups for laptops, phones, and tablets. Perfect for showing off portfolio items, presentation slide-decks, or landing pages.",
    price: 29,
    features: [
      "15 modular clay device structures",
      "Fully adjustable lighting and angles",
      "Smart-object layers for quick pasting",
      "High-resolution 4K rendering output"
    ],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    salesCount: 264,
    fileSize: "156.4 MB",
    fileFormat: ".psd / .fig"
  },
  {
    id: "prod-5",
    name: "Nexus NextJS App Boilerplate",
    category: "Developer Starter Kits",
    description: "The complete production-ready tech stack starter kit. Pre-configured with Next.js 14 App Router, Tailwind CSS, NextAuth, Prisma ORM, and Stripe billing API.",
    price: 89,
    features: [
      "Next.js App Router (TypeScript)",
      "Ready-to-use Prisma database schemas",
      "Fully integrated Stripe webhook handlers",
      "Pre-built Auth & User dashboard layouts"
    ],
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    salesCount: 129,
    fileSize: "4.8 MB",
    fileFormat: ".zip (GitHub Repo Access)"
  },
  {
    id: "prod-6",
    name: "Nebula Interactive Shader Presets",
    category: "Developer Starter Kits",
    description: "A collection of customizable WebGL / GLSL interactive background shader code blocks. Add jaw-dropping fluid art and organic gravity simulations to your sites.",
    price: 39,
    features: [
      "12 custom interactive shader structures",
      "Lightweight canvas loaders for React/Vite",
      "Custom mouse/touch pointer reaction scripts",
      "High framerate optimization (60+ FPS)"
    ],
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    salesCount: 154,
    fileSize: "3.2 MB",
    fileFormat: ".glsl / .tsx"
  }
];

export const DIGITAL_SERVICES: DigitalService[] = [
  {
    id: "serv-1",
    name: "Custom UI/UX App Design",
    category: "Design",
    description: "High-fidelity digital interface design from concept to final design specs. We build customized design systems, mockups, and prototypes focused entirely on user retention and visual sleekness.",
    basePrice: 1200,
    deliveryTime: "7 - 14 Days",
    features: [
      "Custom responsive interface concepts",
      "Interactive Figma prototyping",
      "Custom components design system",
      "Developer handoff documentation"
    ],
    iconName: "Palette"
  },
  {
    id: "serv-2",
    name: "Full-Stack Web Development",
    category: "Development",
    description: "End-to-end development of lightning-fast web applications. We utilize modern frameworks (React, Next.js, Vite) and fast server structures to deliver highly responsive, pixel-perfect websites.",
    basePrice: 2500,
    deliveryTime: "14 - 30 Days",
    features: [
      "Pixel-perfect responsive coding",
      "Dynamic interactive features & animations",
      "Database integration & security rules",
      "Speed auditing (95+ Lighthouse Score)"
    ],
    iconName: "Code2"
  },
  {
    id: "serv-3",
    name: "Modern Brand Identity Design",
    category: "Design",
    description: "Establish a memorable, premium market presence. We design custom typographic layout guides, logomarks, color tokens, and corporate visual assets tailored for tech-forward businesses.",
    basePrice: 800,
    deliveryTime: "5 - 10 Days",
    features: [
      "2 - 3 custom logo concept options",
      "Premium typography pairs selector",
      "Cohesive brand layout style guide",
      "Vector export formats for print & web"
    ],
    iconName: "Sparkles"
  },
  {
    id: "serv-4",
    name: "Performance & SEO Optimization",
    category: "Consultation",
    description: "Maximize your product's loading speeds, accessibility, search ranks, and user conversion. We review and rewrite existing codebases to achieve optimal loading times and rankings.",
    basePrice: 450,
    deliveryTime: "3 - 5 Days",
    features: [
      "Deep technical performance diagnostics",
      "Webpack/Vite bundling improvements",
      "Meta tags & semantic SEO restructuring",
      "Step-by-step optimization action report"
    ],
    iconName: "TrendingUp"
  }
];

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "proj-1",
    title: "Vortex NFT Marketplace",
    category: "UI/UX & Frontend Development",
    description: "Designed and engineered an ultra-slick dark Web3 asset gallery featuring seamless live auctions, WebGL charts, and wallet authentications.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    year: "2025",
    stats: { label: "Trading Volume", value: "$4.2M+" }
  },
  {
    id: "proj-2",
    title: "Enigma AI Analytics Suite",
    category: "SaaS Design & Development",
    description: "Constructed an immersive workspace platform for visual data pipelines. Utilized responsive dashboards, drag-and-drop nodes, and rich dark charts.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    year: "2025",
    stats: { label: "Active Users", value: "85,000+" }
  },
  {
    id: "proj-3",
    title: "Solstice Fitness App",
    category: "Mobile Design Systems",
    description: "A gorgeous, dark, energetic native app design language centering high-contrast typography, interactive graphs, and smooth motion states.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    year: "2026",
    stats: { label: "App Store Rating", value: "4.9 ★" }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    clientName: "David Miller",
    company: "CTO, SyncLabs",
    feedback: "The Veloce UI Kit changed our entire startup development cycle. The consistency, dark aesthetics, and Figma structure are simply world-class. APP delivers unmatched excellence.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "t-2",
    clientName: "Elena Rostova",
    company: "Founder, Bloom Creative",
    feedback: "We hired APP for custom web development. The output was incredibly fast, pixel-perfect, and our conversion rate jumped by 42% on launch day. Highly recommend their professional services!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "t-3",
    clientName: "Marcus Vance",
    company: "Product Owner, ApexFlow",
    feedback: "Their vector assets and Next.js boilerplate saved us hundreds of design-and-development hours. True digital craftsmanship. Their email support is fast, helpful, and very dedicated.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  }
];

export const BRAND_INFO = {
  name: "APP",
  tagline: "Digital Products & Services",
  headline: "Crafting High-End Digital Products & Immersive Web Solutions.",
  subHeadline: "We are APP. A specialized digital boutique focused on sleek dark aesthetics, bespoke code engineering, and high-conversion vector assets. Explore our products or engineer your custom vision.",
  email: "aungpaingphyo.digitalstore@gmail.com",
  phone: "009337438338",
  location: "Yangon, Myanmar",
  foundingYear: "2024",
  stats: [
    { value: "4,200+", label: "Product Sales" },
    { value: "99.4%", label: "Happy Clients" },
    { value: "50+", label: "Custom Projects" },
    { value: "5.0 ★", label: "Average Rating" }
  ]
};

export const FAQS = [
  {
    question: "ဝယ်ယူထားတဲ့ Digital Product တွေကို ဘယ်လိုရရှိမှာလဲ?",
    answer: "ဝယ်ယူမှုအောင်မြင်ပြီးတာနဲ့ သင့်ရဲ့ email ထံသို့ direct download links တွေ ပို့ပေးသွားမှာဖြစ်သလို၊ ဒီ website ရဲ့ confirmation screen မှာလည်း တခါတည်း download ဆွဲယူနိုင်မှာဖြစ်ပါတယ်။"
  },
  {
    question: "Custom Project တစ်ခုအတွက် Services အပ်ချင်ရင် ဘယ်လိုလုပ်ရမလဲ?",
    answer: "ကျွန်တော်တို့ရဲ့ Instant Project Cost Estimator ကနေ budget တွက်ချက်ပြီး တိုက်ရိုက် 'Request Quote' တင်နိုင်ပါတယ်။ ဒါမှမဟုတ် aungpaingphyo.digitalstore@gmail.com သို့ တိုက်ရိုက် email ပို့ပြီး သော်လည်းကောင်း၊ ဖုန်း 009337438338 သို့ တိုက်ရိုက်ခေါ်ဆိုပြီးသော်လည်းကောင်း ဆွေးနွေးနိုင်ပါတယ်။"
  },
  {
    question: "Digital Products တွေအတွက် Commercial Use License ရရှိမှာလား?",
    answer: "ဟုတ်ကဲ့ပါ၊ ကျွန်တော်တို့ဆီက ဝယ်ယူတဲ့ premium templates၊ boilerplate နဲ့ icons အားလုံးမှာ unlimited personal နဲ့ commercial projects တွေအတွက် အသုံးပြုနိုင်တဲ့ commercial use license တစ်ခါတည်း ပါဝင်ပြီးသားဖြစ်ပါတယ်။"
  },
  {
    question: "ငွေပေးချေမှုစနစ်က ဘယ်လိုလဲ?",
    answer: "ကျွန်တော်တို့ checkout system မှာ နိုင်ငံတကာ Visa, Mastercard, PayPal တွေအပြင် ပြည်တွင်း KBZPay, CBPay, WavePay ငွေပေးချေမှုတွေနဲ့ လွယ်ကူစွာ ပေးချေနိုင်အောင် ဆောင်ရွက်ပေးထားပါတယ်။"
  }
];
