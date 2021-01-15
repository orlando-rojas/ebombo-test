import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavItem({ href, children, ...props }) {
  return (
    <Nav.Item>
      <Link to={href}>
        <Nav.Link href={href} {...props} as="span">
          {children}
        </Nav.Link>
      </Link>
    </Nav.Item>
  );
}

export default function Navbar() {
  return (
    <Nav justify variant="tabs" defaultActiveKey={window.location.pathname}>
      <NavItem href="/">Form</NavItem>
      <NavItem href="/list" eventKey="/list">
        List
      </NavItem>
    </Nav>
  );
}
