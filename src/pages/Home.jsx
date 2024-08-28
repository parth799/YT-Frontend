// import React from 'react'

import { useDispatch } from "react-redux";
import InfiniteScroll from "../components/components/InfiniteScroll"

function Home() {
  const dispatch = useDispatch();
  return (
    <>
    <div className="w-full sm:px-2">
      <InfiniteScroll
      // fetchMore={fetchMoreVideo}
      // hasNextPage={hasNextPage}
      >

      </InfiniteScroll>
    </div>
    </>
  )
}

export default Home
