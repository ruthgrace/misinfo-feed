import React, { useEffect, useState } from 'react';
import './App.css'
import { read, FeedEntry } from 'feed-reader'
import { fetch } from 'fetch-opengraph';
import { rssConfigs } from './const.ts';

interface FeedItem {
  timestamp?: Date;
  link?: string;
  title?: string;
  description?: string;
  website: string;
  logo: string;
}


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
      timestamp: new Date(p.published),
      link: p.link,
      title: p.title,
      description: p.description,
      website,
      logo,
    }
  }) ?? [];

  return feedItems;
}


export default function App() {
  let search_present = false
  let allPosts: FeedItem[] = [
    ...useGetFeed('fco'),
    ...useGetFeed('ls'),
    ...useGetFeed('pf'),
    ...useGetFeed('sf'),
    ...useGetFeed('dp'),
    ...useGetFeed('afp'),
    ...useGetFeed('apn'),
    ...useGetFeed('ust'),
    ...useGetFeed('rfc'),

  ]
  console.log('allPosts', allPosts)

  allPosts = allPosts.sort((n1, n2) => n2.timestamp.getTime() - n1.timestamp.getTime());

  // include only COVID content
  /* allPosts = allPosts.filter((post) => {
    return post.title.includes("COVID") || post.description.includes("COVID");
  }); */

  const searchBar = () => { }
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    search_present = (e.target.value.length > 0);
  };

  if (searchInput.length > 0) {
    allPosts = allPosts.filter((post) => {
      return post.title.includes(searchInput) || post.description.includes(searchInput);
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
          <p>Link to your search - fake_search_link</p>
          <button type="button"> Subscribe to email updates for this search result</button>
        </div>
        :
        <div>
          <br/>
        </div>}
      <p></p><Feeds posts={allPosts ?? []} />
    </main>
  )
}

export function Feeds({ posts }: { posts: FeedItem[] }) {
  return posts.map(entry => {
    return <FeedRow entry={entry} />
  })
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
        <small>{entry.timestamp.toString()}</small>
        <p>{entry.description}</p>
      </div>
    </div>
  )
}

// https://tailwindcss.com/docs/font-size
// https://www.npmjs.com/package/fetch-opengraph