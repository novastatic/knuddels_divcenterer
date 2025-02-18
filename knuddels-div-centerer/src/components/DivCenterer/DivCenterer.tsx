import React, { useState, useEffect } from "react";
import styles from "./DivCenterer.module.css";
import knuddels_k from "../../assets/knuddels_k.jpeg";
import knuddels_character from "../../assets/knuddels_character.png";
import knuddels_logo_font from "../../assets/knuddels_logo_font.png";
import CenteringCanvas from "../UI/CenteringCanvas/CenteringCanvas";
import Gallery from "../UI/Gallery/Gallery";

const images = [knuddels_k, knuddels_character, knuddels_logo_font];

// Function to get random position style for the image
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
  const [previousStyle, setPreviousStyle] =
    useState<React.CSSProperties>(positionStyle);
  const [showCode, setShowCode] = useState(false);
  const [isCentered, setIsCentered] = useState(false);

  // Effect to reset position style when a new image is selected
  useEffect(() => {
    const newStyle = getRandomPositionStyle();
    setPositionStyle(newStyle);
    setPreviousStyle(newStyle);
    setIsCentered(false);
  }, [selectedImage]);

  // Function to toggle centering state
  const handleCenter = () => {
    if (isCentered) {
      const newStyle =
        Math.random() > 0.5 ? previousStyle : getRandomPositionStyle();
      setPositionStyle(newStyle);
      setIsCentered(false);
    } else {
      setIsCentered(true);
    }
  };

  // Callback function to update centering state
  const onCenter = (centered: boolean) => {
    setIsCentered(centered);
  };

  return (
    <div className={styles.div_centerer_container}>
      <div className={styles.div_centerer}>
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

        <button onClick={handleCenter}>
          {isCentered ? "Reset" : "Center"}
        </button>
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
    </div>
  );
};

export default DivCenterer;
