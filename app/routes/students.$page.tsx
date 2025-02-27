import React from 'react'
import { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import StudentList from 'src/components/StuentsList';

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    // invariant(params.contactId, "Missing contactId param");
    console.log({ params })
    const id = parseInt(params.page);
    // const res = await getMentorDetails({ id });
    // console.log(res)
    // if (!res) {
    //     throw new Response("Not Found", { status: 404 });
    // }
    return json({ id });
};

function StudentListRoute() {
    const { id } = useLoaderData();
    // const  id  = 4;

    return (
        <div>
            <StudentList id={id} />
        </div>
    )
}
export default StudentListRoute;