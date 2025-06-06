import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // "/api": "https://fsa-capstone-backend.onrender.com",
      "/api": "https://fsa-capstone-backend-9b3e597200f5.herokuapp.com",
    },
  },
});
