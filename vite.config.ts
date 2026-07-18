import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load env vars from the project root (one level up from client/)
  const env = loadEnv(mode, path.resolve(import.meta.dirname), "");

  const plugins = [
    react(),
    tailwindcss(),
    // -------------------------------------------------------------------------
    // Analytics injection plugin
    // Only injects the Umami analytics script tag when BOTH vars are configured.
    // If either is missing or empty, no script tag is emitted — preventing the
    // broken-placeholder white screen that occurs on mobile browsers.
    // -------------------------------------------------------------------------
    {
      name: "inject-analytics",
      transformIndexHtml(html: string) {
        const endpoint = env.VITE_ANALYTICS_ENDPOINT?.trim();
        const websiteId = env.VITE_ANALYTICS_WEBSITE_ID?.trim();

        if (endpoint && websiteId) {
          console.log(`[build] Analytics enabled: ${endpoint}/umami (${websiteId})`);
          return html.replace(
            "<!-- ANALYTICS_PLACEHOLDER -->",
            `<script defer src="${endpoint}/umami" data-website-id="${websiteId}"></script>`
          );
        }

        // Remove the placeholder comment entirely — clean HTML, no broken tags
        console.log("[build] Analytics not configured — skipping analytics script tag.");
        return html.replace("<!-- ANALYTICS_PLACEHOLDER -->", "");
      },
    },
  ];

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    envDir: path.resolve(import.meta.dirname),
    root: path.resolve(import.meta.dirname, "client"),
    publicDir: path.resolve(import.meta.dirname, "client", "public"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
          chunkFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
          assetFileNames: `assets/[name]-[hash]-${Date.now()}.[ext]`,
        },
      },
    },
    server: {
      host: true,
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
