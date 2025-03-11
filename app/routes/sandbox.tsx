import { useEffect, useState } from 'react';
import UrlCreator from 'src/components/sandbox/UrlCreator';
import { LoaderFunctionArgs, useLoaderData } from 'react-router';
import styleURl from '../../src/components/sandbox/urlCreator.scss?url';
import { LinksFunction } from 'react-router';
export const loader = async ({
    request,
}: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    // console.log(url);
    let q = null;
    if (url.search) {
        q = decodeURIComponent(url.search.split("?url=")[1])
    }
    return { q };
};

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styleURl  },
  ];


function Sandbox() {
    const { q } = useLoaderData();
    const [query, setQuery] = useState("");
    useEffect(() => {
        setQuery(q);
    }, [q])

    return (
        <div>
            <UrlCreator query={query} />
        </div>
    )
}

export default Sandbox;