import React from "react";

import "./styles.scss";
import CustomLink from "../CustomLink";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const MenubarTemplate = ({ data }) => (
<Navbar collapseOnSelect expand="lg" variant="dark" sticky="top">
  <Navbar.Brand href="/">{data.menuTitle}</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-menubar-nav" />
  <Navbar.Collapse id="responsive-menubar-nav">
    <Nav className="mr-auto">
      {data.menuItems.map((menuItem) => {
        return (
          (menuItem.subItems && menuItem.subItems.length>0) ? 
          (<NavDropdown title={menuItem.label} id="collasible-nav-dropdown" key={menuItem.linkURL} href={menuItem.linkURL}>
            {menuItem.subItems.map((subItem) => {
              return (<NavDropdown.Item key={subItem.linkURL} href={subItem.linkURL}> {subItem.label} </NavDropdown.Item>);
            })}
          </NavDropdown>) :
          (<Nav.Link key={menuItem.linkURL} href={menuItem.linkURL}>{menuItem.label}</Nav.Link>)
        )
      })}
    </Nav>
  </Navbar.Collapse>
</Navbar>
);

const Menubar = props => {
  if (!props.data) {
    return null;
  }
  const data = props.data.edges[0].node.frontmatter;
  return <MenubarTemplate data={data} />;
};

export { Menubar };
