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
import {
  getFirstTableu,
  insertCardToArray,
  insertCardToTalon,
  isMatchInTableu,
  matchInTableu,
  talonMatchInTableu,
  tableuKingMatchInTableu,
  talonMatchInSuit,
  tableuMatchInSuit,
  talonKingMatchInTableu,
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
import { cardFormatter } from "../../cardformatter";


const videoConstraints = {
  width: 800,
  height: 600,
  facingMode: "environment",
};

const Inferring = () => {
  const [decks, setDecks] = useState([]);
  const [algoSteps, setAlgoSteps] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [lastCard, setLastCard] = useState("");
  const [image, setImage] = useState("");
  const webcamRef = useRef(null);

  const [state, setState] = useState("idle");
  const { seconds, minutes } = useStopwatch({ autoStart: true });
  const [tableau, setTableau] = useState("");
  const [step, setStep] = useState(7);
  const [cardImg, setCardImg] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lastFromArray, setLastFromArray] = useState([]);

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
      setTableau("Scan Talon Card");
    }
    if (step == 8) {
      setTableau("Press draw next")

    }
    if (step > 8) {
      setTableau("Scan card if new revealed or press draw next")
    }
    if (step == 997) {
      setTableau("Scan Revealed Card In Tableau")
    }
    if (step == 998) {
      setTableau("Scan Revealed Card In Tableau")
    }
    if (step == 999) {
      setTableau("Scan Revealed Card In Tableau")
    }

    //Tableau's
    console.log("T1: ", tableu1)
    console.log("T2: ", tableu2)
    console.log("T3: ", tableu3)
    console.log("T4: ", tableu4)
    console.log("T5: ", tableu5)
    console.log("T6: ", tableu6)
    console.log("T7: ", tableu7)
    console.log("Talon: ", talon)
    console.log("CSuitStack: ", clubStack)
    console.log("Current step", step)
    console.log("LastFromArray", lastFromArray)
    /*
    if (stepAfterScan(step) !== undefined) {
      setAlgoSteps([
        ...algoSteps,
        stepAfterScan(step),
      ]);
    }
    */


  }, [step]);


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
  /*
  Roboflow script: https://cdn.roboflow.com/0.2.22/roboflow.js
  Brugt i forbindelse med billedegenkendelsen hvor de tilbyder et node.js
  script til vores trænede modeller via deres platform.
  Script bygget som en modificeret version af tensorflow js.
  */
  function detection() {
    window.roboflow
      .auth({
        publishable_key: "rf_YA5b7jCLYRd4eML6CHfZXTqUSNt1",
      })
      .load({
        model: "cardssolitaire",
        version: 5,
      })
      .then(function (model) {
        model
          .configure({
            threshold: 0.65,
            overlap: 0.5,
            max_objects: 20,
          })

          .detect(document.getElementById("detectImg"))
          .then(function (predictions) {
            console.log("Predictions:", predictions);
            if (predictions.length !== 0) {
              setLastCard(
                predictions[0].class +
                "Confidence" +
                predictions[0].confidence
              );

              if (step == 0) {
                insertCardToArray(tableu1, cardFormatter(predictions[0].class))
              }
              if (step == 1) {
                insertCardToArray(tableu2, cardFormatter(predictions[0].class))
              }
              if (step == 2) {
                insertCardToArray(tableu3, cardFormatter(predictions[0].class))
              }
              if (step == 3) {
                insertCardToArray(tableu4, cardFormatter(predictions[0].class))
              }
              if (step == 4) {
                insertCardToArray(tableu5, cardFormatter(predictions[0].class))
              }
              if (step == 5) {
                insertCardToArray(tableu6, cardFormatter(predictions[0].class))
              }
              if (step == 6) {
                insertCardToArray(tableu7, cardFormatter(predictions[0].class))
              }
              if (step == 7) {
                insertCardToTalon(talon, cardFormatter(predictions[0].class))
              }
              if (step == 997) {

                lastFromArray.pop()
                insertCardToArray(lastFromArray, cardFormatter(predictions[0].class))
                setStep(8)
              }
              if (step == 998) {

                lastFromArray.pop()
                insertCardToArray(lastFromArray, cardFormatter(predictions[0].class))
                setStep(8)
              }
              if (step == 999) {

                lastFromArray.pop()
                insertCardToArray(lastFromArray, cardFormatter(predictions[0].class))
                setStep(8)
              }

              setDecks([...decks, predictions[0].class]);
              setCardImg(predictions[0].class);
              setStep((step) => step + 1);
              //insertCardToArray()


            } else {
              //window.alert("No card predictions found, Scan Again");
              setCardImg("");
              setLastCard("");
              setStep((step) => step + 1);
            }
            setImage("");




            if (step >= 8) {
              //if (talon != undefined) {
              if (talon[0].value === 1) {

                switch (talon[0].suit) {
                  case ("S"):
                    moveCard(talon, 0, spadeStack)
                    setAlgoSteps([
                      ...algoSteps,
                      "AS to F",
                    ]);
                    break;

                  case ("C"):
                    moveCard(talon, 0, clubStack)
                    setAlgoSteps([
                      ...algoSteps,
                      "AC to F",
                    ]);
                    break;

                  case ("H"):
                    moveCard(talon, 0, heartStack)
                    setAlgoSteps([
                      ...algoSteps,
                      "AH to F",
                    ]);
                    break;

                  case ("D"):
                    moveCard(talon, 0, diamondStack)
                    setAlgoSteps([
                      ...algoSteps,
                      "AD to F",
                    ]);
                    break;
                }
                setStep(7)
              }
              //}

              // Priority 2
              // Top tableu card matches bottom tableu card of another tableu row!
              else if (matchInTableu().isMatch) {
	              var fromArray = matchInTableu().fromArray
	              var toArray = matchInTableu().toArray
	              var index = matchInTableu().fromIndex
                setAlgoSteps([
                  ...algoSteps,
                  fromArray[index].value + fromArray[index].suit + " to T" +
                  matchInTableu().toIndex,
                ]);
                moveCard(fromArray, index, toArray)

                setLastFromArray(fromArray);
                if (fromArray.length > 0) {
                  if (fromArray[fromArray.length - 1].suit == "Empty") {
                    setStep(998);
                  }
                }

              }
              
              


              //Priority 3
              else if (talonMatchInSuit().isMatch) {
                var suitStack = talonMatchInSuit().suitStack
                setAlgoSteps([
                  ...algoSteps,
                  talon[0].value + talon[0].suit + " to F",
                ]);
                moveCard(talon, 0, suitStack)
                setStep(7)
              }

              //Priority 3.5
              else if(tableuKingMatchInTableu().isMatch) {
                var fromArray = tableuKingMatchInTableu().fromArray
                var toArray = tableuKingMatchInTableu().toArray
                var fromIndex = tableuKingMatchInTableu().fromIndex
                
                setAlgoSteps([
                  ...algoSteps,
                  "13" + fromArray[fromArray].suit + " to T", tableuKingMatchInTableu().toIndex,
                ]);

                moveCard(fromArray, fromIndex, toArray)

                setLastFromArray(fromArray);
                if (fromArray.length > 0) {
                  if (fromArray[fromArray.length - 1].suit == "Empty") {
                    setStep(997);
                  }
                }
            }

              //Priority 4
              else if (tableuMatchInSuit().isMatch) {
                var fromArray = tableuMatchInSuit().fromArray
                var toArray = tableuMatchInSuit().toArray

                setAlgoSteps([
                  ...algoSteps,
                  fromArray[fromArray.length - 1].value + fromArray[fromArray.length - 1].suit + " to F",
                ]);
                moveCard(fromArray, fromArray.length - 1, toArray)

                setLastFromArray(fromArray);
                if (fromArray.length > 0) {
                  if (fromArray[fromArray.length - 1].suit == "Empty") {
                    setStep(999);
                  }
                }


              }
              // Priority 5
              else if(talonKingMatchInTableu().isMatch) {
                var toArray = talonKingMatchInTableu().toArray
                setAlgoSteps([
                  ...algoSteps,
                  talon[0].value + talon[0].suit + " to T" + talonKingMatchInTableu().tableuRow,
                ]);
                 moveCard(talon, 0, toArray)
               }


              //Priority 6
              else if(talonMatchInTableu().isMatch) {
                var toArray = talonMatchInTableu().toArray
                setAlgoSteps([
                  ...algoSteps,
                  talon[0].value + talon[0].suit + " to T" + talonMatchInTableu().toIndex,
                ]);
                moveCard(talon, 0, toArray)
                setStep(7)
              } 
              
              //Priority 7
              else {
                setAlgoSteps([
                  ...algoSteps,
                  "Draw Cards",
                ]);
                setStep(7)
              }
            }

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
              <h2>{tableau} </h2>

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
