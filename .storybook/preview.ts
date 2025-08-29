import type { Preview } from "@storybook/nextjs"
import "./preview.style.scss"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: { name: "Light", value: "#f8f8f8" },
        dark: { name: "Dark", value: "#333333" },
        cyan: { name: "Cyan", value: "#0FCCD3" },
      },
    },
  },
}

export default preview
