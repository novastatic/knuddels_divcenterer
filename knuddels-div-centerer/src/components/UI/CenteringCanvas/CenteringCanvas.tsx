import React, { useEffect, useRef } from "react";
import { centerDiv } from "../../../utils/divCenterer";

interface CenteringCanvasProps {
  selectedImage: string;
  positionStyle: React.CSSProperties;
  onCenter: (isCentered: boolean) => void;
  isCentered: boolean;
}

const CenteringCanvas: React.FC<CenteringCanvasProps> = ({
  selectedImage,
  positionStyle,
  onCenter,
  isCentered,
}) => {
  const imgRef = useRef<HTMLDivElement>(null);

  // Effect to center the image if isCentered is true
  useEffect(() => {
    if (isCentered && imgRef.current) {
      centerDiv(imgRef.current);
    }
  }, [isCentered]);

  // Effect to reset centering state when a new image is selected
  useEffect(() => {
    if (!isCentered) {
      onCenter(false);
    }
  }, [selectedImage, onCenter, isCentered]);

  return (
    <div
      className="canvas"
      style={{
        position: "relative",
        height: "500px",
        width: "500px",
        border: "1px solid black",
      }}
    >
      <div ref={imgRef} style={positionStyle}>
        <img
          src={selectedImage}
          alt="Centered"
          style={{ width: "200px", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default CenteringCanvas;
