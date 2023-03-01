const corsProxy = "https://cors-anywhere.robinpham1.repl.co"

export const rssConfigs: Record<string, { url: string, website: string, logo: string }> = {
  fco: {
    website: "factcheck.org",
    logo: "/factcheckorg_logo.png",
    url: `${corsProxy}/factcheck.org/feed/`,
  },
  ls: {
    website: "leadstories.com",
    logo: "/Logo_LeadStories.png",
    url: `${corsProxy}/leadstories.com/atom.xml`,
  },
  pf: {
    website: "politifact.com",
    logo: "/politifact_logo.png",
    url: `${corsProxy}/www.politifact.com/rss/factchecks/`,
  },
  sf: {
    website: "sciencefeedback.co",
    logo: "/sciencefeedback_logo.png",
    url: `${corsProxy}/sciencefeedback.co/feed/`,
  },
  dp: {
    website: "thedispatch.com",
    logo: "/dispatch_logo.png",
    url: `${corsProxy}/thedispatch.com/category/fact-check/feed/`,
  },
  afp: {
    website: "factcheck.afp.com",
    logo: "/afp_logo.png",
    url: `${corsProxy}/fetchrss.com/rss/63e30011159c8661cc0e220363e30108ee53d979d0373672.xml`,
  },
  apn: {
    website: "https://apnews.com/hub/ap-fact-check",
    logo: "/associated_press_logo.png",
    url: `${corsProxy}/fetchrss.com/rss/63e30011159c8661cc0e220363e3061ed8996d25e40a7922.xml`,
  },
  ust: {
    website: "https://www.usatoday.com/news/factcheck",
    logo: "/usa_today_logo.png",
    url: `${corsProxy}/fetchrss.com/rss/63e30011159c8661cc0e220363e3068369974d42d269bdf2.xml`
  },
  rfc: {
    website: "https://www.reuters.com/news/archive/factCheckNew",
    logo: "/reuters_logo.png",
    url: `${corsProxy}/fetchrss.com/rss/63e30011159c8661cc0e220363e305d4c01dab21c602cfd2.xml`
  },
}