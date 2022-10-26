import React, { useEffect, useState} from 'react';
import './App.css'
import { read, FeedEntry } from 'feed-reader'

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
    <main>
      <code>
        {JSON.stringify(posts ?? [], null, 2)}
      </code>
    </main>
  )
}
