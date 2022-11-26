import React, { useEffect, useState } from 'react';
import './App.css'
import { read, FeedEntry } from 'feed-reader'
import { fetch } from 'fetch-opengraph';

const corsProxy = "https://cors-anywhere.robinpham1.repl.co"
const url = `${corsProxy}/factcheck.org/feed/`

interface FeedItem {
  timestamp?: Date;
  link?: string;
  title?: string;
  description?: string;
  website: string;
  logo: string;
}

export default function App() {
  const [posts, setPosts] = useState<FeedEntry[]>()

  React.useEffect(() => {
    read(url).then(res => {
      console.log('result', res);
      setPosts(res.entries)
    }).catch(e => console.error(e))
  }, [])

  console.log('Posts', posts)
  console.log('test code mobile')
  // new data structure with description, link, timestamp, title, website, website logo

  let factcheckPosts: FeedItem[] = posts?.map(p => {
    return {
      timestamp: p.published,
      link: p.link,
      title: p.title,
      description: p.description,
      website: "factcheck.org",
      logo: "/public/factcheckorg_logo.png",
    }
  }) ?? [];

  console.log('factcheckPosts', factcheckPosts)
  let allPosts: FeedItem[] = new Array(0)
  allPosts = allPosts.concat(factcheckPosts)
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