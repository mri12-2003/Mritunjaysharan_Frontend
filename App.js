import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

// Single List Item
const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? "green" : "red" }}
      // callback is not defined intially
      // onClick={onClickHandler(index)}

      //onclick with a callback function is  defined.
      onClick={() => onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({ items }) => {
  // const [setSelectedIndex, selectedIndex] = useState(); // intial code given with invalid syntax

  const [selectedIndex, setSelectedIndex] = useState(); //Modified code with correct syntax

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  //unadded key attribute in the code and (===index)

  // return (
  //   <ul style={{ textAlign: 'left' }}>
  //     {items.map((item, index) => (
  //       <SingleListItem
  //         onClickHandler={() => handleClick(index)}
  //         text={item.text}
  //         index={index}
  //         isSelected={selectedIndex}
  //       />
  //     ))}
  //   </ul>
  // )
  return (
    <ul style={{ textAlign: "left" }}>
      {items.map((item, index) => (
        <SingleListItem
          key={index} //added the key attribute which was not there intially
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index} //Modified (=== index) for targeting the specific list item
        />
      ))}
    </ul>
  );
};

WrappedListComponent.propTypes = {
  //invalid syntax of array and shape of
  // items: PropTypes.array(PropTypes.shapeOf({

  //changed array to --- arrayOf  and shapeOf to -- shape
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

WrappedListComponent.defaultProps = {
  //added some dummy data instaed of null .so there is no such problem found while mapping
  items: [
    { text: "Mritunjay" },
    { text: "Lovely Professional University" },
    { text: "India" },
    { text: "Europe" },
    { text: "Singapore" },
  ],
};
const List = memo(WrappedListComponent);
export default List;
