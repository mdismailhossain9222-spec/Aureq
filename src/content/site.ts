export const site = {
  brand: "Aureq",
  nav: ["Collection", "Craft", "Materials", "Lookbook"],
  hero: {
    eyebrow: "Est. 2026 — Private Atelier",
    title: "Wear the quiet.",
    subtext:
      "Sculptural accessories in titanium, sapphire, and champagne gold. Made slow. Worn forever.",
    ctaPrimary: "Explore Collection",
    ctaSecondary: "Book a Fitting",
    videoUrl:
      "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8",
    poster: "assets/img/hero.jpg",
    scrollLabel: "Scroll",
    shop: "Shop",
  },
  collection: [
    {
      name: "Titan Chrono",
      tag: "Watches",
      image: "assets/img/watch.jpg",
      featured: true,
    },
    { name: "Onyx Signet", tag: "Rings", image: "assets/img/ring.jpg" },
    { name: "Aero Frame", tag: "Eyewear", image: "assets/img/eyewear.jpg" },
    { name: "Noir Tote", tag: "Leather", image: "assets/img/bag.jpg" },
    { name: "Aureq Chain", tag: "Necklaces", image: "assets/img/chain.jpg" },
  ],
  craft: [
    {
      n: "01",
      title: "Design",
      body: "Every piece begins as a sketch in our atelier. Silhouette first, detail second, always by hand.",
      image: "assets/img/ring.jpg",
      pos: "50% 50%",
    },
    {
      n: "02",
      title: "Material",
      body: "We source titanium, sapphire crystal, and 18k vermeil from certified suppliers. No shortcuts.",
      image: "assets/img/chain.jpg",
      pos: "50% 42%",
    },
    {
      n: "03",
      title: "Finish",
      body: "Each surface is hand-polished across 72 hours. The last 5% is where the quiet lives.",
      image: "assets/img/craft-3.jpg",
      pos: "50% 62%",
    },
  ],
  materials: ["Sapphire Glass", "Titanium", "Vegetable-Tanned Leather", "18k Vermeil", "Carbon Weave"],
  materialsBackdrop: "assets/img/hero.jpg",
  stats: [
    { value: 0.3, suffix: "mm", label: "Case thickness", decimals: 1 },
    { value: 72, suffix: "h", label: "Battery-free movement", decimals: 0 },
    { value: 100, suffix: "%", label: "Recycled titanium", decimals: 0 },
  ],
  lookbook: {
    title: "Lookbook — Volume 01",
    titleLine1: "Lookbook",
    titleLine2: "Volume 01",
    link: "See all looks",
    items: [
      {
        image: "assets/img/look-1.jpg",
        pos: "50% 28%",
        caption: "Look 01 — Onyx Series",
        alt: "Model in profile wearing sculptural gold ear cuffs and a thin chain",
      },
      {
        image: "assets/img/look-2.jpg",
        pos: "50% 50%",
        caption: "Look 02 — Titan Stack",
        alt: "Wrist wearing a titanium watch stacked with a thin gold bracelet",
      },
      {
        image: "assets/img/craft-3.jpg",
        pos: "50% 22%",
        caption: "Look 03 — Vermeil Hold",
        alt: "Hands holding a champagne-gold ring against a dark workshop",
      },
      {
        image: "assets/img/look-4.jpg",
        pos: "50% 38%",
        caption: "Look 04 — Silhouette",
        alt: "Silhouette of a shoulder and neck wearing a minimal gold chain",
      },
      {
        image: "assets/img/eyewear.jpg",
        pos: "50% 58%",
        caption: "Look 05 — Aero Still",
        alt: "Titanium sunglasses on black stone catching a hard side light",
      },
    ],
  },
  cta: {
    eyebrow: "Private Atelier — By Appointment",
    title: "Your next signature piece starts here.",
    subtext:
      "Book a private fitting. See the collection in person. No commitment, no pressure. Just quiet craft.",
    primary: "Book a Fitting",
    secondary: "View Collection",
  },
  footer: {
    copyright: "© 2026 Aureq. All rights reserved.",
    links: ["Privacy", "Terms", "Contact"],
  },
} as const;

export type Site = typeof site;
export type CollectionItem = {
  readonly name: string;
  readonly tag: string;
  readonly image: string;
  readonly featured?: boolean;
};
export type CraftStep = (typeof site.craft)[number];
export type LookItem = (typeof site.lookbook.items)[number];
export type Stat = (typeof site.stats)[number];
