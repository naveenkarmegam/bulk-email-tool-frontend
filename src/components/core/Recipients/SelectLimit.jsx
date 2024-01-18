import React from "react";

const SelectLimit = ({onLimitChange}) => {
  return (
    <select className="px-lg-3 mx-lg-2" onChange={(e)=>onLimitChange(e.target.value)}>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
    </select>
  );
};

export default SelectLimit;
