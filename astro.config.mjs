import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      components: {
        PageTitle: './src/components/PageTitle.astro',
      },
      editLink: {
        baseUrl: 'https://github.com/1995parham-learning/1995parham-learning.github.io/edit/main/'
      },
      logo: {
        src: './src/assets/logo.png'
      },
      favicon: '/src/assets/logo.png',
      title: "Parham's Notes",
      social: {
        github: "https://github.com/1995parham-learning/1995parham-learning.github.io"
      },
      sidebar: [{
        label: "Programming Languages",
        items: [{
          label: "Golang",
          link: "/lang/go"
        }]
      }]
    }),
    icon({
      include: {
        "skill-icons": ["*"],
      }
    }),
  ]
});