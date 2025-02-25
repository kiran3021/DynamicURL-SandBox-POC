import { useLoaderData } from '@remix-run/react';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { LoaderFunctionArgs } from '@remix-run/node';
import { getMentorDetails, getStudentlist } from 'src/services/api/actionMentor';
import { json } from '@remix-run/node';
import { DataList, Link, Flex } from '@radix-ui/themes';

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    // invariant(params.contactId, "Missing contactId param");
    console.log({ params })
    const id = params.mentorId;
    const res = await getMentorDetails({ id });
    const data = await getStudentlist({id}); 
    console.log(data)
    if (!res) {
        throw new Response("Not Found", { status: 404 });
    }
    return { res, data };
};
function MentorDetailsRoute() {
    const { res, data } = useLoaderData();
    // const { isFetching, data, ...queryInfo } = useQuery({
    //     queryKey: ["getMentorDetails", res.id], 
    //     queryFn : () => (res), 
    // })
    console.log({ res })
    console.log({data})


    return (
        <div className='d-flex flex-column g-6 detials-mentor'>
            {/* <div className="d-flex"> */}

            <div className="container w-75 py-5 mx-auto mb-4 bg-white rounded shadow" >
                <header className='mx-auto' style={
                    {width: "20%"}
                }>
                    <h1>Details </h1>
                </header>
                <div className="container">
                    <div className="row justify-content-center">
                        {/* <!-- First Card --> */}
                        <div className="col-lg-5 col-md-10 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <div className="mt-3">
                                            <h5 className="card-title">{ res.firstName }{ res.lastName }</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{ res.company.title } </h6>
                                            <p className="text-secondary mb-1"><strong>{ res.company.department } Department</strong></p>
                                            <p className="text-secondary mb-1">Working At <strong>{ res.company.name }</strong></p>
                                            <p className="text-secondary mb-1">{ res.company.address.city }</p>
                                            <p className="text-secondary mb-1">{ res.company.address.country }</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Second Card --> */}
                        <div className="col-lg-7 col-md-10 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{ res.firstName } { res.lastName }</h5>
                                    <dl className="row">
                                        <dt className="col-sm-4">Age</dt>
                                        <dd className="col-sm-8">{ res.age }</dd>

                                        <dt className="col-sm-4">Gender</dt>
                                        <dd className="col-sm-8">{ res.gender }</dd>

                                        <dt className="col-sm-4">Email</dt>
                                        <dd className="col-sm-8">{ res.email }</dd>

                                        <dt className="col-sm-4">Username</dt>
                                        <dd className="col-sm-8">{ res.username }</dd>

                                        <dt className="col-sm-4">Address</dt>
                                        <dd className="col-sm-8">{ res.address.city }, { res.address.state }, { res.address.country }</dd>

                                        <dt className="col-sm-4">Phone</dt>
                                        <dd className="col-sm-8">{ res.phone }</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container w-75 py-2 mx-auto mb-4 bg-white rounded shadow">
            <div className="row">
                {data ? 
              <div className="col-lg-10 col-md-12 mx-auto">
                <div className="table-responsive-sm table-responsive-md table-responsive-lg">
                  
                  <table className="table table-fixed table-hover caption-top align-middle">
                    <caption>List of Students</caption>
                    <thead className="table-head">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col" className="col-md-2">Name</th>
                        <th scope="col">Projects</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Score</th>
                        <th scope="col">Attendence(%)</th>
                        <th scope="col">Total</th>
                      
                      </tr>
                    </thead>

                    <tbody className="table-group-divider">
                      {data.map((ele, index: number) => (
                        <tr key={ele.id}>
                          <th scope="row">{ele.id}</th>
                          <td className="col-3 col-md-2">
                              <span className="link-details"> {ele.title.slice(0,6)} Name</span>


                          </td>
                          <td> {ele.title}</td>
                          <td> {ele.quantity}</td>
                          <td> {ele.price}</td>
                          <td>{ele.discountPercentage}</td>
                          <td>{ele.total}</td>
                         
                         
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              : 
              <span>NO Dat available</span>
}
            </div>            </div>
        </div>
    )
}

export default MentorDetailsRoute;



// <div className="card mb-3" style={ "max-width": "540px" }} >
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