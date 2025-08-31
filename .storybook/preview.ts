import type { Preview } from "@storybook/nextjs"
import "./preview.style.scss"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      disableSaveFromUI: true,
      expanded: true,
    },

    backgrounds: {
      defaultValue: "mainWhite",
      options: {
        mainWhite: { name: "Main white", value: "#E8F8F8" },
        cyan: { name: "Cyan", value: "#0FCCD3" },
        dark: { name: "Dark", value: "#333" },
        light: { name: "Light", value: "#F7F9F2" },
      },
    },
  },

  initialGlobals: {
    backgrounds: { value: "mainWhite" },
  },
}

export default preview
