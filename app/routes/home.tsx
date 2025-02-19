import React from "react";
import { Outlet } from "@remix-run/react";
function Home() {


  return(<div> 
   <Outlet/>
  </div>);
}

export default Home;
