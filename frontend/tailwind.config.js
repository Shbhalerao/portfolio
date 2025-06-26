// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- NEW, MORE VIBRANT COLORS BASED ON HOMEPAGE.PNG ---
        'pastel-light-blue': '#66BBF0', // Inspired by light blue accents
        'pastel-green': '#E6FFE6 var(--tw-gradient-to-position)',    // Inspired by green button
        'pastel-pink': '#FDF2F8',     // Inspired by pink in profile gradient
        'pastel-purple': '#F3E8FF',   // Inspired by purple in profile gradient / Let's Work Together section
        'pastel-yellow': '#FFF9E6 var(--tw-gradient-from-position)',
        'pastel-blue' : 'rgb(232 244 253 / var(--tw-bg-opacity, 1))',  // Inspired by a brighter yellow accent
        
        // New colors provided by the user (from previous request)
        'soft-blue': 'rgb(232 244 253 / var(--tw-bg-opacity, 1))',
        'soft-green': 'rgb(240 253 244 / var(--tw-bg-opacity, 1))',
        'soft-gray': 'rgb(248 250 252 / var(--tw-bg-opacity, 1))',

        'text-dark': '#333333',       // Keep as is for good contrast
        'text-light': '#FFFFFF',      // Keep as is
        // --- End of new vibrant colors ---

        // New brand colors for skill icons (approximated from homepage_skills.png)
        'skill-java': '#F48C00',       // Orange
        'skill-spring-boot': '#87B839',// Green
        'skill-react': '#61DAFB',      // Blue
        'skill-javascript': '#F0DB4F', // Yellow
        'skill-postgresql': '#336791', // Dark blue/purple
        'skill-aws': '#FF9900',    
        'skill-docker': '#0db7ed',      // AWS Orange

        // --- NEW VIBRANT COLORS FOR GRADIENT PULSATION ---
        'vibrant-purple': '#7B42F6',   // A distinct, brighter purple
        'sunshine-yellow': '#FFD700', // A bright, golden yellow

        // --- NEW BACKGROUND COLOR FOR SKILLS SECTION (NOT USED IN HOMEPAGE.TSX AS PER REQUEST) ---
        'dark-background': '#1A1A1A', // Dark background example
      }
    },
  },
  plugins: [],
}