import React from "react";

const HorizontalGrid = ({right_element, left_element}) => {
  return (
    <div className="header_part_1">
      {left_element}
      {right_element}
    </div>
  );
};

export default HorizontalGrid;
