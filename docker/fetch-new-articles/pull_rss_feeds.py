import os
import time
import feedparser

from rss_feed import rssFeed
from query import check_prompt
from my_logger import logger
from fetch_new_articles import master_feed_list
from dotenv import load_dotenv
from supabase import create_client, Client


DB_DATABASE_NAME = "postgres"
DB_PORT = 5432
DB_USER = 'postgres'
DB_PASSWORD = os.getenv('SUPABASE_DB_PASSWORD')

def insert(feeditem):
    pass

def add_entries_to_feeditem_table(supabase: Client, entries: list) -> None:
    logger.debug(f'Adding {len(entries)} entries to feeditem table...')
    insert_list = []
    for entry in entries:
        value = {'uri': entry.get('links')[0].get('href',''), 'title': entry.title}
        insert_list.append(value)
    data = supabase.table('feeditem').insert(insert_list).execute()


def main():
    load_dotenv()
    url: str = os.environ.get('SUPABASE_URL')
    key: str = os.getenv('SUPABASE_API_KEY')
    supabase: Client = create_client(url, key)
    
    for k,v in master_feed_list.items():
        logger.info(f'Checking url: {v["url"]}')
        feed = rssFeed(feedparser.parse(v["url"]))
        logger.info(f'found {len(feed.entries)} items')
        health_related_articles = []
        for item in feed.entries:
            logger.info(f'Checking item: {item.title}')
            if check_prompt(item.title, None):
                logger.info(f'found healthcare related article: title: {item.title}, description: {item.description}')
                health_related_articles.append(item)
        print(f'found {len(health_related_articles)} articles related to healthcare on {k}')
        add_entries_to_feeditem_table(supabase, health_related_articles)
        return
        

if __name__ == "__main__":
    main()
