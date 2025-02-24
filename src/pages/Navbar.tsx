import React from "react";
import { Flex, Avatar, Box } from "@radix-ui/themes";
import { NavLink } from "@remix-run/react";


function Navbar({id}) {

  return (
    // <nav className="container-fluid"  aria-labelledby="navbar-div">
    <>
      <header tabIndex={0}>Acadamy</header>

      <ul className="d-flex flex-direction-row gap-4 mx-2">
        <li>
          <NavLink to='/' className="s">

            Home
          </NavLink>
        </li>

        <li>
          <NavLink to='/students' className="">

            Students
          </NavLink>
        </li>
        <li>
          <NavLink to={`/mentors/${id}`} className=''>

            Mentors
          </NavLink>
        </li>
      </ul>

      <NavLink to="/">
        <Avatar
          size={"4"}
          src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
          fallback="A"
          radius="full"
          alt="profile image of user"
          aria-label="image"
        />
      </NavLink>
    </>
    // </nav>
  );
}

export default Navbar;
