import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import mdx from "@astrojs/mdx"
import solidJs from "@astrojs/solid-js"
import nodejs from "@astrojs/node"
import mkcert from "vite-plugin-mkcert"
import crossOriginIsolation from "vite-plugin-cross-origin-isolation"
import awsAmplify from "astro-aws-amplify"

// https://astro.build/config
export default defineConfig({
	integrations: [
		mdx(),
		solidJs(),
		tailwind({
			// Disable injecting a basic `base.css` import on every page.
			applyBaseStyles: false,
		}),
	],

	adapter: awsAmplify(),
	// Default to static rendering, but allow server rendering per-page
	output: "hybrid",
	vite: {
		base: "./",
		server: {
			// HTTPS is required for SharedArrayBuffer
			https: true,
		},
		plugins: [
			// Generates a self-signed certificate using mkcert
			mkcert(),

			// Required for SharedArrayBuffer
			crossOriginIsolation(),
		],
		resolve: {
			alias: {
				"@": "/src",
			},
		},
	},
	// Don't add trailing slashes to paths
	trailingSlash: "never",
})
