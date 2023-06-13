import React, { useEffect, useState } from 'react';
import './App.css'
import { read, FeedEntry } from 'feed-reader'
import { fetch } from 'fetch-opengraph';
import { rssConfigs } from './const';
import { createClient } from '@supabase/supabase-js'
import { Database } from './lib/database.types';

let SUPABASE_ANON_KEY: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhqb2JxbHVldnF0dmpod2ZobGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg4NDA3NjEsImV4cCI6MTk5NDQxNjc2MX0.7HCav4pUOTSEVaqDKv7vCRxApIhqecs_OfYB8_GDqto"
let SUPABASE_URL: string = "https://xjobqluevqtvjhwfhlhr.supabase.co/"

const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

export interface Feed {
  timestamp?: string|null;
  logo?: string;
  website?: string;
}

export interface FeedItem {
  timestamp?: string|null;
  uri?: string;
  title?: string|null;
  description?: string|null;
  feed: Feed;
}

const site_url = "https://misinfo-feed.ruth-gracegrace.repl.co/"

const App = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([])
  const [searchInput, setSearchInput] = useState("");
  const searchBar = () => { }
  const search_present = searchInput.length > 0;
  const search_link = site_url + "?search=" + searchInput

  const getFeedItems = async () => {
    let now: Date  = new Date();
    let then: Date = new Date();
    then.setDate(now.getDate() - 1);

    let { data: feeditems, error } = await supabase
      .from('feeditem')
      .select(`timestamp, uri, title, description, feed (id, logo, website)`)
      .eq('public_health_related', 1)
      //.gte('timestamp',now.toISOString())
      //.lte('timestamp',then.toISOString())
      //.order('timestamp');

    if (error) console.log("error", error);
    else {
      console.log(feeditems);
      setFeedItems(feeditems as FeedItem[]);
    }
  }

  const findFeedItems = async () => {
    setFeedItems(feedItems.filter((post: FeedItem) => {
      return post.title?.includes(searchInput) || post.description?.includes(searchInput);
    }));
  }

  getFeedItems().catch(console.error);

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let search_query = params.get('search') || ''; // contents of query param "search" i.e. https://foo.bar?search=foo
    setSearchInput(search_query)
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if (searchInput.length > 0) {
    findFeedItems().catch(console.error);
  }

  return (
    <main className="p-5">
      <h1>Misinformation Feed</h1>
      <p>This is a feed of public health related fact-checks that you can filter by keyword. Fact checks are collated from Facebook's list of third party, English-language fact checkers for American content.</p>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput} />
      {search_present ?
        <div>
          <p>Link to search - <a href={search_link}>{search_link}</a></p>
          <button className="btn btn-blue">Subscribe to this search</button>
        </div>
        :
        <div>
          <br />
          <br />
        </div>}
      <p></p><Feeds posts={feedItems ?? []} />
    </main>
  )
}

export function Feeds({ posts }: { posts: FeedItem[] }) {
  return <React.Fragment>
    {posts.map(entry => {
      return <FeedRow entry={entry} />
    })}
  </React.Fragment>
}


export function FeedRow({
  entry
}: { entry: FeedItem }) {
  return (
    <div className="feedrow grid grid-cols-4 gap-4">
      <div className="logocol">
        <img src={entry.feed.logo} />
      </div>
      <div className="col-span-3">
        <div className="text-xl"><a href={entry.uri}>{entry.title}</a></div>
        <small>{entry.timestamp?.toString() ?? ""}</small>
        <p>{entry.description}</p>
      </div>
    </div>
  )
}

export default App;

// https://tailwindcss.com/docs/font-size
// https://www.npmjs.com/package/fetch-opengraph
