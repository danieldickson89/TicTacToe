import React from 'react';
import Header from './base-components/Header';
import Game from './tic-tac-toe/Game';
import Clock from './clock/Clock';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Game />
                <Clock />
            </div>
        );
    }
}