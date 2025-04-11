import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [react()],
    // define: {
    //   "process.env": process.env,
    // },
    // Additional configurations based on environment
    // base: mode === "production" ? "/production-base/" : "/",
    // build: {
    //   // Conditionally adjust build settings based on the mode
    //   sourcemap: mode !== "production",
    // },
  };
});
