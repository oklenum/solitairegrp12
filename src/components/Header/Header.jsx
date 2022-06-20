import React, { useState, useEffect } from 'react';
import './header.css'

const Menu = () => (
    <>
    <p><a href='/'>Solitaire Solver</a></p>
    </>
)

const Header = () => {
  const [time, setTime] = useState(undefined)
    return (
        <div className='solitaireSolver-header'>
            <Menu />
        </div>
    )
}
export default Header;