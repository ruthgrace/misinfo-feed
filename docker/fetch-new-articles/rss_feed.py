import os
import time
import feedparser 

class rssFeed:

    def __init__(self, feed: feedparser.util.FeedParserDict) -> None:
        self.feed = feed

    @property
    def entries(self) -> list:
        return self.feed.get('entries', [])

    @property
    def title(self) -> str:
        return self.entries[0].get('title', 'Missing Title')

    @property
    def links(self) -> list:
        return self.entries[0].get('links', [])[0].get('href', [])

    @property
    def published_parsed(self) -> str:
        return time.asctime(self.entries[0].get('published_parsed'))

    @property
    def summary(self) -> str:
        return self.entries[0].get('summary')

