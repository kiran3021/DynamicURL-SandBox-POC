import { useEffect, useState } from 'react';
import './Sitemap.scss';
import { ArrowIcon, FolderClose, FolderOpen, File } from '../svg/SvgIcons';

import { baseUrl, sandboxURL } from './sitemapData';
type Node = {
  name: string;
  fontSize?: number;
  url?: string;
  show?: boolean;
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
            <div key={node.name} className="d-flex gap-2 align-items-center mb-1 folder" onClick={() => setIsOpen(!isOpen)} >
              <button className="p-0 m-0 button-chever">
                <ArrowIcon isopen={isOpen} />
              </button>
              <div className={`d-flex gap-2 align-items-center size-8 text-sky-500 ${node.nodes.length === 0 ? 'ml-[22px]' : ''} main-header gap-2`}>
                {
                  isOpen ? <FolderOpen /> : <FolderClose />

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
                  <File />
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
            {node.nodes?.map((nod, index) => (
              <Sitemapfiles node={nod} key={nod.name} show={temp ?? false} setShow={setShow} specificNode={specificNode} />
            ))}



          </ul>

        )}

      </li>

    </>

  );
}
