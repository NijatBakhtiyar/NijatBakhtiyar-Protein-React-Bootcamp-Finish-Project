import React, { useState } from 'react';
import ImageUploading from "react-images-uploading";

import UploadIcon from "../images/Svg/UploadIcon";
import styles from "../pages/AddProduct.module.scss";

function ImageUploader({ onChange }) {
  const [images, setImages] = useState([]);


  const handleChange = (imageList) => {
    setImages(imageList);
    onChange(imageList)
  };


  return (
    <ImageUploading
      multiple
      value={images}
      onChange={handleChange}
      maxNumber={69}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemove,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          <button type="button" className={styles.addBtn} onClick={onImageUpload}>
            <UploadIcon />
            <p>Sürükleyip bırakarak yükle veya</p>
            <p>Görsel Seçin</p>
            <span>PNG ve JPEG Dosya boyutu: max. 400kb</span>
          </button>
          {imageList?.map((image, index) => (
            <div key={index} className={styles.imageItem}>
              <img src={image.data_url} alt="" width="110" height="120" />
              <div className="image-item__btn-wrapper">
                <button type="button" className={styles.removeImage} onClick={() => (onImageRemove(index), onChange(""))}>x</button>
              </div>
            </div>
          ))}
        </div>
      )
      }
    </ImageUploading >
  );
}

export default ImageUploader;
