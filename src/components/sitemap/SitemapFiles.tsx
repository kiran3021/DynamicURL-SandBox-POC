import { useEffect, useState } from 'react';
import './Sitemap.scss';
import { ArrowIcon, FolderClose, FolderOpen, File } from '../svg/SvgIcons';
import { BsFolder2 ,BsFolder2Open,BsFileEarmarkText,BsArrowBarDown,BsArrowBarRight} from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { BsArrowRightSquareFill } from "react-icons/bs";


import { baseUrl, sandboxURL } from './sitemapData';
import {  } from "react-icons/bs";
import {  } from "react-icons/bs";

type Node = {
  name: string;
  fontSize?: number;
  url?: string;
  show?: boolean;
  nodes?: Node[];
};

export default function Sitemapfiles({ node, show, setShow, specificNode }: { node: Node, show: boolean, setShow: any, specificNode: string }) {
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const [temp, setTemp] = useState<boolean>(false);

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
              <button className="p-0 m-0 button-chever d-flex justify-content-center">
                {isOpen ? <BsArrowBarDown/> : <BsArrowBarRight/>}
              </button>
              <div className={`d-flex gap-2 align-items-center size-8 text-sky-500 ${node.nodes.length === 0 ? 'ml-[22px]' : ''} main-header gap-2`}>
                {
                  isOpen ?<BsFolder2Open /> :  <BsFolder2/>

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
                  <BsFileEarmarkText/>
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
