import React from "react";
import PropTypes from "prop-types";

import { MenubarTemplate } from "../../components/Menubar";

const MenubarPreview = ({ entry }) => {
  const data = entry.getIn(["data"]).toJS();
  return <MenubarTemplate data={data} />;
};

MenubarPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default MenubarPreview;
