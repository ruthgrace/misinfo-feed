import os
import time
import feedparser

from rss_feed import rssFeed
from query import check_prompt
from my_logger import logger
from dotenv import load_dotenv
from supabase import create_client, Client


DB_DATABASE_NAME = "postgres"
DB_PORT = 5432
DB_USER = 'postgres'
DB_PASSWORD = os.getenv('SUPABASE_DB_PASSWORD')

def get_master_feed_list(supabase: Client) -> list:
    return supabase.table('feed').select('*').execute().data


def item_exists_in_db(supabase: Client, uri: str) -> bool:
    rows = supabase.table('feeditem').select('*').eq('uri', uri)
    if rows:
        return True
    return False


def add_entries_to_feed_table(supabase: Client, entries: list) -> None:
    logger.debug(f'Adding {len(entries)} entries to feed table...')
    insert_list = []
    for entry in entries:
        value = {'rss_uri': entry.get('url'), 'logo': entry.get('logo'), 'website': entry.get('website'), 'title': entry.get('title')}
        insert_list.append(value)
    data = supabase.table('feed').insert(insert_list).execute()


def add_entries_to_feeditem_table(supabase: Client, feed_id: int, entries: list) -> None:
    logger.debug(f'Adding {len(entries)} entries to feeditem table...')
    insert_list = []
    for entry in entries:
        uri = entry.get('links')[0].get('href','')
        value = {'uri': uri, 'title': entry.title, 'feed_id': feed_id}
        insert_list.append(value)
    data = supabase.table('feeditem').insert(insert_list).execute()

def init_feed_table():
    # insert list of rss feeds from fetch_new_articles.py into feed table
    from fetch_new_articles import master_feed_list
    feeds = []
    for k,v in master_feed_list.items():
        v['title'] = k
        feeds.append(v)
    add_entries_to_feed_table(supabase, feeds)

def main():
    load_dotenv()
    url: str = os.environ.get('SUPABASE_URL')
    key: str = os.getenv('SUPABASE_API_KEY')
    supabase: Client = create_client(url, key)

    master_feed_list = get_master_feed_list(supabase)
    
    for entry in master_feed_list:
        logger.info(f'Checking url: {entry["rss_uri"]}')
        feed = rssFeed(feedparser.parse(entry["rss_uri"]))
        logger.info(f'found {len(feed.entries)} items')
        health_related_articles = []
        for item in feed.entries:
            logger.info(f'Checking item: {item.title}')
            uri = item.get('links')[0].get('href','')
            if item_exists_in_db(supabase, uri):
                logger.info(f'Skipping {uri}, duplicate')
            else:
                if check_prompt(item.title, None):
                    logger.info(f'found healthcare related article: title: {item.title}, description: {item.description}')
                    health_related_articles.append(item)
        print(f'found {len(health_related_articles)} articles related to healthcare on {entry["website"]}')
        add_entries_to_feeditem_table(supabase, entry.get('id'), health_related_articles)
        

if __name__ == "__main__":
    main()
