@import url('https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Assistant", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Space Grotesk", sans-serif;
  
  --color-accent: #FF5C00; /* Safety Orange */
  --color-accent-foreground: #FFFFFF;
  --color-deep: #0A0A0A;
}

@layer base {
  body {
    @apply antialiased text-white bg-black overflow-hidden select-none;
    font-feature-settings: "ss01", "ss02", "cv01", "cv02";
  }
}

.rtl {
  direction: rtl;
}

/* App-like behaviors */
* {
  @apply outline-none;
  -webkit-tap-highlight-color: transparent;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.glass {
  @apply bg-white/5 backdrop-blur-xl border border-white/10;
}

.btn-primary {
  @apply bg-accent text-white font-extrabold py-5 px-8 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wide text-lg shadow-lg shadow-accent/20;
}

.btn-secondary {
  @apply bg-white/10 text-white font-bold py-5 px-8 rounded-2xl border border-white/10 transition-all active:scale-95 flex items-center justify-center gap-2 text-lg;
}
