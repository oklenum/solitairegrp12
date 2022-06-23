/*
Startside kort animation fra https://codepen.io/EdgeK/pen/rWdGXv
SVG cards lavet af Chris Aguilar:
https://sourceforge.net/projects/vector-cards/

*/

import React, { useState } from 'react'
import './start.css'
import ReactiveButton from 'reactive-button'


const Start = () => {
    const [state, setState] = useState('idle');

    const onClickHandler = () => {
        setState('loading');
        setTimeout(() => {
            setState('success');
            
        }, 2000);
    }

  return (
    <div>
        <>
  <div className="card-holder">
    <div className="back" />
    <div className="card ace clubs" />
  </div>
  <div className="card-holder">
    <div className="back" />
    <div className="card king clubs" />
  </div>
  <div className="card-holder">
    <div className="back" />
    <div className="card queen clubs" />
  </div>
  <div className="card-holder">
    <div className="back" />
    <div className="card jack clubs" />
  </div>
  <div className="card-holder">
    <div className="back" />
    <div className="card ten clubs" />
  </div>
  <div className="card-holder">
    <div className="back" />
    <div className="card ace hearts" />
  </div>
  <div className="card-holder">
    <div className="back" />
    <div className="card king hearts" />
  </div>
  <div className="card-holder">
    <div className="back" />
    <div className="card queen hearts" />
  </div>
  <div className="card-holder">
    <div className="back" />
    <div className="card jack hearts" />
  </div>
  <div className="card-holder">
    <div className="back" />
    <div className="card ten hearts" />
  </div>
<div className='start-btn'>
    <a href='/game'>
    <ReactiveButton
    buttonState={state}
    onClick={onClickHandler} 
    color={'blue'}
    rounded={true}
    size={'large'}
    idleText={'Start Game'}
    />
    </a>
    


</div>
  
</>

    </div>
  )
}

export default Start