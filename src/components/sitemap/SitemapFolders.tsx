import Sitefiles from './SiteFiles';
import { sitemap } from './sitemapData';
import { useEffect, useState } from 'react';
import { CheckboxCards } from '@radix-ui/themes';
import "./Sitemap.scss";
type Node = {
  name: string;
  nodes?: Node[];
};

const nodes: Node[] = sitemap;

export default function SiteMapPage() {
  let [show, setShow] = useState(true);
  return (
    <>
      <div className="container bg-white shadow my-2 p-2 rounded-lg ">
        <div className="text-center">
          <h2>SIM Net SITE MAP</h2>
        </div>
        <div className="col-auto ms-5">
          <div className="form-check form-switch"  >
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitch" checked={show} onChange={() => setShow(!show)} />
            {/* <input type="checkbox" className="btn-check" id="btn-check-2-outlined" checked={show} autoComplete="off" /> */}
            {/* <label className="btn btn-outline-secondary" htmlFor="flexSwitch">{show ? <span>Hide</span> : <span> Show</span>}</label><br></br> */}
            <label className="form-check-label" htmlFor="flexSwitch" role='button' tabIndex={0}>
              {show ? <span>Collapse All</span> : <span>Show All</span>}
            </label>
          </div>
        </div>

        <ul className='list-unstyled'>
          {nodes.map((node, index) => (
            <> 
            {console.log(node?.show )}
            {/* {
              node.name == "Content" ?  */}

              <Sitefiles node={node} key={index} show={show} setShow={setShow} specificNode={node.name} />
              {/* <Sitefiles node={node} key={index} show={show} setShow={setShow} specificNode={node.name} /> */}

            {/* } */}
            
            </>
          ))}
        </ul>
      </div>

    </>

  );
}

// [
//   {
//     name: 'Home',
//     nodes: [
//       {
//         name: 'Movies',
//         nodes: [
//           {
//             name: 'Action',
//             nodes: [
//               {
//                 name: '2000s',
//                 nodes: [
//                   { name: 'Gladiator.mp4' },
//                   { name: 'The-Dark-Knight.mp4' },
//                 ],
//               },
//               { name: '2010s', nodes: [] },
//             ],
//           },
//           {
//             name: 'Comedy',
//             nodes: [{ name: '2000s', nodes: [{ name: 'Superbad.mp4' }] }],
//           },
//           {
//             name: 'Drama',
//             nodes: [
//               { name: '2000s', nodes: [{ name: 'American-Beauty.mp4' }] },
//             ],
//           },
//         ],
//       },
//       {
//         name: 'Music',
//         nodes: [
//           { name: 'Rock', nodes: [] },
//           { name: 'Classical', nodes: [] },
//         ],
//       },
//       { name: 'Pictures', nodes: [] },
//       {
//         name: 'Documents',
//         nodes: [],
//       },
//       { name: 'passwords.txt' },
//     ],
//   },
// ];
