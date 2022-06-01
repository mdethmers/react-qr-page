import React from 'react'
import { Message } from 'semantic-ui-react'

const PositiveMessage = ({hidden}) => (
  <Message hidden={hidden} positive>
    <Message.Header>Bedankt voor het melden!</Message.Header>
  </Message>
)

export default PositiveMessage