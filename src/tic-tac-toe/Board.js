import React from 'react';
import Square from './Square';
import './Board.css';

export default class Board extends React.Component {
    renderSquare(i) {
        let winningSquare = this.props.winner && this.props.winner.includes(i) ? true : false;
        return (
          <Square 
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)} 
            winningSquare={winningSquare} 
            tieGame={this.props.tieGame}
          />
        );
    }

    render() {
        let boardSquares = [];
        for (let row = 0; row < 3; row++) {
            let boardRow = [];
            for (let col = 0; col < 3; col++) {
                boardRow.push(<span key={(row * 3) + col}>{this.renderSquare((row * 3) + col)}</span>);
            }
            boardSquares.push(<div className="board-row" key={row}>{boardRow}</div>);
        }

        return (
            <div>
                {boardSquares}
            </div>
        );
    }
}