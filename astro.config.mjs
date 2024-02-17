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
          items: [
            {
              label: "Golang",
              link: "/lang/go",
            },
            {
              label: "Rust",
              link: "/lang/rust",
            },
            {
              label: "Python",
              link: "/lang/python",
            },
          ],
        },
        {
          label: "Concepts",
          items: [
            {
              label: "Machine Learning",
              link: "/concepts/machine_learning",
            }
          ],
        },
        {
          label: "Real Estate",
          items: [
            {
              label: "Concepts",
              link: "/real_state/concepts",
            }
          ],
        },
      ],
    }),
    icon({
      include: {
        "skill-icons": ["*"],
      },
    }),
  ],
});
