import React from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const AppHeader = styled.header`
  background-color: #FFB113;
  min-height: 5vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  color: white;
  box-shadow: 0px 1px 2px gray;
  position: relative;
`;

function Header() {
  return (
    
    <AppHeader>
      <div></div>
      <nav>
        <Link to="/login">Log In</Link>
        <Link to="/account/create">Sign Up</Link>

      </nav>
    </AppHeader>
    
  )
}

export default Header
