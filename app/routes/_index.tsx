import { useEffect, useState } from 'react';
import UrlCreator from 'src/components/UrlCreator';
import { LoaderFunctionArgs, useLoaderData } from 'react-router';
// import type { Route } from "./types/my-route";

// import { json } from 'react-router';

export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("url");
  return { q };
};



function HomeIndex() {
  const { q } = useLoaderData();
  const [render, setRender] = useState(false)
  const [query, setQuery] = useState("");
  // console.log({ q })

  useEffect(() => {
    if (q) {
      setQuery(q);
    } else (
      setQuery("")
    )
  }, [q])

  return (
    <div>
      <UrlCreator query={query} />
    </div>
  )
}

export default HomeIndex