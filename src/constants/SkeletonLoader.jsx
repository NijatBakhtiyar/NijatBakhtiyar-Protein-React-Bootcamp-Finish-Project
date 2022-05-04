import "../general.scss";

import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonLoader({ count, style }) {
  return (
    <div className="skeleton-loader">
      {/* <h2 className="section-title">
        <Skeleton height={30} width={300} />
      </h2> */}

      <ul className={`list ${style}`}>
        {Array(count)
          .fill()
          .map((item, index) => (
            <li className="card" key={index}>
              <Skeleton height={150} />
              {/* <h4 className="card-title">
                <Skeleton circle={true} height={50} width={50} />
                <Skeleton height={36} width={`80%`} />
              </h4> */}
              <p className="card-channel">
                <Skeleton width={`60%`} height={20} />
              </p>
              <div className="card-metrics">
                <Skeleton width={`90%`} height={20} />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SkeletonLoader;
