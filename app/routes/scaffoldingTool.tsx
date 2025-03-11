import { useEffect, useState } from 'react';
import UrlCreator from 'src/components/UrlCreator';
import { LoaderFunctionArgs, useLoaderData } from 'react-router';

export const loader = async ({
    request,
}: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    console.log(url);
    let q;
    if (url.search) {
        q = decodeURIComponent(url.search.split("?url=")[1])
    } else {
        q = null
    }
    //console.log(q)
    return { q };
};


function ScaffoldingTool() {
    const { q } = useLoaderData();
    const [render, setRender] = useState(false)
    const [query, setQuery] = useState("");
    console.log({ q })

    useEffect(() => {
        setQuery(q);
    }, [q])

    return (
        <div>
            <UrlCreator query={query} />
        </div>
    )
}

export default ScaffoldingTool