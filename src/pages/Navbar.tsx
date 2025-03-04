import React, { useState, useEffect } from "react";
import { Flex, Avatar, Box, DropdownMenu, Button } from "@radix-ui/themes";
import { NavLink } from "@remix-run/react";

function Navbar({ id, }) {


  return (
    <>

      <div className="d-flex align-items-center g-2">
        <h1 tabIndex={0} aria-label="Academy instistute"> Academy</h1>
      </div>
      <nav>
        <ul className="d-flex flex-direction-row gap-4 mx-2">
          <li>
            <NavLink to="/" className={({ isActive, isPending }) =>
              isActive
                ? "active-head"
                : isPending
                  ? "pending"
                  : ""
            }>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/students/1" className={({ isActive, isPending }) =>
              isActive
                ? "active-head"
                : isPending
                  ? "pending"
                  : ""
            }>
              Students
            </NavLink>
          </li>
          <li>
            <NavLink to={`/mentors/${id}`} className={({ isActive, isPending }) =>
              isActive
                ? "active-head"
                : isPending
                  ? "pending"
                  : ""
            }>
              Mentors
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* <NavLink to="/">
            <Avatar
              size="4"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="A"
              radius="full"
              alt="profile image of user"
              aria-label="image"
            />
          </NavLink> */}
    </>

  )
}

export default Navbar;
