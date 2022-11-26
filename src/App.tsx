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
      timestamp: p.published,
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

  let allPosts: FeedItem[] = [
    ...useGetFeed('fco'),
    ...useGetFeed('cyf'),
    ...useGetFeed('ls'),
    ...useGetFeed('pf'),
    ...useGetFeed('sf'),
  ]
  console.log('allPosts', allPosts)

  return (
    <main className="p-5">
      <Feeds posts={allPosts ?? []} />
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
    <div>
      <div className="grid grid-cols-4 gap-4">
        <img src={entry.logo} />
        <div className="col-span-3">
          <div className="text-xl">{entry.title}</div>
          <small>{entry.timestamp}</small>
          <p>{entry.description}</p>
        </div>
      </div>
    </div>
  )
}

// https://tailwindcss.com/docs/font-size
// https://www.npmjs.com/package/fetch-opengraph