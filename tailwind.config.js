module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  experimental: {
    darkModeVariant: true,
  },
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      mobileSM: "280px",
      mobile: "375px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1400px",
    },
    fontSize: {
      "2sl": "8px",
      "1sl": "10px",
      base: "12px",
      sl: "14px",
      xl: "16px",
      "1xl": "18px",
      "1.5xl": "20px",
      "2xl": "24px",
      "2.5xl": "32px",
      "3xl": "34px",
      "4xl": "36px",
    },
    fontFamily: {
      play: ["Play", "sans-serif"],
    },

    boxShadow: {
      btn: "3px 5px 8px #00000017",
      primary: "3px 5px 8px #00000017",
    },
    extend: {
      colors: {
        // set up theme colors
        "secondary-color": "#e8f8ee",
        primary: {
          50: "#EB4B4F",
          100: "#70F0B5",
          200: "#E5B0FA",
          300: "#7182c1",
          400: "#AEAAF9",
          500: "#79B8F9",
          600: "#EFAF45",
          700: "#D8ECA9",
          800: "#4169E1",
          850: "#FF9D66",
          950: "#FCB500",
          900: "#FFE897",
          1000: "rgb(252, 181, 0)",
        },
        secondary: {
          400: "#FFD1AC",
          500: "#a15f2b",
          600: "#D978FF",
          700: "#62A7EE",
        },
        white: {
          100: "#E5E5E5",
          200: "#C4C4C4",
          300: "#BDBDBD",
          400: "#F6F6F6",
          500: "#ffffff",
        },
        brown: {
          500: "#BF6B21",
          400: "#DED6C4",
        },
        lightBlue: {
          500: "#02499D",
          600: "#4169e1",
        },
        yellow: {
          400: "#F8CE3D",
          500: "#F59B5A",
        },
        green: {
          400: "#14B96D",
          500: "#1E8B37",
          600: "#008E28",
          700: "#2A9528",
          primary: "#00874a",
          29: "#87ce29",
        },
        red: {
          100: "#EB4B4F",
          200: "#BF5533",
          300: "#FFF0F5",
          400: "#F85E3D",
          500: "#F75C38",
          600: "#DB080D",
          700: "#B22222",
          rgb: "rgb(235, 75, 79)",
        },
        gray: {
          100: "#E7E7E7",
          200: "#DCDCDC",
          250: "#EFEFEF",
          300: "#D0D0D0",
          400: "#B8B8B8",
          500: "#A0A0A0",
          600: "#888888",
          700: "#717171",
          800: "#7d7d7d",
          900: "#595959",
          d9: "#D9D9D9",
          AAA: "#AAAAAA",
        },
        black: {
          100: "#4D4D4D",
          200: "#414141",
          300: "#363636",
          400: "#2A2A2A",
          500: "#1E1E1E",
          600: "#000000",
          text: "#333333",
        },
        borderCl: {
          dashed: "#DDD6C5",
        },
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "1xl": "5px",
        "4xl": "2rem",
      },
      boxShadow: {
        rainbow:
          "0 0 0 10px #ff0000,0 0 0 20px #ff7700,0 0 0 30px #FFDD00,0 0 0 40px #00FF00,0 0 0 50px #0000FF,0 0 0 60px #C77DF3,0 0 0 70px #8A2BE2",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
