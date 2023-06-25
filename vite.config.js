import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/pvite/", //This is the base url of your website
  // server: {
  //   port: 3000,
  // },
  proxy: {
    "/api": {
      target: "http://localhost:4500",
      changeOrigin: true,
      // other proxy options
    },
  },
});
