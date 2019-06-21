import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";

import ArticleTemplate from "../../templates/article";

const ArticlePreview = ({ entry }) => {
  const article = entry.getIn(["data"]).toJS();
  const rawDate = article.date;
  const formattedDate = format(rawDate, "MMMM Do YYYY @ h:mm A");
  return <ArticleTemplate article={{ ...article, formattedDate, rawDate }} />;
};

ArticlePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default ArticlePreview;
