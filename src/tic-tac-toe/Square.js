import React from 'react';
import { Row } from 'react-bootstrap';
import './Square.css';

export default function Square(props) {
    return (
      <Row className={"justify-content-center square " 
                      + (props.winningSquare ? 'winning-square ' : '') 
                      + (props.tieGame ? 'tie-game ' : '')
                      + (props.squareNum % 3 === 0 ? 'left-square ' : '')
                      + (props.squareNum > 5 ? 'bottom-square ' : '')} 
           onClick={props.onClick}
      >
            {props.value}
      </Row>
    );
}