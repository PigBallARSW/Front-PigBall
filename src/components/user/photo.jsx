import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const Photo = ({width, height}) => {
    const[image,setImage] = useState(null);
    useEffect(() => {
        const actualImage = localStorage.getItem("image");
        if(actualImage){
            setImage(actualImage);
        }
    }, []);

  return (
    <>
      <Avatar 
        src={image} 
        sx={{ width: {width}, height: {height}}}
      />
    </>
  );
};

export default Photo;