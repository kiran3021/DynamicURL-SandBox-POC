import { useLoaderData } from '@remix-run/react';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { LoaderFunctionArgs } from '@remix-run/node';
import { getMentorDetails } from 'src/services/api/actionMentor';
import { json } from '@remix-run/node';
import { DataList, Link, Flex } from '@radix-ui/themes';

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    // invariant(params.contactId, "Missing contactId param");
    console.log({ params })
    const id = params.mentorId;
    const res = await getMentorDetails({ id });
    console.log(res)
    if (!res) {
        throw new Response("Not Found", { status: 404 });
    }
    return json({ res });
};
function MentorDetailsRoute() {
    const { res } = useLoaderData();
    // const { isFetching, data, ...queryInfo } = useQuery({
    //     queryKey: ["getMentorDetails", res.id], 
    //     queryFn : () => (res), 
    // })
    console.log({ res })


    return (
        <div className='d-flex flex-column g-6'>
            <div className="container w-75 py-5 mx-auto mb-4 bg-white rounded shadow" >
                <h1>Details</h1>
                <div className="row g-4 h-20%" style={{ height: "50%" }}>

                    <div className="col-md-4 mb-3">
                        <div className="card" style={{ "height": "17rem" }}>
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    {/* <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"> */}
                                    <div className="mt-3">
                                        <h4>John Doe</h4>
                                        <p className="text-secondary mb-1">{res.company.title}</p>
                                        <p className="text-secondary mb-1"><strong> {res.company.department} Department</strong></p>
                                        <p className="text-secondary mb-1"> Working At <strong> {res.company.name}</strong></p>
                                        <p className="text-secondary mb-1"> {res.company.address.city}</p>
                                        <p className="text-secondary mb-1">  {res.company.address.country}</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 mb-3">
                        <div className="card" style={{ "height": "17rem" }}>
                            <div className="card-body">
                                {/* <div className="d-flex flex-column align-items-center text-center">
                                <div className="mt-3">
                                    <h4>John Doe</h4>
                                    <p className="text-secondary mb-1">{res.email}</p>
                                    <p className="text-muted font-size-sm">{res.phone}</p>
                                    <p className="text-muted font-size-sm">Age - {res.age}</p>
                                    <p className="text-muted font-size-sm">BGender : {res.gender}</p>
                                    <p className="text-muted font-size-sm">Username : {res.Username}</p>

                                </div>
                            </div> */}

                                <Flex direction="column" justify={"center"} >
                                    <DataList.Root orientation={{ initial: "vertical", sm: "horizontal" }}>
                                        <DataList.Item >
                                            <DataList.Label minWidth="88px">Age</DataList.Label>
                                            <DataList.Value>{res.age}</DataList.Value>
                                        </DataList.Item>
                                        <DataList.Item >
                                            <DataList.Label minWidth="88px">Gender</DataList.Label>
                                            <DataList.Value>{res.gender}</DataList.Value>
                                        </DataList.Item>
                                        <DataList.Item>
                                            <DataList.Label minWidth="88px">Email</DataList.Label>
                                            <DataList.Value>
                                                <Link href="mailto:vlad@workos.com">{res.email}</Link>
                                            </DataList.Value>
                                        </DataList.Item>
                                        <DataList.Item>
                                            <DataList.Label minWidth="88px">Username</DataList.Label>
                                            <DataList.Value>
                                                {/* <Link target="_blank" href="https://workos.com">
                                                WorkOS
                                            </Link> */}
                                                {res.username}
                                            </DataList.Value>
                                        </DataList.Item>
                                        <DataList.Item>
                                            <DataList.Label minWidth="88px">Address</DataList.Label>
                                            <DataList.Value>
                                                {/* <Link target="_blank" href="https://workos.com">
                                                WorkOS
                                            </Link> */}
                                                {res.address.city}, {res.address.state},{res.address.country}
                                            </DataList.Value>
                                        </DataList.Item>
                                        <DataList.Item>
                                            <DataList.Label minWidth="88px">Username</DataList.Label>
                                            <DataList.Value>
                                                {/* <Link target="_blank" href="https://workos.com">
                                                WorkOS
                                            </Link> */}
                                                {res.username}
                                            </DataList.Value>
                                        </DataList.Item>

                                        <DataList.Item>
                                            <DataList.Label minWidth="88px">Phone</DataList.Label>
                                            <DataList.Value>
                                                {/* <Link target="_blank" href="https://workos.com">
                                                WorkOS
                                            </Link> */}
                                                {res.phone}
                                            </DataList.Value>
                                        </DataList.Item>
                                    </DataList.Root>
                                </Flex>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div className="container w-75 py-2 mx-auto mb-4 bg-white rounded shadow">
                <h2>Student List</h2>
            </div>
        </div>
    )
}

export default MentorDetailsRoute;



// <div className="card mb-3" style={{ "max-width": "540px" }} >
// <div className="row g-0">
//     <div className="col-md-4">
//         <img
//             src="Image Source"
//             className="img-fluid rounded-start"
//             alt="Card title"
//         />
//     </div>
//     <div className="col-md-8">
//         <div className="card-body">
//             <h3 className="card-title">{res.firstName} {res.lastName}</h3>
//             <ul>
//                 <li> Age : {res.Age}</li>
//                 <li> Age : {res.Age}</li>
//                 <li> Age : {res.Age}</li>
//                 <li> Age : {res.Age}</li>
//                 <li> Age : {res.Age}</li>
//             </ul>
//             <p className="card-text">
//                 This is a wider card with supporting text below as a
//                 natural lead-in to additional content. This content is a
//                 little bit longer.
//             </p>
//             <p className="card-text">
//                 <small className="text-muted"
//                 >Last updated 3 mins ago</small>
//             </p>
//         </div>
//     </div>
// </div>
// </div>