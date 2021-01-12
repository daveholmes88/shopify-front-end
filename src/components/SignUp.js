import React, { Component } from "react"
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';

import { config } from "../Constants";

const API_Users = config.url.API_Users

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            signUpFailModal: false,
            signUpBlankModal: false
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

    signUp = event => {
        event.preventDefault()
        if (this.state.username === '' || this.state.password === '') {
            this.setState({
                signUpBlankModal: true
            })
        } else {
            const newUser = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            }
            fetch(API_Users, newUser)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    if (data.error) {
                        this.setState({
                            signUpFailModal: true
                        })
                    } else {
                        this.props.loginUser({ id: data.id, username: data.username }, [])
                        localStorage.setItem('token', data.token)
                        this.props.history.push("/")
                    }
                })
                .catch(err => console.log(err))
        }
    }
    closeFailModal = () => {
        this.setState({
            signUpFailModal: false
        })
    }

    closeBlankModal = () => {
        this.setState({
            signUpBlankModal: false
        })
    }

    render() {
        return (
            <Container >
                <Modal show={this.state.signUpFailModal} onHide={this.closeFailModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign Up Failed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>We were not able to sign you up. This is most likely caused by your username being taken. Please try again.</Modal.Body>
                </Modal>
                <Modal show={this.state.signUpBlankModal} onHide={this.closeBlankModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>There Must be a Username and Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>We can not sign up a user with a blank username or password.</Modal.Body>
                </Modal>
                <Row md={2}>
                    <Col>
                        <br></br>
                        <h2 class='text-dark'>SIGN UP</h2>
                        <h5>Already a user? <a href='/login'><Button variant='dark'>Login</Button></a></h5>
                        <Form onSubmit={this.signUp}>
                            <Form.Group>
                                <Form.Label class='text-dark'>Username:</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" onChange={this.changeUsername} value={this.state.username} />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label class='text-dark'>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" onChange={this.changePassword} value={this.state.password} />
                            </Form.Group>
                            <Button variant="dark" type="submit">Sign Up</Button>
                        </Form>
                    </Col>
                </Row>
            </Container >
        )
    }
}

export default SignUp