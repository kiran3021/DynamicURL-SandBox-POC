import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { getPost } from "./api/posts"
import { CreatePost } from "./CreatePost"
import Post from "./Post"
import { PostListInfinite } from "./PostListInfinite"
import { PostListPaginated } from "./PostListPaginated"
import PostsList1 from "./PostsList1"
import PostsList2 from "./PostsList2"

export default function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />)
  const queryClient = useQueryClient()

  function onHoverPostOneLink() {
    queryClient.prefetchQuery({
      queryKey: ["posts", 1],
      queryFn: () => getPost(1),
    })
  }


// Assuming you have access to the `queryClient` instance
const cachedQueries = queryClient.getQueryCache().findAll();
console.log({cachedQueries});


const prefetchPosts= queryClient.getQueryData(['posts'])
console.log({prefetchPosts}, 'prefetched data for the posts.')

  return (
    <> 
    <div>
      <button onClick={() => setCurrentPage(<PostsList1 />)}>
        Posts List 1 
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>
        Posts List 2
      </button>
      <button
        onMouseEnter={onHoverPostOneLink}
        onClick={() => setCurrentPage(<Post id={1} />)}
      >
        First Post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        New Post
      </button>
      {/* <button onClick={() => setCurrentPage(<PostListPaginated />)}>
        Post List Paginated
      </button> */}
      {/* <button onClick={() => setCurrentPage(<PostListInfinite />)}>
        Post List Infinite
      </button> */}
      {cachedQueries}
      <br />
      {currentPage}
    </div>
    </>

  )
}
