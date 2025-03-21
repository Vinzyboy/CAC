import React from "react";
import { setError, setMessage } from "../store/storeAction.jsx";
import { StoreContext } from "../store/storeContext.jsx";

const useUploadPhoto = (url) => {
  const [photo, setPhoto] = React.useState(null);
  const { dispatch } = React.useContext(StoreContext);
  const uploadPhoto = async () => {
    // if (photo) {
    //   const fd = new FormData();
    //   fd.append("photo", photo);
    //   const data = await fetchFormData(devApiUrl + url, fd);
    // }
  };
  const handleChangePhoto = (e) => {
    if (!e || !e.target || !e.target.files || e.target.files.length === 0) {
      setPhoto(null);
      return;
    }

    const file = e.target.files[0];
    setPhoto(file);
  };

  return { photo, handleChangePhoto };
};

export default useUploadPhoto;
