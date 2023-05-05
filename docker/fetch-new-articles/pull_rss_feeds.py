from dotenv import load_dotenv
from supabase import create_client, Client
import os
from query import check_prompt
from my_logger import logger
from fetch_new_articles import master_feed_list
import feedparser


DB_DATABASE_NAME = "postgres"
DB_PORT = 5432
DB_USER = 'postgres'
DB_PASSWORD = os.getenv('SUPABASE_DB_PASSWORD')

def insert(feeditem):
    pass

def main():
    load_dotenv()
    url: str = os.environ.get('SUPABASE_URL')
    key: str = os.getenv('SUPABASE_API_KEY')
    supabase: Client = create_client(url, key)
    
    for url in master_feed_list:
        logger.info(f'Checking url: {url}')
        feed = feedparser.parse(url).get('feed')
        print(f'found {len(list(feed))} items')
        for item in feed.get('entries', []):
            logger.info(f'Checking item: {item.get("title")}')
            if check_prompt(item.get('title'), None):
                print(f'found healthcare related article: title: {item.title}, description: {item.description}')
        return
                
        

if __name__ == "__main__":
    main()
