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
    <rect x="150" y="320" rx="15" ry="15" width="130" height="80" />
    <rect x="0" y="80" rx="10" ry="10" width="280" height="100" />
    <rect x="0" y="200" rx="10" ry="10" width="280" height="100" />
    <rect x="0" y="10" rx="10" ry="10" width="280" height="50" />
    <rect x="0" y="320" rx="10" ry="10" width="130" height="80" />
  </ContentLoader>
);

export default Skeleton;
