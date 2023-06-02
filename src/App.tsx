import React, { useEffect, useState } from 'react';
import './App.css'
import { read, FeedEntry } from 'feed-reader'
import { fetch } from 'fetch-opengraph';
import { rssConfigs } from './const';
import { createClient } from '@supabase/supabase-js'

let SUPABASE_ANON_KEY: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhqb2JxbHVldnF0dmpod2ZobGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg4NDA3NjEsImV4cCI6MTk5NDQxNjc2MX0.7HCav4pUOTSEVaqDKv7vCRxApIhqecs_OfYB8_GDqto"
let SUPABASE_URL: string = "https://db.xjobqluevqtvjhwfhlhr.supabase.co/"


interface Database {
  public: {
    Tables: {
      feeditem: {
        Row: {} // The data expected to be returned from a "select" statement.
        Insert: {} // The data expected passed to an "insert" statement.
        Update: {} // The data expected passed to an "update" statement.
      }
    }
  }
}

const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


type FeedItemResponse = Awaited<ReturnType<typeof getFeedItems>>;
export type FeedItemResponseSuccess = FeedItemResponse['data'];
export type FeedItemResponseError = FeedItemResponse['error'];

interface FeedItem {
  timestamp?: Date;
  link?: string;
  title?: string;
  description?: string;
  website: string;
  logo: string;
}

const site_url = "https://misinfo-feed.ruth-gracegrace.repl.co/"

function useGetFeed(key: string) {
  const { url, website, logo } = rssConfigs[key]
  const [posts, setPosts] = useState<FeedEntry[]>()

  React.useEffect(() => {
    read(url).then(res => {
      console.log('result: url', res, url);
      setPosts(res.entries)
    }).catch(e => console.error(e))
  }, [])
  const feedItems: FeedItem[] = posts?.map(p => {
    return {
      timestamp: new Date(p.published ?? ""),
      link: p.link,
      title: p.title,
      description: p.description,
      website,
      logo,
    }
  }) ?? [];

  return feedItems;
}

async function getFeedItems() {
  let now: Date  = new Date();
  let then: Date = new Date();
  then.setDate(now.getDate() - 1);
  return await supabase.from('feeditem').select(`timestamp, uri, title, description, feed (id)`).eq('public_health_related', 1).gte('timestamp',now.toISOString()).lte('timestamp',then.toISOString());
}


export default function App() {
  getFeedItems().then(data => console.log('FeedItems', data));

  let allPosts: FeedItem[] = [ ];
    //...useGetFeed('fco'),
    //...useGetFeed('ls'),
    //...useGetFeed('pf'),
    //...useGetFeed('sf'),
    //...useGetFeed('dp'),
    //...useGetFeed('afp'),
    //...useGetFeed('apn'),
    //...useGetFeed('ust'),
    //...useGetFeed('rfc'),
  //]
  //console.log('allPosts', allPosts)

  allPosts = allPosts.sort((n1, n2) => (n2.timestamp?.getTime() ?? 0) - (n1.timestamp?.getTime() ?? 0));

  // include only COVID content
  /* allPosts = allPosts.filter((post) => {
    return post.title.includes("COVID") || post.description.includes("COVID");
  }); */

  const searchBar = () => { }
  const [searchInput, setSearchInput] = useState("");
  const search_present = searchInput.length > 0;
  const search_link = site_url + "?search=" + searchInput
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
    allPosts = allPosts.filter((post) => {
      return post.title?.includes(searchInput) || post.description?.includes(searchInput);
    });
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
      <p></p><Feeds posts={allPosts ?? []} />
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
        <img src={entry.logo} />
      </div>
      <div className="col-span-3">
        <div className="text-xl"><a href={entry.link}>{entry.title}</a></div>
        <small>{entry.timestamp?.toString() ?? ""}</small>
        <p>{entry.description}</p>
      </div>
    </div>
  )
}

// https://tailwindcss.com/docs/font-size
// https://www.npmjs.com/package/fetch-opengraph
