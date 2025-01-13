/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./app/**/*.{js,ts,jsx,tsx}",
  "./src/**/*.{js,ts,jsx,tsx}"
];
export const theme = {
  extend: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
    },
    colors: {
      slate: {
        800: "#1E293B",
      },
      ...{
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      orange: {
        500: '#FE8A00',
        600: '#e67a00'
      },
      slate: {
        800: '#1E293B',
        900: '#0F172A',
        950: '#020617'
      }
    },
    spacing: {
      4: "1rem", // Padding superior/inferior (pt-4, pb-4)
      1: "0.25rem", // Padding inferior (pb-1)
      60: "15rem", // Altura do input (h-[60px])
    },
    width: {
      full: "100%", // Largura total
    },
    borderWidth: {
      0: "0px", // Borda zero (border-0)
    },
    placeholderColor: {
      transparent: "transparent", // Placeholder invisível
    },
    ringWidth: {
      0: "0px", // Remover efeito de foco (focus:ring-0)
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)'
    }
  }
};
export const plugins = [import("tailwindcss-animate")];
