export type Testimonial = { quote: string; name: string; location?: string };

export const business = {
  name: "J&W Landscaping",

  ownerName: "",

  phone: "",

  email: "",

  address: "",

  serviceAreas: [] as string[],

  hours: "",

  description:
    "J&W Landscaping offers outdoor property improvements and landscaping services, including sod, sprinklers, rock work, repairs, and seasonal services.",

  yearsInBusiness: null as number | null,

  social: {
    facebook: "",
    instagram: "",
  },

  testimonials: [] as Testimonial[],
} as const;

export type Service = {
  id: string;
  title: string;
  summary: string;
  photo: string | null;
  icon: "repairs" | "demo" | "rock" | "sprinkler" | "sod" | "snow";
};

export const services: Service[] = [
  {
    id: "repairs",
    title: "Repairs",
    summary: "Rebuilding and restoring outdoor features — walls, borders, edging and more.",
    photo: "retaining-wall-after",
    icon: "repairs",
  },
  {
    id: "rock",
    title: "Rock Work",
    summary: "Decorative rock beds and borders that are tidy, durable and low-maintenance.",
    photo: "rock-bed-curve",
    icon: "rock",
  },
  {
    id: "sod",
    title: "Sod Installation",
    summary: "Ground preparation and fresh sod for a full, even lawn from day one.",
    photo: "side-yard-after",
    icon: "sod",
  },
  {
    id: "sprinklers",
    title: "Sprinkler Services",
    summary: "Sprinkler work to keep lawns and beds watered properly through the season.",
    photo: null,
    icon: "sprinkler",
  },
  {
    id: "demo",
    title: "Demolition",
    summary: "Clearing out old features to make way for something new.",
    photo: null,
    icon: "demo",
  },
  {
    id: "snow",
    title: "Snow Removal",
    summary: "Seasonal snow clearing so your property stays accessible all winter.",
    photo: null,
    icon: "snow",
  },
];

export const highlights = [
  "Landscaping & Outdoor Work",
  "Sod & Sprinkler Services",
  "Rock, Repairs & More",
  "Seasonal Snow Removal",
];
