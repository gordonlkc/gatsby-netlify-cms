import React, { Component } from "react";
import PropTypes from "prop-types";
import "../styles/article.scss";

import HeadshotPlaceholder from "../img/headshot-placeholder.svg";

class ArticleTemplate extends Component {
  render() {
    return (
      <section
        className={`article  ${this.props.className && this.props.className}`}
        key={this.props.article.rawDate}
      >
        <h2 className="article-title">{this.props.article.title}</h2>
        <div className="article-meta">
          <p className="article-metaField  article-metaField--date">
            <span className="article-label">Date:</span> {this.props.article.formattedDate}
          </p>
          <p className="article-metaField  article-metaField--location">
            <span className="article-label">Location:</span> {this.props.article.location.name}
          </p>
        </div>
        <div className="article-presenters">
          {this.props.article.presenters.map(presenter => (
            <div className="article-presenter" key={presenter.name}>
              <div className="article-presenterImageContainer">
                <img
                  className="article-presenterImage"
                  src={presenter.image ? presenter.image : HeadshotPlaceholder}
                  alt={presenter.image ? presenter.name : "Default headshot placeholder"}
                />
                <span className="article-presenterName">{presenter.name}</span>
              </div>
              <div className="article-presenterInfo">
                {presenter.presentationTitle && (
                  <h3 className="article-presenterTitle">{presenter.presentationTitle}</h3>
                )}
                <p className="article-presenterText">{presenter.text}</p>
                <ul className="article-presenterLinks">
                  {presenter.links &&
                    presenter.links.map((link, index) => (
                      <li key={index} className="article-presenterLinkItem">
                        <a className="article-presenterLink" href={link.linkURL}>
                          {link.linkText}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

ArticleTemplate.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    presenters: PropTypes.array,
  }),
};

export default ArticleTemplate;
