import feedparser, time

WEBSITE = "website"
LOGO = "logo"
URL = "url"

master_feed_list = {
    "FactCheck.org": {
        WEBSITE: "factcheck.org",
        LOGO: "factcheckorg_logo.png",
        URL: "https://www.factcheck.org/feed/",
    },
    "LeadStories.com": {
        WEBSITE: "leadstories.com",
        LOGO: "/Logo_LeadStories.png",
        URL: "https://leadstories.com/atom.xml",
    },
    "PolitiFact.com": {
        WEBSITE: "politifact.com",
        LOGO: "/politifact_logo.png",
        URL: "https://www.politifact.com/rss/factchecks/",
    },
    "ScienceFeedback.co": {
        WEBSITE: "sciencefeedback.co",
        LOGO: "/sciencefeedback_logo.png",
        URL: "https://sciencefeedback.co/feed/",
    },
    "TheDispatch.com": {
        WEBSITE: "thedispatch.com",
        LOGO: "/dispatch_logo.png",
        URL: "https://thedispatch.com/category/fact-check/feed/",
    },
    "FactCheckAFP.com": {
        WEBSITE: "factcheck.afp.com",
        LOGO: "/afp_logo.png",
        URL: "fetchrss.com",
    },
    "APNews.com": {
        WEBSITE: "https://apnews.com/hub/ap-fact-check",
        LOGO: "/associated_press_logo.png",
        URL: "fetchrss.com",
    },
    "USAToday.com": {
        WEBSITE: "https://www.usatoday.com/news/factcheck",
        LOGO: "/usa_today_logo.png",
        URL: "fetchrss.com",
    },
    "Reuters.com": {
        WEBSITE: "https://www.reuters.com/news/archive/factCheckNew",
        LOGO: "/reuters_logo.png",
        URL: "fetchrss.com",
    }
}


# TODO: 1. recreate rss feeds for missing links. 2. write code to fetch from all and just print out. 3. put it in a cron job (RSS feeds dissapear if not used for a week). 4. put data into database. 5. add logic to check if already in database (use URL). 6. add logic to replace what's in database if something is an updated version
d = feedparser.parse("https://leadstories.com/atom.xml")
print(d.keys())
print(type(d['entries']))
print("TITLE")
print(d['entries'][0]['title'])
print("LINKS")
print(d['entries'][0]['links'][0]['href'])
print("PUBLISHED PARSED")
print(time.asctime(d['entries'][0]['published_parsed']))
print("UPDATED PARSED")
print(time.asctime(d['entries'][0]['updated_parsed']))
print("SUMMARY")
print(d['entries'][0]['summary'])