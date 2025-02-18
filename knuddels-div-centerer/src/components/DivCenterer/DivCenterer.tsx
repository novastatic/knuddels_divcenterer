import React, { useState, useEffect } from "react";
import "./DivCenterer.module.css";
import knuddels_k from "../../assets/knuddels_k.jpeg";
import knuddels_character from "../../assets/knuddels_character.png";
import knuddels_logo_font from "../../assets/knuddels_logo_font.png";
import CenteringCanvas from "../UI/CenteringCanvas/CenteringCanvas";
import Gallery from "../UI/Gallery/Gallery";

const images = [knuddels_k, knuddels_character, knuddels_logo_font];

// Create a random position for the selected element on the canvas
const getRandomPositionStyle = (): React.CSSProperties => {
  const positions = ["top", "bottom", "left", "right"];
  const randomPosition =
    positions[Math.floor(Math.random() * positions.length)];
  return {
    position: "absolute",
    [randomPosition]: "0px",
  };
};

const DivCenterer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [positionStyle, setPositionStyle] = useState(getRandomPositionStyle());
  const [showCode, setShowCode] = useState(false);
  const [isCentered, setIsCentered] = useState(false);

  // Effect to reset position style when a new image is selected
  useEffect(() => {
    setPositionStyle(getRandomPositionStyle());
    setIsCentered(false);
  }, [selectedImage]);

  // Function to toggle centering state
  const handleCenter = () => {
    setIsCentered(!isCentered);
  };

  // Callback function to update centering state
  const onCenter = (centered: boolean) => {
    setIsCentered(centered);
  };

  return (
    <div className="div-centerer">
      <Gallery
        images={images}
        onSelect={setSelectedImage}
        selectedImage={selectedImage}
      />

      <CenteringCanvas
        selectedImage={selectedImage}
        positionStyle={positionStyle}
        onCenter={onCenter}
        isCentered={isCentered}
      />

      <button onClick={handleCenter}>{isCentered ? "Reset" : "Center"}</button>
      <button onClick={() => setShowCode(!showCode)}>Show Code</button>

      {showCode && (
        <pre className="code">
          {`
            <div style="${JSON.stringify(positionStyle)}">
              <img src="${selectedImage}" style="width: 200px; height: auto;" />
            </div>
          `}
        </pre>
      )}
    </div>
  );
};

export default DivCenterer;
