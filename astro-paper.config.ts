import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://cashsuccess.online/",
    description:
      "Learn legitimate ways to make money online through AI, freelancing, online surveys, affiliate marketing, digital products, passive income, and remote work.",
    author: "David Treasure",
    profile: "https://cashsuccess.online/about/",
    ogImage: "social-share.png",
    lang: "en",
    timezone: "Africa/Lagos",
    dir: "ltr",
  },

  posts: {
    perPage: 8,
    perIndex: 8,
    scheduledPostMargin: 15 * 60 * 1000,
  },

  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,

    editPost: {
      enabled: false,
    },

    search: "pagefind",
  },

socials: [
  {
    name: "mail",
    url: "mailto:support@cashsuccess.online",
  },

  {
    name: "x",
    url: "https://x.com/Treafdx",
  },

  {
    name: "facebook",
    url: "https://www.facebook.com/share/1C3BcUk3wW/",
  },

  {
    name: "pinterest",
    url: "https://pin.it/4GOVtwOwp",
  },

  {
    name: "medium",
    url: "https://medium.com/@treasuredavid1",
  },
],
});