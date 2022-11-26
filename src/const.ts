const corsProxy = "https://cors-anywhere.robinpham1.repl.co"

export const rssConfigs: Record<string, { url: string, website: string, logo: string }> = {
  fco: {
    website: "factcheck.org",
    logo: "/public/factcheckorg_logo.png",
    url: `${corsProxy}/factcheck.org/feed/`,
  },
  cyf: {
    website: "checkyourfact.com",
    logo: "/public/check-logo.png",
    url: `${corsProxy}/checkyourfact.com/feed/`,
  },
  ls: {
    website: "leadstories.com",
    logo: "/public/Logo_LeadStories.png",
    url: `${corsProxy}/leadstories.com/atom.xml`,
  },
  pf: {
    website: "politifact.com",
    logo: "/public/politifact_logo.png",
    url: `${corsProxy}/www.politifact.com/rss/factchecks/`,
  },
  sf: {
    website: "sciencefeedback.co",
    logo: "/public/sciencefeedback_logo.png",
    url: `${corsProxy}/sciencefeedback.co/feed/`,
  }
}