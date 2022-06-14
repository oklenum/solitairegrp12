import React, { useState, useRef, useCallback } from 'react'
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const Robo = () => {

    const [image, setImage] = useState('');
    const webcamRef = useRef(null);

    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
        });


    window.roboflow.auth({
        publishable_key: "rf_YA5b7jCLYRd4eML6CHfZXTqUSNt1"
    }).load({
        model: "cardssolitaire",
        version: 3
    }).then(function(model) {
        model.detect(document.getElementById("video")).then(function(predictions) {
            console.log("Predictions:", predictions);
        });
    });

    
  return (
    <div className='roboflow-camera'>
        <div className='webcam-component'>
        {image == "" ? <Webcam
            audio={false}
            height={1280}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={720}
            videoConstraints={videoConstraints}
            /> : <img src={image} />}
        </div>
        <div>
            {image != "" ?
                <button onClick={(e) => {
                    e.preventDefault();
                    setImage("")
                }}
                    className="webcam-btn">
                    Retake Image</button> :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture()
                    }}
                        className="webcam-btn">Capture</button>
                }
        </div>
    </div>
  )
}

export default Robo