import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import back from "../../assets/Back/backdesign.png";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  Grid,
} from "@mui/material";
import ReactiveButton from "reactive-button";
import { useStopwatch, useTime } from "react-timer-hook";
import "./inferring.css";
import { cardImage } from "../../images";
import { stepAfterScan } from "./stepss";
import { arr } from "./stepss"
import { moveCard, insertCardToArray,  } from "../../algorithm/game";


const videoConstraints = {
  width: 800,
  height: 600,
  facingMode: "environment",
};

const Inferring = () => {
  const [base64Img, setBase64Img] = useState("");
  const [cards, setCards] = useState([]);
  const [decks, setDecks] = useState([]);
  const [algoSteps, setAlgoSteps] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [lastCard, setLastCard] = useState("");
  const [image, setImage] = useState("");
  const webcamRef = useRef(null);
  const deck = [];
  const [state, setState] = useState("idle");
  const { seconds, minutes } = useStopwatch({ autoStart: true });
  const [tableau, setTableau] = useState("");
  const [step, setStep] = useState(0);
  const [cardImg, setCardImg] = useState("");
  const [deckState, setDeckState] = useState(false);
  var index = 0;
  const [dialogOpen, setDialogOpen] = useState(false);

  const dialogOpenHandler = () => {
    setDialogOpen(true);
  };

  const dialogCloseHandler = () => {
    setDialogOpen(false);
  };

  const snapImage = useCallback(() => {
    const imgSrc = webcamRef.current.getScreenshot();
    setImage(imgSrc);
  }, [webcamRef]);

  useEffect(() => {
    if (step == 0) {
      setTableau("First Card in Tableau 1");
    }
    if (step == 1) {
      setTableau("Second Card in Tableau 2");
    }
    if (step == 2) {
      setTableau("Third Card in Tableau 3");
    }
    if (step == 3) {
      setTableau("Forth Card in Tableau 4");
    }
    if (step == 4) {
      setTableau("Fifth Card in Tableau 5");
    }
    if (step == 5) {
      setTableau("Sixth Card in Tableau 6");
    }
    if (step == 6) {
      setTableau("Seventh Card in Tableau 7");
    }
    if (step == 7) {
      setTableau("Talon Card");
    }
    if (step > 7) {
      setTableau("Card if new revealed or press draw next")
    }

    if (stepAfterScan(step) !== undefined) {
      setAlgoSteps([
        ...algoSteps,
        stepAfterScan(step),
      ]);
    }

    console.log(arr.length)
    
    
  }, [step]);

  useEffect(() => {
    // setCardImg(cardImage(lastCard))
  }, [lastCard]);

  const scanCardHandler = (e) => {
    setState("loading");
    setTimeout(() => {
      setState("success");
      //e.preventDefault();
      snapImage();
      detection();
    }, 500);
  };

  const retakeHandler = (e) => {
    setState("loading");
    setTimeout(() => {
      setState("idle");
      //e.preventDefault();
      setImage("");
    }, 100);
  };

  function detection() {
    window.roboflow
      .auth({
        publishable_key: "rf_YA5b7jCLYRd4eML6CHfZXTqUSNt1",
      })
      .load({
        model: "cardssolitaire",
        version: 5,
      })
      .then(function(model) {
        model
          .configure({
            threshold: 0.65,
            overlap: 0.5,
            max_objects: 20,
          })

          .detect(document.getElementById("detectImg"))
          .then(function(predictions) {
            console.log("Predictions:", predictions);
            if (predictions.length !== 0) {
              if (!decks.includes(predictions[0].class)) {
                setLastCard(
                  predictions[0].class +
                    "Confidence" +
                    predictions[0].confidence
                );
                setDecks([...decks, predictions[0].class]);
                setCardImg(predictions[0].class);
                setStep((step) => step + 1);
                setCards((cards) => [...cards, lastCard]);
                //insertCardToArray()

                
              }
            } else {
              window.alert("No card predictions found, Scan Again");
              setCardImg("");
              setLastCard("");
              setStep((step) => step + 1);
            }

            
            

            setImage("");
          });
      });
  }

  return (
    <div className="game">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div className="inferring">
            <div className="timer" style={{ fontSize: "24px" }}>
              <a>{minutes}</a>
              <a>:</a>
              <a>{seconds}</a>
            </div>
            <div className="webcam">
              <div className="webcam-img">
                {image == "" ? (
                  <Webcam
                    id="video"
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  />
                ) : (
                  <img id="detectImg" src={image} />
                )}
              </div>
              <div className="scan-btn">
                <ReactiveButton
                  onClick={scanCardHandler}
                  buttonState={state}
                  color={"green"}
                  rounded={true}
                  size={"large"}
                  idleText={"Draw Next!"}
                />
              </div>
            </div>

            <div className="scanned-card">
              <h2>{"Scan " + tableau} </h2>

              <img src={cardImage(cardImg)} width={62} height={84} />

              <h1>{lastCard}</h1>
              <ol>
                {decks.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ol>
            </div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="steps">
            <div className="cards-box">
              <Box
                sx={{
                  width: 500,
                  height: 750,
                  backgroundColor: "blue",
                }}
              >
                <h1>Algorithm</h1>
                <h3>Steps: </h3>
                <ol>
                  {algoSteps.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ol>
                <h2>{instruction}</h2>
              </Box>
            </div>
            <div className="adjust-cards">
              <ReactiveButton
                onClick={dialogOpenHandler}
                color={"red"}
                rounded={true}
                size={"large"}
                idleText={"Adjust Card"}
              />

              <Dialog open={dialogOpen} onClose={dialogCloseHandler}>
                <DialogTitle>Adjust Last Scanned Card</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    If the last scanned card was incorrect, adjust the value
                    here before proceeding. You will receive a 1 minute time
                    penalty.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="adjust-card"
                    label="Correct Card"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={dialogCloseHandler}>Cancel</Button>
                  <Button onClick={dialogCloseHandler}>Proceed</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Inferring;
