import React, {useState, useEffect, useRef, useCallback} from 'react'
import Webcam from "react-webcam";
import axios from 'axios'
import back from '../../assets/Back/backdesign.png'
import { Container, Grid } from "@mui/material";
import ReactiveButton from 'reactive-button'
import { useStopwatch, useTime } from 'react-timer-hook';
import "./inferring.css"
import {cardImage} from '../../images'
import {
    C1,C2,C3,C4,C5,C6,C7,C8,C9,C10,C11,C12,C13,D1,D2,D3,D4,D5,D6,D7,D8,D9,D10,D11,D12,D13,
    H1,H2,H3,H4,H5,H6,H7,H8,H9,H10,H11,H12,H13,S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13,
} from '../../assets'


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
    const [ tableau, setTableau ] = useState("")
    const [step, setStep] = useState(0)
    const [cardImg, setCardImg] = useState("");
    var index = 0

    const snapImage = useCallback(
        () => {
            const imgSrc = webcamRef.current.getScreenshot();
            setImage(imgSrc);
        },[webcamRef]);

  
    useEffect(() => {
        if (step == 0) {
            setTableau("First Card in Tableau 1")
        }
        if (step == 1) {
            setTableau("Second Card in Tableau 2")
        }
        if (step == 2) {
            setTableau("Third Card in Tableau 3")
        }
        if (step == 3) {
            setTableau("Forth Card in Tableau 4")
        }
        if (step == 4) {
            setTableau("Fifth Card in Tableau 5")
        }
        if (step == 5) {
            setTableau("Sixth Card in Tableau 6")
        }
        if (step == 6) {
            setTableau("Seventh Card in Tableau 7")
        }
        if (step > 6) {
            setTableau("Complete, Initial Setup")
        }
        
    }, [step]);

    useEffect(() => {
       // setCardImg(cardImage(lastCard))
    }, [lastCard]);

   

 

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
            if (predictions.length !== 0) {
                setLastCard(predictions[0].class + "Confidence" + predictions[0].confidence)
                setDecks([...decks, predictions[0].class])
                setCardImg(predictions[0].class)
                setStep((step) => step + 1);
                setCards(cards => [...cards, lastCard])
            } else {
                window.alert("No card predictions found, scan again")
                setCardImg('')
                setLastCard('')
            }
            
            setImage('')
            
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
                    <ReactiveButton
                        onClick={scanCardHandler}
                        buttonState={state}
                        color={'green'}
                        rounded={true}
                        size={'large'}
                        idleText={'Draw Next!'}
                    />
                </div>
            </div>

            <div className='scanned-card'>
                <h2>{"Scan " + tableau} </h2>

                <img src={cardImage(cardImg)} width={62} height={84} />
                
                <h1>{lastCard}</h1>
                <ol>
                {decks.map(d => (
                    <li key={d}>{d}</li>
                ))}
                </ol>
                
                
            </div>

            
            
        </div>
        


 
        
    )
}

export default Inferring;