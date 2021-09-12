import React from 'react';
import './Square.css';

export default function Square(props) {
    return (
      <button className={"square " + (props.winningSquare ? 'winning-square ' : '') + (props.tieGame ? 'tie-game' : '')} onClick={props.onClick}>
        {props.value}
      </button>
    );
}