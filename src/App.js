import React from 'react';
import Header from './base-components/Header';
import Game from './tic-tac-toe/Game';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Game />
            </div>
        );
    }
}