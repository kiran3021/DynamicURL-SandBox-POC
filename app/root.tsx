import {  redirect } from "react-router";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@radix-ui/themes/styles.css";
import "./_style.scss";
import "../src/pages/_Main.scss";
import "../src/Styles/_Common.scss";
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
} from "react-router";
import { Theme } from "@radix-ui/themes";

export default function App() {
  const navigation = useNavigation();
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
          <Theme>
            <main className={navigation.state === "loading" ? "loading" : ""}>
              <Outlet />
            </main>
            <ScrollRestoration />
            <Scripts />
          </Theme>
        </body>
      </html>
    
  );
}
