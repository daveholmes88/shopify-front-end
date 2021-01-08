import React, { Component } from "react"
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { config } from "../Constants";

const API_Users = config.url.API_Users

class Login extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    changePassword = event => {
        this.setState({
            password: event.target.value
        })
    }

    changeUsername = event => {
        this.setState({
            username: event.target.value
        })
    }

    submitLogin = event => {
        event.preventDefault()
        const reqUser = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        };
        fetch(`${API_Users}/1`, reqUser)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    this.props.loginUser({ id: data.id, username: data.username })
                    localStorage.setItem('token', data.token)
                    this.props.history.push('/')
                }
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <Container>
                <Row md={2}>
                    <Col>
                        <br></br>
                        <h2 class='text-primary'>LOGIN</h2>
                        <h5>Not a user? <a href='/signup'><Button onClick>Sign Up</Button></a></h5>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label class='text-primary'>Username:</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" onChange={this.changeUsername} value={this.state.username} />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label class='text-primary'>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" onChange={this.changePassword} value={this.state.password} />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={this.submitLogin}>Login</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Login