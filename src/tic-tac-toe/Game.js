import React from 'react';
import Board from './Board';
import './Game.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                location: [0, 0]
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    componentDidMount() {
        this.sortHandleClick();
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                location: [Math.floor((i % 3) + 1), Math.floor((i / 3) + 1)]
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    sortHandleClick() {
        this.setState({
            ascending: !this.state.ascending
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const ascending = this.state.ascending;
        const tieGame = (this.state.stepNumber === 9 && !winner) ? true : false;

        const moves = history.map((step, move) => {
            const location = step.location;
            const desc = move ?
                `Move # ${move} - (${location[0]},${location[1]})` :
                `Game start`;

            return (
                <div key={move} className="move-desc">
                    <Button
                        variant='dark'
                        className={(move === this.state.stepNumber ? 'selected-step' : '')}
                        onClick={() => this.jumpTo(move)}
                    >
                        {desc}
                    </Button>
                </div>
            );
        });

        let status;
        let playerOneTurn = false;
        let playerTwoTurn = false;
        if (winner) {
            status = winner.winner + ' Wins!';
            playerOneTurn = false;
            playerTwoTurn = false;
        } else if (this.state.stepNumber < 9) {
            status = "Player " + (this.state.xIsNext ? '1' : '2') + ":";
            playerOneTurn = this.state.xIsNext ? true : false;
            playerTwoTurn = this.state.xIsNext ? false : true;
        } else {
            status = 'It\'s a draw!';
            playerOneTurn = false;
            playerTwoTurn = false;
        }

        return (
            <Container fluid>
                <Row>
                    <Col sm={3}></Col>
                    <Col sm={6}>
                        <Row className={"justify-content-center status " + (playerOneTurn ? 'player-1 ' : '') + (playerTwoTurn ? 'player-2 ' : '')}>
                            {status}
                        </Row>
                        <div className="game-board">
                            <Board
                                squares={current.squares}
                                onClick={(i) => this.handleClick(i)}
                                winner={winner && winner.winningSquares}
                                tieGame={tieGame}
                            />
                        </div>
                    </Col>
                    <Col sm={3}>
                        <div className="toggle-button"><Button variant="dark" onClick={() => this.sortHandleClick()}>Toggle Sort Order</Button></div>
                        <div>{ascending ? moves : moves.reverse()}</div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a] === 'X' ? 'Player 1' : 'Player 2',
                winningSquares: lines[i]
            };
        }
    }
    return null;
}