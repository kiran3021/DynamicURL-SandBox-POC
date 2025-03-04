import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts";

export default function PostsList2() {
  const { status, isError, error,  isLoading, isSuccess, data,fetchStatus ,isFetching,} = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (status === "loading") return <h1>Loading...</h1>;
  if (status === "error") {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  return (
    <div>
      <h1>Post List 2</h1>
      <ol>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
}
