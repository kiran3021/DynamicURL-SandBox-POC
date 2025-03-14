import { useEffect, } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./_style.scss";
import "../src/components/styles/Button.scss";
import {
  Links,
  ScrollRestoration,
  Meta,
  Scripts,
  Outlet,
} from "react-router";

export default function App() {
  useEffect(() => {
    // Dynamically import Bootstrap's JavaScript on the client side
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

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
          <main>
            <Outlet />
          </main>
          <ScrollRestoration />
          <Scripts />
      </body>
    </html>

  );
}
