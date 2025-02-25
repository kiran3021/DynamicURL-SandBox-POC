import React, { useState, useEffect } from "react";
import { Flex, Avatar, Box, DropdownMenu, Button } from "@radix-ui/themes";
import { NavLink } from "@remix-run/react";

function Navbar({ id, isMobile }) {


  return (
    <>
      {isMobile ? (
        <>
          <div className="d-flex align-items-center g-2">
            <header tabIndex={0}>Academy</header>

          </div>
          <NavLink to="/">
            {/* <Avatar
              size="4"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="A"
              radius="full"
              alt="profile image of user"
              aria-label="image"
            /> */}
          </NavLink>
          <div className="d-flex justify-content-center align-items-center">
            {/* <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="solid" color="indigo">
                  <span>Menu</span>
                  <svg
                    width="30"
                    height="20"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 3.1a.4.4 0 0 0 0 .8h7a.4.4 0 1 0 0-.8h-7zm0 2a.4.4 0 0 0 0 .8h7a.4.4 0 1 0 0-.8h-7zm0 2.4a.4.4 0 0 0 0 .8h7a.4.4 0 1 0 0-.8h-7zm0 2a.4.4 0 0 0 0 .8h7a.4.4 0 1 0 0-.8h-7zm-5-1.85L5 6H0l2.5 3.25z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content variant="solid">
                <DropdownMenu.Item asChild>
                  <NavLink to="/">Home</NavLink>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <NavLink to="/students">Students</NavLink>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <NavLink to={`/mentors/${id}`}>Mentors</NavLink>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root> */}
          </div>
          <ul className="d-flex flex-sm-row  flex-md-row gap-2 mx-1">
            <li>
              <NavLink to="/"  className={({ isActive, isPending }) =>
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
              <NavLink to="/students"  className={({ isActive, isPending }) =>
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
              <NavLink to={`/mentors/${id}`}  className={({ isActive, isPending }) =>
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
        </>

      ) : (
        <>
          <div className="d-flex align-items-center g-2">
            <header tabIndex={0}>Academy</header>

          </div>

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
              <NavLink to="/students" className={({ isActive, isPending }) =>
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
      )}
    </>
  );
}

export default Navbar;
