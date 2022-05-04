import "react-dropzone-uploader/dist/styles.css";

import React from "react";
import Dropzone from "react-dropzone-uploader";

function ImageUploader({
  setUploadActive,
  setUploadPercent,
  setShowPercent,
  onChange,
}) {
  // specify upload params and url for your files
  const getUploadParams = () => {
    return { url: "https://httpbin.org/post" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ file }, status) => {
    setShowPercent(true);
    setUploadPercent((p) => p + 10);

    if (status === "headers_received") {
      setUploadPercent(100);
    }

    if (status === "done") {
      setUploadActive(true);
      onChange(file);
    }
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    allFiles.forEach((f) => f.remove());
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/png, image/jpeg, image/jpg"
      maxSizeBytes={400000}
      maxFiles={1}
    />
  );
}

export default ImageUploader;
