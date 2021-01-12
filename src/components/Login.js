import React, { Component } from "react"
import { Container, Form, Col, Row, Button, Modal } from 'react-bootstrap';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loginFailModal: false,
            loginBlankModal: false
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
        if (this.state.username === '' || this.state.password === '') {
            this.setState({
                loginBlankModal: true
            })
        } else {
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
            fetch(`https://dave-holmes-shopify-back-end.herokuapp.com/users/1`, reqUser)
                .then((resp) => resp.json())
                .then((data) => {
                    if (data.error) {
                        this.setState({
                            loginFailModal: true
                        })
                    } else {
                        this.props.loginUser({ id: data.id, username: data.username, }, data.my_movies)
                        localStorage.setItem('token', data.token)
                        this.props.history.push('/')
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    closeFailModal = () => {
        this.setState({
            loginFailModal: false
        })
    }

    closeBlankModal = () => {
        this.setState({
            loginBlankModal: false
        })
    }

    render() {
        return (
            <Container>
                <Modal show={this.state.loginFailModal} onHide={this.closeFailModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login Failed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>We were not able to log you in. Please try again.</Modal.Body>
                </Modal>
                <Modal show={this.state.loginBlankModal} onHide={this.closeBlankModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>There Must be a Username and Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>We can not log a user in with a blank username or password.</Modal.Body>
                </Modal>
                <Row md={2}>
                    <Col>
                        <br></br>
                        <h2 class='text-dark'>LOGIN</h2>
                        <h5>Not a user? <a href='/signup'><Button variant='dark' onClick>Sign Up</Button></a></h5>
                        <Form onSubmit={this.submitLogin}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label class='text-dark'>Username:</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" onChange={this.changeUsername} value={this.state.username} />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label class='text-dark'>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" onChange={this.changePassword} value={this.state.password} />
                            </Form.Group>
                            <Button variant="dark" type="submit">Login</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Login