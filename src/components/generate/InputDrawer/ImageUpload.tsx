import React, { useState } from 'react';
import './ImageUpload.css';

interface ImageUploadProps {
  onClose: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onClose }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <div className="image-upload">
      <div className="image-preview-container">
        {image ? (
          <div className="image-preview">
            <img src={image} alt="Uploaded preview" />
            <button className="remove-image" onClick={handleRemoveImage}>
              Remove
            </button>
          </div>
        ) : (
          <label className="upload-placeholder" htmlFor="file-upload">
            <div className="upload-icon">📁</div>
            <p>Click to upload an image</p>
            <p className="upload-hint">JPG, PNG, or GIF up to 5MB</p>
            <input
              id="file-upload"
              type="file"
              className="file-input"
              accept="image/jpeg, image/png, image/gif"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>

      <div className="color-count-selector">
        <label htmlFor="color-count">Number of colors to extract:</label>
        <select id="color-count" defaultValue="5">
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="7">7</option>
        </select>
      </div>

      <button
        className="generate-button"
        onClick={onClose}
        disabled={!image}
      >
        Extract Colors
      </button>
    </div>
  );
};

export default ImageUpload;
