import React from 'react'
import styled from 'styled-components'
import { Card, Column, Row } from '../styles'

const Dashboard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 1em;
`;


function Home() {
  return (
    <Dashboard>
      <Column w={1}>
        <Card w={1} h={2} c="#C52710"/>
        <Card w={1} h={2}/>
      </Column>
      <Column w={2}>
        <Row>
          <Card w={1} h={2}/>
          <Column>
            <Card w={1} h={1} c="#F59447"/>
            <Card w={1} h={1}/>
          </Column>
        </Row>
        <Card w={2} h={2} c="#FFB113"/>
      </Column>
    </Dashboard>
  )
}

export default Home
