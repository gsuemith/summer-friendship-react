import React from 'react'
import styled from 'styled-components'

const UserNav = styled.div`
  background-color: white;
  border: 1px solid white;
  box-shadow: 0px 1px 4px gray;
`;


function AccountNav() {

  return (
    <UserNav>
      <h1>User Nav</h1>
    </UserNav>
  )
}

export default AccountNav
