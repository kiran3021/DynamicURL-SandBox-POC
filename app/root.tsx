import { json, redirect } from "@remix-run/node";
import { useEffect, useState } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "@radix-ui/themes/styles.css";
import "./style.scss";
import "../src/pages/_Main.scss";
import "../src/Styles/_Common.scss";
import { Form, Link, Links, NavLink, Meta, Scripts, Outlet, useLoaderData, ScrollRestoration, useNavigation, ClientLoaderFunctionArgs, useSubmit } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
// existing imports

import appStylesHref from "./app.css?url";
import Navbar from "src/pages/Navbar";
import Footer from "src/pages/Footer";
import { Theme } from "@radix-ui/themes";
// import styles from "~/styles/sales.css?url";
// import styles from '~'

// export const links: LinksFunction = () => [
//   { rel: "stylesheet", href: styles },
// ];
// export const links: LinksFunction = () => [
//   { rel: "stylesheet", href: appStylesHref },
// ];
// existing imports

// existing exports
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = parseInt(params?.page) || 1;
  console.log({ id });
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
  const { id  } = useLoaderData();
  const [isMobile, setIsMobile] = useState("");
  // useEffect(() => {
  //   // Dynamically import Bootstrap's JavaScript on the client side
  //   import("bootstrap/dist/js/bootstrap.bundle.min.js");
  // }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        // retry: 3
      },
    },
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    } else {
      return '';
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title aria-label="title Acadamy"> Acadamy</title>

          <Meta />
          <Links />
        </head>
        <body>
          <Theme>
          {/* <header aria-label="header" className="navbar-main">
            <a className="visually-hidden-focusable" href="#content">
              Skip to main content
            </a>
            <Navbar id={id} isMobile={isMobile} />
          </header> */}
          <div className="wrapper" aria-label="body">
            <main className={navigation.state === "loading" ? "loading" : ""}>
              <Outlet />
            </main>
            {/* <footer className="mainfooter" role="contentinfo">
              <Footer />
            </footer> */}
          </div>
          <ScrollRestoration />
          <Scripts />
          </Theme>
        </body>
      </html>
    </QueryClientProvider>
  );
}
