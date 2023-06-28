import os
import time
import requests

from cli_args import args
from my_logger import logger
from dotenv import load_dotenv
from supabase import create_client, Client
from bs4 import BeautifulSoup
from pull_rss_feeds import add_entries_to_feeditem_table


DB_DATABASE_NAME = "postgres"
DB_PORT = 5432
DB_USER = 'postgres'
DB_PASSWORD = os.getenv('SUPABASE_DB_PASSWORD')

def get_feed_items(supabase: Client, starting_id: int) -> list:
    return supabase.table('feeditem').select('*').order('id').gte('id', starting_id).limit(1).execute().data

def update_feed_items(supabase: Client, starting_id: int) -> list:
    return


def get_thumbnail_url(entry):
    # first check for media_thumbnail in entry keys
    if 'media_thumbmail' in entry.keys():
        return entry.media_thumbnail[0].get('url')
    elif 'media_content' in entry.keys():
        return entry.media_content[0].get('url')
    else: 
        # if we can't find it, parse entry.content
        try:
            soup = BeautifulSoup(entry.content[0].value, 'lxml')
            thumbnail = soup.find_all('img')[0].get('src')
            return thumbnail
        except (KeyError, AttributeError):
            return


def main():
    if args.force_update:
        logger.debug(f'Updating all thumbnails')
    load_dotenv()
    url: str = os.environ.get('SUPABASE_URL')
    key: str = os.getenv('SUPABASE_API_KEY')
    supabase: Client = create_client(url, key)

    starting_id = 1
    while True:
        feed_items = get_feed_items(supabase, starting_id)
        update_list = []
        if not feed_items:
            break
        starting_id = feed_items[-1].get('id') + 1
        print(f'new starting id was {starting_id}')
        for item in feed_items:
            if not item.get('thumbnail_url') or args.force_update:
                print(item)
                uri = item.get('uri')
                resp = requests.get(uri)
            
                soup = BeautifulSoup(resp.content, 'html.parser')
                thumbnail_url = soup.find('meta', property='og:image').get('content')
                if not thumbnail_url:
                    breakpoint()
                item.update({'thumbnail_url': thumbnail_url})
                update_list.append(item)
        supabase.table('feeditem').upsert(update_list, on_conflict='uri').execute()
        

if __name__ == "__main__":
    main()
