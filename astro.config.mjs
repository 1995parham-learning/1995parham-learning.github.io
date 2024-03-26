import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      components: {
        PageTitle: "./src/components/PageTitle.astro",
      },
      editLink: {
        baseUrl:
          "https://github.com/1995parham-learning/1995parham-learning.github.io/edit/main/",
      },
      logo: {
        src: "./src/assets/logo.png",
      },
      customCss: ["./src/styles/custom.css"],
      favicon: "/logo.png",
      title: "Parham's Notes",
      lastUpdated: true,
      social: {
        github:
          "https://github.com/1995parham-learning/1995parham-learning.github.io",
      },
      sidebar: [
        {
          label: "Programming Languages",
          autogenerate: {
            directory: "lang",
          },
        },
        {
          label: "Tools",
          autogenerate: {
            directory: "tools",
          },
        },
        {
          label: "Concepts",
          autogenerate: {
            directory: "concepts",
          },
        },
        {
          label: "Real Estate",
          autogenerate: {
            directory: "real_estate",
          },
        },
        {
          label: "Algorithm",
          autogenerate: {
            directory: "algorithm",
          },
        },
        {
          label: "Investment",
          autogenerate: {
            directory: "investment",
          },
        },
        {
          label: "Contracts",
          autogenerate: {
            directory: "contracts",
          },
        },
      ],
    }),
    icon(),
  ],
});
