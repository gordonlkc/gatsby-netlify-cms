import CMS from "netlify-cms";

import AboutPagePreview from "./preview-templates/AboutPagePreview";
import HomePagePreview from "./preview-templates/HomePagePreview";
import ArticlePreview from "./preview-templates/ArticlePreview";
import FooterPreview from "./preview-templates/FooterPreview";
import MenubarPreview from "./preview-templates/MenubarPreview";

CMS.registerPreviewTemplate("articles", ArticlePreview);
CMS.registerPreviewTemplate("footer", FooterPreview);
CMS.registerPreviewTemplate("menubar", MenubarPreview);
CMS.registerPreviewTemplate("about", AboutPagePreview);
CMS.registerPreviewTemplate("home", HomePagePreview);
