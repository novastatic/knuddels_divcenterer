import React from "react";
import styles from "./Gallery.module.css";

interface GalleryProps {
  images: string[];
  onSelect: (image: string) => void;
  selectedImage: string;
}

const Gallery: React.FC<GalleryProps> = ({
  images,
  onSelect,
  selectedImage,
}) => {
  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Gallery Image ${index + 1}`}
          onClick={() => onSelect(image)}
          style={{
            cursor: "pointer",
            width: "100px",
            height: "auto",
            margin: "5px",
            border: selectedImage === image ? "2px solid blue" : "none",
          }}
        />
      ))}
    </div>
  );
};

export default Gallery;
