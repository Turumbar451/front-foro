/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [{
            mytheme: {
                "primary": "#2563eb",
                "secondary": "#60a5fa",
                "accent": "#37cdbe",
                "neutral": "#3d4451",
                "base-100": "#ffffff",  //fondo
                "info": "#3abff8",
                "success": "#36d399",
                "warning": "#fbbd23",
                "error": "#f87272",
            },
        },],
    },
}