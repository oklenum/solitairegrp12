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
import { cardFormatter } from "../../cardformatter";

import {
  getFirstTableu,
  insertCardToArray,
  isMatchInTableu,
  moveCard,
  getMatchTableu,
  getIndexOfFirstTableuCard,
  getMatchTableuRow,
  getTableuRowFromIndex,
  determineColorOfCard,
  determineOppositeColorOfCard,
  getLastTableu,
} from "../../algorithm/script.js";
import {
  clubStack,
  diamondStack,
  heartStack,
  spadeStack,
  tableu1,
  tableu2,
  tableu3,
  tableu4,
  tableu5,
  tableu6,
  tableu7,
  talon,
} from "../../algorithm/gameModel";

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
  const [step, setStep] = useState(7);
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
      setTableau("Press Draw Next To Find Best Move");
    }
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

                if (step === 0) {
                  insertCardToArray(
                    tableu1,
                    cardFormatter(predictions[0].class)
                  );
                  console.log(tableu1);
                  console.log(cardImg);
                } else if (step === 1) {
                  insertCardToArray(
                    tableu2,
                    cardFormatter(predictions[0].class)
                  );
                  console.log(tableu2);
                } else if (step === 2) {
                  insertCardToArray(
                    tableu3,
                    cardFormatter(predictions[0].class)
                  );
                  console.log(tableu3);
                } else if (step === 3) {
                  insertCardToArray(
                    tableu4,
                    cardFormatter(predictions[0].class)
                  );
                  console.log(tableu4);
                } else if (step === 4) {
                  insertCardToArray(
                    tableu5,
                    cardFormatter(predictions[0].class)
                  );
                  console.log(tableu5);
                } else if (step === 5) {
                  insertCardToArray(
                    tableu6,
                    cardFormatter(predictions[0].class)
                  );
                  console.log(tableu6);
                } else if (step === 6) {
                  insertCardToArray(
                    tableu7,
                    cardFormatter(predictions[0].class)
                  );
                  console.log(tableu7);
                } else if (step === 7) {
                  insertCardToArray(talon, cardFormatter(predictions[0].class));
                  setDeckState(true);
                }
              }
            } else {
              window.alert("No card predictions found, Scan Again");
              setCardImg("");
              setLastCard("");
            }

            if (step >= 8) {
              //Prio1
              
              console.log(talon);
              if (talon[0] != undefined) {
                if (talon[0].value == 1) {
                  switch (talon[0].suit) {
                    case "S":
                      moveCard(talon, 0, spadeStack);
                      console.log(spadeStack);
                      console.log(talon);
                      setAlgoSteps([
                        ...algoSteps,
                        "Move Ace of Spade to Foundation",
                      ]);
                      setInstruction(
                        "Scan New Revealed Card and Press Draw Next"
                      );
                      break;

                    case "C":
                      moveCard(talon, 0, clubStack);
                      setAlgoSteps([
                        ...algoSteps,
                        "Move Ace of Clubs to Foundation",
                      ]);
                      setInstruction(
                        "Scan New Revealed Card and Press Draw Next"
                      );
                      break;

                    case "H":
                      moveCard(talon, 0, heartStack);
                      setAlgoSteps([
                        ...algoSteps,
                        "Move Ace of Hearts to Foundation",
                      ]);
                      setInstruction(
                        "Scan New Revealed Card and Press Draw Next"
                      );
                      break;

                    case "D":
                      moveCard(talon, 0, diamondStack);
                      setAlgoSteps([
                        ...algoSteps,
                        "Move Ace of Diamonds to Foundation",
                      ]);
                      setInstruction(
                        "Scan New Revealed Card and Press Draw Next"
                      );
                      break;
                  }
                }
              } else  {
                insertCardToArray(talon, cardFormatter(predictions[0].class));
                setInstruction("");
              }
              
              
            

              //Prio2
              if (
                isMatchInTableu(
                  getMatchTableu(getFirstTableu())
                )
              ) {
                

                const fromArray = getTableuRowFromIndex(
                  getMatchTableuRow(getMatchTableu(getFirstTableu())).from
                );
                const toArray = getTableuRowFromIndex(
                  getMatchTableuRow(getMatchTableu(getFirstTableu())).to
                );
                
                
                
                switch (fromArray) {
                  case tableu1:
                    moveCard(
                      fromArray,
                      getIndexOfFirstTableuCard(tableu1),
                      toArray
                    );
                    setAlgoSteps([
                        ...algoSteps,
                        "Move from Tableau 1 " + "to" + toArray,
                      ]);
                    break;
                  case tableu2:
                    moveCard(
                      fromArray,
                      getIndexOfFirstTableuCard(tableu2),
                      toArray
                    );
                    console.log("illegal move")
                    setAlgoSteps([
                        ...algoSteps,
                        "Move " + fromArray + "to" + toArray,
                      ]);
                    break;
                  case tableu3:
                    moveCard(
                      fromArray,
                      getIndexOfFirstTableuCard(tableu3),
                      toArray
                    );
                    setAlgoSteps([
                        ...algoSteps,
                        "Move " + fromArray + "to" + toArray,
                      ]);
                    break;
                  case tableu4:
                    moveCard(
                      fromArray,
                      getIndexOfFirstTableuCard(tableu4),
                      toArray
                    );
                    setAlgoSteps([
                        ...algoSteps,
                        "Move " + fromArray + "to" + toArray,
                      ]);
                    break;
                  case tableu5:
                    moveCard(
                      fromArray,
                      getIndexOfFirstTableuCard(tableu5),
                      toArray
                    );
                    setAlgoSteps([
                        ...algoSteps,
                        "Move " + fromArray + "to" + toArray,
                      ]);
                    break;
                  case tableu6:
                    moveCard(
                      fromArray,
                      getIndexOfFirstTableuCard(tableu6),
                      toArray
                    );
                    setAlgoSteps([
                        ...algoSteps,
                        "Move " + fromArray + "to" + toArray,
                      ]);
                    break;
                  case tableu7:
                    moveCard(
                      fromArray,
                      getIndexOfFirstTableuCard(tableu7),
                      toArray
                    );
                    setAlgoSteps([
                        ...algoSteps,
                        "Move " + fromArray + "to" + toArray,
                      ]);
                    break;
                }
                console.log(getMatchTableu(getFirstTableu()))
                console.log(getLastTableu())
              }
            }
            console.log("Foundation: ");
            console.log(spadeStack);
            console.log(clubStack);
            console.log(heartStack);
            console.log(diamondStack);
            console.log("Talon: ");
            console.log(talon);
            console.log("Tableu rows: ");
            console.log(tableu1);
            console.log(tableu2);
            console.log(tableu3);
            console.log(tableu4);
            console.log(tableu5);
            console.log(tableu6);
            console.log(tableu7);
            console.log(getIndexOfFirstTableuCard(tableu5));

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
