import React, { useEffect, useState } from 'react';
import './App.css'
import { read, FeedEntry } from 'feed-reader'
import { fetch } from 'fetch-opengraph';

const corsProxy = "https://cors-anywhere.robinpham1.repl.co"
const url = `${corsProxy}/factcheck.org/feed/`

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

  return (
    <main className="p-5">
      <Feed entry={(posts ?? [])[1]} />
    </main>
  )
}


export function Feed({
  entry
}: { entry?: FeedEntry }) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <div>image here</div>
        <div className="col-span-3">
          <div className="text-xl">{entry?.title}</div>
          <small>{entry?.published}</small>
          <p>{entry?.description}</p>
        </div>
      </div>
    </div>
  )
}

// https://tailwindcss.com/docs/font-size
// https://www.npmjs.com/package/fetch-opengraph