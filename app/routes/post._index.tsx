import React from 'react'
import { QueryClient,useQueryClient } from '@tanstack/react-query'
import { Link } from '@remix-run/react'
import { getPost } from 'src/api/posts'
function PostIndex() {

const queryClient = useQueryClient()
    function onHoverPostOneLink() {
      queryClient.prefetchQuery({
        queryKey: ["posts", 1],
        queryFn: () => getPost(1),
      })
    }
  return (
    <div>
        <Link to={'/list'}>
        PostList 1
        </Link>
        <Link
        to={'/newpost'}
        onMouseEnter={onHoverPostOneLink}
      >
        First Post
      </Link>
        
        
    </div>
  )
}

export default PostIndex