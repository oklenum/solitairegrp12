import React from 'react';
import './header.css'

const Menu = () => (
    <>
    <p><a href='/'>Solitaire Solver</a></p>
    </>
)

const Header = () => {
    return (
        <div className='solitaireSolver-header'>
            <Menu />
        </div>
    )
}
export default Header;