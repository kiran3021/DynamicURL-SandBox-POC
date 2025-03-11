import { useEffect, useState } from 'react';
import './Sitemap.scss'
import { baseUrl, sandboxURL } from './sitemapData';
type Node = {
  name: string;
  fontSize?: number;
  url?: string;
  show?:boolean;
  nodes?: Node[];
};

export default function Sitemapfiles({ node, show, setShow, specificNode }: { node: Node, show: boolean, setShow: any, specificNode: string }) {
  let [isOpen, setIsOpen] = useState<boolean>();
  const [temp, setTemp] = useState<boolean>();

  useEffect(() => {
    // if(!(node?.show)){
    //   // setIsOpen(false);
    //   setTemp(false)

    // }else{
    //   setTemp(show);
    // }
    if (specificNode == "Content") {
      setTemp(false);
    } else {
      setTemp(true);
    }
    setIsOpen(show)
  }, [show])

  return (
    <>
      <li key={node.name} className='ms-5'>
        {node.nodes && node.nodes.length > 0 ? (
          <>
            <div key={node.name} className="d-flex gap-2 align-items-center mb-1 folder" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
              <button className="p-0 m-0 button-chever">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-caret-right-square" viewBox="0 0 16 16" style={{ transform: isOpen ? 'rotate(90deg)' : '' }}>
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  <path d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082" />
                </svg>
              </button>
              <div className={`d-flex gap-2 align-items-center size-8 text-sky-500 ${node.nodes.length === 0 ? 'ml-[22px]' : ''} main-header gap-2`}>
                {
                  isOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-folder2-open" viewBox="0 0 16 16">
                    <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z" />
                  </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-folder2" viewBox="0 0 16 16">
                      <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5z" />
                    </svg>
                }
                {
                  node?.url ?
                    <a href={`${sandboxURL}${baseUrl}${node?.url}`} target='_blank' className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">  <span>  {node.name}</span> </a> :
                    <span>  {node.name}</span>
                }
              </div>
            </div>
          </>

        ) : (
          <>
            <div className="d-flex gap-2 align-items-center mb-1 file">
              <div className="vr "></div>
              <div className='sub-name d-flex gap-2 align-items-center'>
                <i>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark" viewBox="0 0 16 16">
                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
                  </svg>
                </i>
                {
                  node?.url ?
                    <a href={`${sandboxURL}${baseUrl}${node.url}`} target='_blank' className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">  <span>  {node.name}</span> </a>
                    :
                    <span >{node.name}</span>
                }
              </div>

            </div>

          </>


        )}

        {isOpen && node.nodes && (

          <ul className="list-unstyled vr">
            {node.nodes?.map((nod,index) => (
              <Sitemapfiles node={nod} key={nod.name} show={temp ?? false} setShow={setShow} specificNode={specificNode} />
            ))}



          </ul>

        )}

      </li>

    </>

  );
}
