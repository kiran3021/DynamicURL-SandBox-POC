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
import { Links, Meta, Scripts, Outlet, ScrollRestoration, } from "@remix-run/react";
import { Theme } from "@radix-ui/themes";
import Footer from "src/pages/Footer";
import Navbar from "src/pages/Navbar";


export default function App() {

  return (
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
          <Navbar />
          <main>
            <Outlet />
          </main>
          <Footer />

          <ScrollRestoration />
          <Scripts />
        </Theme>
      </body>
    </html>
  );
}
