import { env } from "@/env";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig = {
  name: "Kioga",
  description: "Empresa dedicada a la venta y servicios de computo en general.",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com/miickasmt",
    github: "https://github.com/mickasmt/next-saas-stripe-starter",
  },
  mailSupport: "support@saas-starter.com",
};
