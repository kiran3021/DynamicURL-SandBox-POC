import Sitefiles from './SitemapFiles';
import { sitemap } from './sitemapData';
import {  useState } from 'react';
// import "./Sitemap.scss";
type Node = {
  name: string;
  nodes?: Node[];
};

const nodes: Node[] = sitemap;

export default function SiteMapFolder() {
  let [show, setShow] = useState(true);
  return (
    <>

      <div className="container container_sitemap bg-white shadow my-2 p-2 rounded-lg ">
        <div className="text-center">
          <h2>Lightyear Sitemap</h2>
        </div>
        <div className="col-auto ms-5">
          <div className="form-check form-switch"  >
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitch" checked={show} onChange={() => setShow(!show)} />
            <label className="form-check-label" htmlFor="flexSwitch" role='button' tabIndex={0}>
              {show ? <span>Collapse All</span> : <span>Show All</span>}
            </label>
          </div>
        </div>

        <ul className='list-unstyled main-list-sitemap'>
          {nodes.map((node, index) => (
            <>       
              <Sitefiles key={index}  node={node} show={show} setShow={setShow} specificNode={node.name} />
            </>
          ))}
        </ul>
      </div>
    </>
  );
}