import React, {useState, useEffect} from 'react'
import axios from 'axios'
import test1 from '../../assets/test1.jpg'
import { Container, Grid } from "@mui/material";

const Inferring = () => {
 
    const [base64Img, setBase64Img] = useState("")
    const [cards, setCards] = useState([]);
    const [decks, setDecks] = useState([]);
    const [cardType, setCardType] = useState([]);

    useEffect(() => {
        //inferringHandler()

        cards.forEach((card) => {
            if (!cardType.includes(card.class)) {
                decks.push(card)
                cardType.push(card.class)
            }
            
        })

        console.log(decks)
        console.log(cardType)
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