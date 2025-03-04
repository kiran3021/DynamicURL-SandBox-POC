import { useLoaderData } from '@remix-run/react'
import React from 'react'
import { LoaderFunctionArgs } from '@remix-run/node';
import { getMentorDetails, getStudentlist } from 'src/services/api/actionMentor';

// export const loader = async ({
//     params,
// }: LoaderFunctionArgs) => {
//     // invariant(params.contactId, "Missing contactId param");
//     console.log({ params })
//     const id = params.mentorId ;
//     const res = await getMentorDetails({ id :6});
//     const data = await getStudentlist({id:6}); 
//     console.log(data)
//     if (!res) {
//         throw new Response("Not Found", { status: 404 });
//     }
//     return { res, data };
// };

function Details() {
  // const {res,data} = useLoaderData();
  return (
    <div>
      
    </div>
  )
}

export default Details