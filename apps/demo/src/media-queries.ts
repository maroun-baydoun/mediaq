export type MediaQueryCard = {
  description: string;
  media: string;
  name: string;
};

export const mediaQueries: MediaQueryCard[] = [
  {
    description: "You prefer dark mode.",
    media: "(prefers-color-scheme: dark)",
    name: "Dark mode",
  },
  {
    description: "You have asked for less motion.",
    media: "(prefers-reduced-motion: reduce)",
    name: "Reduced motion",
  },
  {
    description: "You are using a touch-first pointer, like a finger.",
    media: "(pointer: coarse)",
    name: "Touch pointer",
  },
  {
    description: "You can hover with a mouse or trackpad.",
    media: "(hover: hover)",
    name: "Hover support",
  },
  {
    description: "Your device is at tablet width or wider.",
    media: "(min-width: 48rem)",
    name: "Tablet width",
  },
  {
    description: "Your device is at desktop width or wider.",
    media: "(min-width: 64rem)",
    name: "Desktop width",
  },
  {
    description: "Your device is wider than it is tall.",
    media: "(orientation: landscape)",
    name: "Landscape",
  },
  {
    description: "You have asked for more contrast.",
    media: "(prefers-contrast: more)",
    name: "High contrast",
  },
];
