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
      <h1>i frame</h1>
      <table>
        <th>
          <tr colspan="2">vieod1</tr>
          <tr>vieod2</tr>
          <tr>vieod3</tr>
        </th>
        <tbody>
          <tr><iframe width="560" height="315" src="https://www.youtube.com/embed/I7LrS1z_WNA?si=CETYbEQCHdtCpvK5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></tr>
          <tr></tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Details