import { LinksFunction } from 'react-router';
import SiteMapFolder from 'src/components/sitemap/SitemapFolder';
import sitemapSCSS from "../../src/components/sitemap/Sitemap.scss?url";


export const links : LinksFunction =() =>[
  {rel:"stylesheet", href:sitemapSCSS},
]

function SiteMap() {
  return (
    <div>
        <SiteMapFolder/>
    </div>
  )
}

export default SiteMap;