import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/Camera"; // Parece que este import no se usa, podrías considerar removerlo.
import { styled } from "@mui/system";
import RedoIcon from "@mui/icons-material/Redo";
import SendIcon from "@mui/icons-material/Send";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import axios from 'axios'
const Plants = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const resetCapture = () => {
    setImgSrc(null);
  };

  const sendPhoto = async() => {
    // Enviar la foto o manejarla como necesites.
    //console.log(imgSrc);
    try {
      let resul = await axios.post('http://localhost:8000/', {image:imgSrc})
      console.log(resul);
    } catch (error) {
      console.log(error);
    }
  };

  const StyledButton = styled(Button)({
    margin: '4px',
  });

  return (
    <div className="flex flex-col h-full w-full relative"> 
    <div className="w-full flex-grow"> 
      {!imgSrc && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-lg w-full object-cover md:h-[80%] h-full"
        />
      )}
      {imgSrc && (
        <img src={imgSrc} alt="Captura" className="w-full object-cover rounded-lg h-full" />
      )}
    </div>
    <div className="flex justify-center items-end pb-4 bg-white/70 backdrop-blur-md" style={{ position: 'fixed', left: 0, right: 0, bottom: 0, margin: 'auto', maxWidth: '640px' }}> 
      {!imgSrc ? (
        <StyledButton
          variant="contained"
          color="primary"
          startIcon={<CameraAltIcon />}
          onClick={capture}
        >
          Capturar
        </StyledButton>
      ) : (
        <>
          <StyledButton
            variant="contained"
            color="secondary"
            startIcon={<RedoIcon />}
            onClick={resetCapture}
          >
            Retomar
          </StyledButton>
          <StyledButton
            variant="contained"
            color="success"
            startIcon={<SendIcon />}
            onClick={sendPhoto}
          >
            Enviar
          </StyledButton>
        </>
      )}
    </div>
  </div>
  );
};

export default Plants;
