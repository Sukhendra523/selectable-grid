import React, { useCallback, useState } from "react";

const SelectableGrid = ({ rows = 10, cols = 10 }) => {
  const [selectedBox, setSelectedBox] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const onMouseEnter = useCallback((boxNumber) => {
    const startBox = selectedBox[0];
    const endBox = boxNumber;
    const startRow = Math.floor((startBox - 1) / cols);
    const endRow = Math.floor((endBox - 1) / cols);
    const startCol = (startBox - 1) % cols;
    const endCol = (endBox - 1) % cols;

    const minRow = Math.min(startRow, endRow);
    const maxRow = Math.max(startRow, endRow);

    const minCol = Math.min(startCol, endCol);
    const maxCol = Math.max(startCol, endCol);

    let selectedBoxArray = [];
    for (let row = minRow; row <= maxRow; row++) {
      for (let col = minCol; col <= maxCol; col++) {
        selectedBoxArray.push(row * cols + col + 1);
      }
    }
    setSelectedBox(selectedBoxArray);
  });

  const onMouseDown = (boxNumber) => {
    setSelectedBox([boxNumber]);
    setIsMouseDown(true);
  };

  const onMouseUp = () => {
    setIsMouseDown(false);
    setSelectedBox([]);
  };

  const boxes = [...Array(rows * cols).keys()];
  return (
    <div
      className="grid"
      style={{ "--rows": rows, "--cols": cols }}
      onMouseUp={onMouseUp}
    >
      {boxes.map((b) => (
        <div
          className={`box ${selectedBox.includes(b + 1) ? "selected" : ""}`}
          key={b}
          onMouseDown={() => {
            onMouseDown(b + 1);
          }}
          onMouseEnter={() => {
            if (isMouseDown) onMouseEnter(b + 1);
          }}
        >
          {b + 1}
        </div>
      ))}
    </div>
  );
};

export default SelectableGrid;
