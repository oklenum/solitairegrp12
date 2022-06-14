import React, {useState, useEffect, useRef, useCallback} from 'react'
import Webcam from "react-webcam";
import axios from 'axios'
import test1 from '../../assets/test1.jpg'
import { Container, Grid } from "@mui/material";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"
};


const Inferring = () => {
 
    const [base64Img, setBase64Img] = useState("")
    const [cards, setCards] = useState([]);
    const [decks, setDecks] = useState([]);
    const [cardType, setCardType] = useState([]);
    const [deviceId, setDeviceId] = useState({});
    const [devices, setDevices] = useState([]);
    const [image, setImage] = useState("");
    const webcamRef = useRef(null);

    const snapImage = useCallback(
        () => {
            const imgSrc = webcamRef.current.getScreenshot();
            setImage(imgSrc);
        },[webcamRef]);

    const handleDevices = useCallback(
        mediaDevices =>
            setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices]
    );    

    useEffect(() => {
        //inferringHandler()

        cards.forEach((card) => {
            if (!cardType.includes(card.class)) {
                decks.push(card)
                cardType.push(card.class)
            }
        })

        navigator.mediaDevices.enumerateDevices().then(handleDevices);

        console.log(decks)
        console.log(cardType)
    }, [cards, decks, handleDevices]);

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBase64Img(base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

    const inferringHandler = async (e) => {
        e.preventDefault()
        await axios({
            method: "POST",
            url: "https://detect.roboflow.com/playing-cards-ow27d/1",
            params: {
                api_key: "MaCUsCNKb6RTjsTmT9TK"
            },
            data: base64Img,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(response => {
            var convert = JSON.stringify(response.data)
            var output = JSON.parse(convert);
            //var obj = JSON.parse(convert.predictions)
            //console.log(obj[0].class)
            setCards(output.predictions)
            console.log(output.predictions[0].class)

        })
        .catch(error => {
            console.log(error.message);
        });

    }

  

    return (
        <div className='inferring'>
            <div className='device-select'>
            {devices.map((device, key) => (
          <div>
            <Webcam audio={false} videoConstraints={{ deviceId: device.deviceId }} />
            {device.label || `Device ${key + 1}`}
          </div>

        ))}
            </div>
            <div className='webcam' >
                <div className="webcam-img">
                    {image == '' ? <Webcam id='video'
                        audio={false}
                        height={200}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={220}
                        videoConstraints={videoConstraints}
                    /> : <img src={image} />}
                    </div>
                    <div>
                    {image != '' ?
                        <button onClick={(e) => {
                            e.preventDefault();
                            setImage('')
                        }}
                            className="webcam-btn">
                            Retake Image</button> :
                        <button onClick={(e) => {
                            e.preventDefault();
                            snapImage();
                        }}
                            className="webcam-btn">Capture</button>
                    }
                </div>
            </div>
            <p>Inferring</p>

            <input
            type="file"
            onChange={(e) => {
            uploadImage(e);
            }}
            />
            <br></br>
            <img src={base64Img} height='200px' />
            <button onClick={inferringHandler} variant="primary" type="submit">
                Go
            </button>
            <div className='predictions'>
                {decks.map((deck) => (
                    <p key={deck}>{deck.class}</p>
                    
                ))}
            </div>
            
            

            
        </div>
        


 
        
    )
}

export default Inferring;