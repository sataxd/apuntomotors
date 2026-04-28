/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            animation: {
                // Ajusté a 35s para que no sea tan rápido, puedes bajarlo a 25s si prefieres velocidad
                'infinite-scroll': 'infinite-scroll 30s linear infinite',
                 orbit: "orbit calc(var(--duration)*1s) linear infinite",
            },
            keyframes: {
                'infinite-scroll': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' },
                },
                orbit: {
                    "0%": {
                        transform: "rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))",
                    },
                    "100%": {
                        transform: "rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))",
                    },
                },
            },
            screens: {
                '3xl': '1600px',  // Pantallas ultra anchas
                '4xl': '1920px',  // Pantallas 1080p full width
                '2xs': '500px',
                '2md': '800px',
                '3md': '860px',
                '4md': '890px',
                'xlm': '1200px',
                'xl2m': '1280px',
                'xl3m': '1300px',
                'xl4m': '1440px',
                '3xlm': '1700px',
            },
            fontFamily: {
                bebas: ["Bebas Neue", "serif"],
                poppins: ["Poppins", "serif"],
                dmsans: ["DM Sans", "serif"],
                sora: ["Sora", "serif"],
            },
            // Puedes agregar personalizaciones aquí si es necesario
        },
    },
    plugins: [
        require("tailwindcss-animated"),
        require('@tailwindcss/forms')({
            strategy: 'class', 
        }),
        function ({ addUtilities }) {
            const newUtilities = {
                ".scrollbar-hide": {
                    /* IE and Edge */
                    "-ms-overflow-style": "none",

                    /* Firefox */
                    "scrollbar-width": "none",

                    /* Safari and Chrome */
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                },
                '.paused': {
                'animation-play-state': 'paused',
                },
            };

            addUtilities(newUtilities);
        },
        // Otros plugins si los tienes
    ],
};
