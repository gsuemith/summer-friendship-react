import styled from 'styled-components'

const Card = styled.div`
  width: ${({w}) => w*15 + (w - 1)*1}em;
  height: ${({h}) => h*12 + (h - 1)*1}em;
  background-color: white;
  margin-top: 1em;
  box-sizing: border-box;
  border: 3px solid ${({c}) => c || "#44A9D6"};
  border-radius: 8px;
  box-shadow: 2px 2px 4px black;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.w*16 - 1*(props.w-1)}em;
  /* outline: solid 1px black; */
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export { Card, Column, Row }