import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={400}
    viewBox="0 0 280 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="130" cy="130" r="120" />
    <rect x="0" y="270" rx="15" ry="15" width="280" height="30" />
    <rect x="0" y="340" rx="15" ry="15" width="110" height="30" />
    <rect x="130" y="332" rx="15" ry="15" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
