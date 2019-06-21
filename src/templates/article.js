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
        </div>
        {this.props.article.author}
        <div className="article-description">
          <span> 
            {this.props.article.body}
          </span>
        </div>

      </section>
    );
  }
}

ArticleTemplate.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    author: PropTypes.object,
  }),
};

export default ArticleTemplate;
