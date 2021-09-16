import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Clock.css';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div className="main">
                <Container fluid>
                    <Row className={"justify-content-center"}>
                        <Col sm="auto"><h2>{this.state.date.toLocaleTimeString()}</h2></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}