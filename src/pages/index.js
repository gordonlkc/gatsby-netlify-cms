import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import isAfter from "date-fns/is_after";

import Layout from "../components/Layout";
import Map from "../components/Map";
import HeadshotPlaceholder from "../img/headshot-placeholder.svg";
import CustomLink from "../components/CustomLink";
import "../styles/home.scss";

export const HomePageTemplate = ({ home, latestArticle = null }) => {
  const author = latestArticle && latestArticle.author;
  const latitude = latestArticle && parseFloat(latestArticle.location.mapsLatitude);
  const longitude = latestArticle && parseFloat(latestArticle.location.mapsLongitude);
  return (
    <>
      <section className="header">
        <div className="header-container  container">
          {home.headerImage && <img className="header-image" src={home.headerImage.image} alt={home.headerImage.imageAlt} />}
          <h3 className="header-tagline">
            <span className="header-taglinePart">{home.title}</span>
          </h3>
        </div>
      </section>
      <section className="latestArticle  section">
        <div className="latestArticle-container  container">
          <h2 className="latestArticle-title">{home.latestArticleHeading}</h2>
          {latestArticle ? (
            <>
              <p className="latestArticle-detail  latestArticle-detail--date">
                <span className="latestArticle-detailLabel">Date: </span>
                {latestArticle.formattedDate}
              </p>
              <p className="latestArticle-detail  latestArticle-detail--location">
                <span className="latestArticle-detailLabel">Location: </span>
                {latestArticle.location.name}
              </p>
              <p className="latestArticle-mapNote">{home.mapsNote}</p>
              <div className="latestArticle-mapWrapper">
                <Map
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTxauB_VWpo0_8hWELlE3pN59uuHzxD-8&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `100%` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  link={latestArticle.location.mapsLink}
                  latitude={latitude}
                  longitude={longitude}
                />
              </div>
            </>
          ) : (
            <p className="latestArticle-detail">{home.noLatestArticleText}</p>
          )}
        </div>
      </section>
      <section className="ctaBlock">
        <CustomLink
          linkType={home.callToActions.firstCTA.linkType}
          linkURL={home.callToActions.firstCTA.linkURL}
          className="ctaBlock-pattern  ctaBlock-pattern--first"
        >
          <div className="ctaBlock-cta">
            <span className="ctaBlock-ctaHeading">{home.callToActions.firstCTA.heading}</span>
            <p className="ctaBlock-ctaDescription">{home.callToActions.firstCTA.subHeading}</p>
          </div>
        </CustomLink>
        <CustomLink
          linkType={home.callToActions.secondCTA.linkType}
          linkURL={home.callToActions.secondCTA.linkURL}
          className="ctaBlock-pattern  ctaBlock-pattern--second"
        >
          <div className="ctaBlock-cta">
            <span className="ctaBlock-ctaHeading">{home.callToActions.secondCTA.heading}</span>
            <p className="ctaBlock-ctaDescription">{home.callToActions.secondCTA.subHeading}</p>
          </div>
        </CustomLink>
      </section>
    </>
  );
};

class HomePage extends React.Component {
  render() {
    const { data } = this.props;
    const {
      data: { footerData, menubarData },
    } = this.props;
    const { frontmatter: home } = data.homePageData.edges[0].node;
    const {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    } = home;
    let latestArticle = null;
    // Find the next article that is closest to today
    // data.allMarkdownRemark.edges.every(item => {
    //   const { frontmatter: article } = item.node;
    //   if (isAfter(article.rawDate, new Date())) {
    //     latestArticle = article;
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
    return (
      <Layout footerData={footerData} menubarData={menubarData}>
        <Helmet>
          <meta name="title" content={seoTitle} />
          <meta name="description" content={seoDescription} />
          <title>{browserTitle}</title>
        </Helmet>
        <HomePageTemplate home={home} latestArticle={latestArticle} />
      </Layout>
    );
  }
}

HomePage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default HomePage;

export const pageQuery = graphql`
  query HomePageQuery {
    # allMarkdownRemark(
    #   sort: { order: DESC, fields: frontmatter___date }
    # ) {
    #   edges {
    #     node {
    #       frontmatter {
    #         title
    #         formattedDate: date(formatString: "MMMM Do YYYY @ h:mm A")
    #         rawDate: date
    #         author {
    #           name
    #         }
    #         category
    #         thumbnail {
    #           image
    #           imageAlt
    #         }
    #         body
    #       }
    #     }
    #   }
    # }
    ...LayoutFragment
    homePageData: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "home-page" } } }) {
      edges {
        node {
          frontmatter {
            title
            headerImage {
              image
              imageAlt
            }
            mapsNote
            callToActions {
              firstCTA {
                heading
                subHeading
                linkType
                linkURL
              }
              secondCTA {
                heading
                subHeading
                linkType
                linkURL
              }
            }
            seo {
              browserTitle
              title
              description
            }
          }
        }
      }
    }
  }
`;
