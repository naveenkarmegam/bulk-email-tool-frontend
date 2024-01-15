import React from "react";

const Loading = ({ isLoading }) => {
  return (
    <div className={`spinner-border ${isLoading ? 'visible' : 'invisible'}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loading;
