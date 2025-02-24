import { json, redirect } from "@remix-run/node";
import { useEffect, useState } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import "bootstrap/dist/css/bootstrap.min.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "./style.scss";
import '../src/pages/_Main.scss'

import {
  Form,
  Link,
  Links,
  NavLink,
  Meta,
  Scripts,
  Outlet,
  useLoaderData,
  ScrollRestoration,
  useNavigation,
  ClientLoaderFunctionArgs,
  useSubmit,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
// existing imports

import appStylesHref from "./app.css?url";
import Navbar from "src/pages/Navbar";
import Footer from "src/pages/Footer";

// export const links: LinksFunction = () => [
//   { rel: "stylesheet", href: appStylesHref },
// ];
// existing imports

// existing exports
export const loader = async ({ request,params }: LoaderFunctionArgs) => {
  const id = parseInt(params?.page);
  console.log({id})
  return json({ id });
};

export const action = async () => {
  return json({ message: "i am action " });
};

export default function App() {
  // const { contacts, q } = useLoaderData<typeof loader>();
  // the query now needs to be kept in state
  const submit = useSubmit();
  const navigation = useNavigation();
  const {id} = useLoaderData();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        // retry: 3
      },
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body >
          <div className="wrapper">
            <Theme>
              {/* <Navbar />
              <main >
                <div className="main-content">

                <Outlet />
                </div>
              </main>
              <div className="mainfooter">
                <Footer />
              </div> */}

              <div className="wrapper">
             <nav className="navbar-main">
              <Navbar id={id}/>
          </nav>
            <main>
              <Outlet /> 
            </main>
            <footer className="mainfooter">
              <Footer />
             </footer>
           </div>
            </Theme>
          </div>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </QueryClientProvider>
  );
}
// import { json } from "@remix-run/node";
// import type { LoaderFunctionArgs } from "@remix-run/node";
// import { Theme } from "@radix-ui/themes";

// import {
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query';
// import { NavLink } from "@remix-run/react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "@radix-ui/themes/styles.css";
// import "./style.scss";
// import "../src/pages/_Main.scss";

// import {
//   Links,
//   Meta,
//   Scripts,
//   Outlet,
//   ScrollRestoration,
// } from "@remix-run/react";
// import Navbar from "src/pages/Navbar";
// import Footer from "src/pages/Footer";

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   return json({ message: "I am loader" });
// };

// export const action = async () => {
//   return json({ message: "I am action" });
// };

// // Move QueryClient initialization outside the component

// // Separate Document Component for better structure
// const Document = ({ children }: { children: React.ReactNode }) => (
//   <html lang="en">
//     <head>
//       <meta charSet="utf-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1" />
//       <Meta />
//       <Links />
//     </head>
//     <body>
//       {children}
//       <ScrollRestoration />
//       <Scripts />
//     </body>
//   </html>
// );

// export default function App() {

//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         refetchOnWindowFocus: false,
//       },
//     },
//   });
  
//   return (
//     <Theme>
//     <QueryClientProvider client={queryClient}>
//         <Document>
//           <div className="wrapper">
//             <nav className="navbar-main">
//               <Navbar />
//             </nav>
//             <main>
//               <Outlet /> {/* Your page content */}
//             </main>
//             <footer className="mainfooter">
//               <Footer />
//             </footer>
//           </div>

//         </Document>
//     </QueryClientProvider>
//     </Theme>
//   );
// }
