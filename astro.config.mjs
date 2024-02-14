import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Parham's Notes",
      social: {
        github:
          "https://github.com/1995parham-learning/1995parham-learning.github.io",
      },
      sidebar: [
        {
          label: "Programming Languages",
          items: [{ label: "Golang", link: "/lang/go" }],
        },
      ],
    }),
  ],
});
