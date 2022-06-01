import React from 'react'
import { Message } from 'semantic-ui-react'

const NegativeMessage = ({hidden}) => (
  <Message hidden={hidden} negative>
    <Message.Header>Sorry, er is iets mis gegaan!</Message.Header>
    <p>Neem contact op met de Admin als dit probleem zich voor blijft doen.</p>
  </Message>
)

export default NegativeMessage