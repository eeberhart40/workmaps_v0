import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define colors
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(222.2, 84%, 4.9%)",
        card: "hsl(0, 0%, 100%)",
        cardForeground: "hsl(222.2, 84%, 4.9%)",
        popover: "hsl(0, 0%, 100%)",
        popoverForeground: "hsl(222.2, 84%, 4.9%)",
        primary: "hsl(85, 94%, 65%)",
        primaryForeground: "hsl(120, 100%, 5%)",
        secondary: "hsl(210, 40%, 96.1%)",
        secondaryForeground: "hsl(222.2, 47.4%, 11.2%)",
        "positive-100": "#EFFED9",
        "positive-200": "#228620",
        cardTertiary: "#ECEDF4",
      },
      borderRadius: {
        DEFAULT: "18px",
      },
      // Breakpoints for responsive design
      screens: {
        xxs: "24em", // 384px
        xs: "36em", // 576px
        sm: "48em", // 768px
        md: "62em", // 992px
        lg: "75em", // 1200px
        xl: "88em", // 1408px
      },
      fontSize: {
        xl: "1.25em", // 20px
        l: "1em", // 16px
        m: "0.875em", // 14px
        sm: "0.75em", // 12px
      },
      boxShadow: {
        DEFAULT: "0px 0px 6px 0px rgba(236, 236, 236, 0.03)",
      },
    },
  },
  plugins: [],
};
export default config;
