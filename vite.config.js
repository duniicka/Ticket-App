import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        register: "register.html",
        login: "login.html",
        register: "register.html",
        user: "user.html",
        buy: "buy.html",
        events: "events.html",
        favourites: "favourites.html",
        popular: "popular.html",
        tourism: "tourism.html",
        weekend: "weekend.html",
      },
    },
  },
});