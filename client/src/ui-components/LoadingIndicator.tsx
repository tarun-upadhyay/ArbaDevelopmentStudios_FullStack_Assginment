import React from "react";
import { Circles } from "react-loader-spinner";

const LoadingIndicator = () => {
  return (
    <div className="relative flex justify-center">
      <div className="absolute top-60">
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default LoadingIndicator;
