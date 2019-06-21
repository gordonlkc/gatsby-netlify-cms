import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

import "../styles";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Menubar } from "../components/Menubar";
import { Footer } from "../components/Footer";



const TemplateWrapper = ({ footerData = null, menubarData = null, children }) => (
  <div>
    <Helmet>
      <html lang="en" />
      <meta name="keywords" content="montreal, javascript, programming, meetup" />
    </Helmet>
    <Menubar data={menubarData} />
    <main>{children}</main>
    <Footer data={footerData} />
  </div>
);

export const query = graphql`
  fragment LayoutFragment on Query {
    footerData: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "footer" } } }) {
      edges {
        node {
          id
          frontmatter {
            logoImage {
              image
              imageAlt
              tagline
            }
            socialLinks {
              image
              imageAlt
              label
              linkURL
            }
          }
        }
      }
    }
    menubarData: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "menubar" } } }) {
      edges {
        node {
          id
          frontmatter {
            menuTitle
            logoImage {
              image
              imageAlt
            }
            menuItems {
              label
              linkType
              linkURL
              subItems {
                label
                linkType
                linkURL
              }
            }
          }
        }
      }
    }
  }
`;

export default TemplateWrapper;
