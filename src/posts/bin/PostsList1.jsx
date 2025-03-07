// import { useQuery ,useQueryClient} from "@tanstack/react-query"
// import { createPost, getPosts } from "../api/posts"
// import CreatePost from "./CreatePost"
// import { useState } from "react"
// const postsOptions = queryOptions({
//   queryKey: ['posts'],
//   queryFn: getPosts,
// })
// export default function PostsList1() {

 
//   const queryClient = useQueryClient()
//   const [post, setPost] = useState({title : "", body:""})
//   const  { status, fetchStatus, isError, isLoading, isSuccess, data, error, isPaused, isFetching }  = useQuery({
//     queryKey: ["posts"],
//     queryFn: getPosts,
//     placeholderData: [{ id: 1, title: "intial dummy data ..." }],
//     staleTime: 2000, // 2 seconds
//   })
//   const addTodoMutation = useMutation({
//     mutationFn: async (variables) => createPost(variables),
//     // When mutate is called:
//     onMutate: async (variables) => {
//       setPost({title: "", body: ""});
//       // Cancel any outgoing refetch
//       // (so they don't overwrite our optimistic update)
//       await queryClient.cancelQueries(postsOptions)

//       // Snapshot the previous value
//       const previousPost= queryClient.getQueryData(postsOptions.queryKey)

//       // Optimistically update to the new value
//       // if (previousTodos) {
//         queryClient.setQueryData(postsOptions.queryKey,(old) =>( [
//           ...old,
//           {id: Date.now(), title: variables.title, body: variables.body}
//         ]))
      
//       // }

//       return { previousPost };
//     },
//     // If the mutation fails,
//     // use the context returned from onMutate to roll back
//     onError: (err, variables, context) => {
//       if (context?.previousTodos) {
//         queryClient.setQueryData<Todos>(['todos'], context.previousTodos)
//       }
//     },
//     // Always refetch after error or success:
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ['todos'] })
//     },
//   })
//   console.log(data)
//   console.log(error)
//   return (
//     <> 
//     <div>
//       <h1>Posts List 1 - related to postws</h1>
//       <ul>
//         <li>status      : <strong>{status}</strong></li>
//         <li>isLoading   : {isLoading ? "Loading....." :"false"}</li>
//         <li>isError     : {isError ? "true" : "false"}</li>
//         <li>isSuccess   : {isSuccess ? "success" :"false"}</li>
//         <li>fetchStatus : {fetchStatus }</li>
//         <li>isFetching  : {isFetching ? <strong>isfetching</strong> :"false"}</li>
//         <li>isPaused    : {isPaused ? "Paused" :"false"}</li>
//       </ul>

//       <div>
//     <p>
//       In this example, new items can be created using a mutation. The new item
//       will be optimistically added to the list in hopes that the server
//       accepts the item. If it does, the list is refetched with the true items
//       from the list. Every now and then, the mutation may fail though. When
//       that happens, the previous list of items is restored and the list is
//       again refetched from the server.
//     </p>
//     <form
//       onSubmit={(e) => {
//         e.preventDefault()
//         setText('')
//         addPostMutation.mutate(text)
//       }}
//     >
//       <label htmlFor="title"></label>
//       <input
//       id="title"
//         type="text"
//         name="title"
//         onChange={(event) => setPost(event.target.value)}
//         value={text}
//         placeholder="Title"
//       />
//       <input
//         type="text"
//         name="body"
//         onChange={(event) => setPost(event.target.value)}
//         value={text}
//         placeholder="body"
//       />
//       <button disabled={addTodoMutation.isPending}>Create</button>
//     </form>
//     <br />
//     {isSuccess && (
//       <>
//         <div>
//           {/* The type of queryInfo.data will be narrowed because we check for isSuccess first */}
//           Updated At: {new Date(todoQuery.data.ts).toLocaleTimeString()}
//         </div>
//         <ul>
//           {data.items.map((todo) => (
//             <li key={todo.id}>{todo.text}</li>
//           ))}
//           <CreatePost />
//           {isPending && (
//             <li style={{ opacity: 0.5 }}>{addTodoMutation.variables}</li>
//           )}
         
//         </ul>
//         {todoQuery.isFetching && <div>Updating in background...</div>}
//       </>
//     )}
//     {todoQuery.isPending && 'Loading'}
//     {todoQuery.error instanceof Error && todoQuery.error.message}
//   </div>
//   </div>
//   </>
//   )
// }



