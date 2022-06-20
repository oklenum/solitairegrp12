import React, {useState, useEffect, useRef, useCallback} from 'react'
import Webcam from "react-webcam";
import axios from 'axios'
import back from '../../assets/Back/backdesign.png'
import { Container, Grid } from "@mui/material";
import ReactiveButton from 'reactive-button'
import { useStopwatch, useTime } from 'react-timer-hook';
import "./inferring.css"
import C1 from '../../assets/Clover/card_1_clover.png' 


const videoConstraints = {
    width: 800,
    height: 600,
    facingMode: "environment"
};




const Inferring = () => {
 
    const [base64Img, setBase64Img] = useState("")
    const [cards, setCards] = useState([]);
    const [decks, setDecks] = useState([]);
    const [lastCard, setLastCard] = useState("");
    const [image, setImage] = useState("");
    const webcamRef = useRef(null);
    const deck = []
    const [state, setState] = useState('idle');
    const { seconds, minutes,} = useStopwatch({autoStart: true })
    var index = 0

    const snapImage = useCallback(
        () => {
            const imgSrc = webcamRef.current.getScreenshot();
            setImage(imgSrc);
        },[webcamRef]);

  

    useEffect(() => {
        //inferringHandler()
        /*
        cards.forEach((card) => {
            if (!cardType.includes(card.class)) {
                decks.push(card)
                cardType.push(card.class)
            }
            
        })
        */


        console.log(decks)
        
    }, [cards, decks]);

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
            data: image,
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

    const scanCardHandler = (e) => {
        setState('loading');
        setTimeout(() => {
            setState('success');
            //e.preventDefault();
            snapImage();
            detection()

        }, 500)
    }

    const retakeHandler = (e) => {
        setState('loading');
        setTimeout(() => {
            setState('idle');
            //e.preventDefault();
            setImage('')
        }, 100)
    }

    
function detection () {
    window.roboflow.auth({
        publishable_key: "rf_YA5b7jCLYRd4eML6CHfZXTqUSNt1"
    }).load({
        model: "cardssolitaire",
        version: 5
    }).then(function(model) {
        model.configure({
            threshold: 0.65,
            overlap: 0.5,
            max_objects: 20,
        })
        
        .detect(document.getElementById("detectImg")).then(function(predictions) {
            console.log("Predictions:", predictions);
            setLastCard(predictions[0].class + "Confidence" + predictions[0].confidence)
            setCards(cards => [...cards, lastCard])
            
        });
        
    });

}
    

  

    return (
        <div className='inferring'>
            <div className='timer' style={{fontSize: '24px'}}>
                <a>{minutes}</a><a>:</a><a>{seconds}</a>
            </div>
            <div className='webcam' >
                <div className="webcam-img">
                    {image == '' ? <Webcam id='video'
                        audio={false}
                        
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        
                        videoConstraints={videoConstraints}
                    /> : <img id='detectImg' src={image} />}
                </div>
                <div className='scan-btn'>
                    {image != '' ?
                        
                        <ReactiveButton
                            onClick={retakeHandler}
                            color={'green'}
                            rounded={true}
                            size={'large'}
                            idleText={'New Card'}
                        /> :
                        <ReactiveButton 
                        buttonState={state}
                        onClick={scanCardHandler}
                        className="webcam-btn"
                        rounded={true}
                        size={'large'}
                        idleText={'Scan Card'}/>
                            
                    }
                </div>
            </div>

            <div className='scanned-card'>

                {lastCard == 'AC' ? <img src={C1}/> : <img src={back} width={62} height={84}  /> }
                <h1>{lastCard}</h1>
                
            </div>

            
            
        </div>
        


 
        
    )
}

export default Inferring;