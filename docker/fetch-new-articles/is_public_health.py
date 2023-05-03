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
        WEBSITE: "https://factcheck.afp.com/afp-usa",
        LOGO: "/afp_logo.png",
        URL: "http://fetchrss.com/rss/6451b3e510197943014c39736451b40bd45c8f4eed73c972.xml",
    },
    "APNews.com": {
        WEBSITE: "https://apnews.com/hub/ap-fact-check",
        LOGO: "/associated_press_logo.png",
        URL: "http://fetchrss.com/rss/6451b3e510197943014c39736451b470e7f21f781e72cd42.xml",
    },
    "USAToday.com": {
        WEBSITE: "https://www.usatoday.com/news/factcheck",
        LOGO: "/usa_today_logo.png",
        URL: "http://fetchrss.com/rss/6451b3e510197943014c39736451b603f5d79c16b21d5472.xml",
    },
    "Reuters.com": {
        WEBSITE: "https://www.reuters.com/news/archive/factCheckNew",
        LOGO: "/reuters_logo.png",
        URL: "http://fetchrss.com/rss/6451b3e510197943014c39736451b6323ea157342e43b3c2.xml",
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