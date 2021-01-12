import React, { Component } from "react"
import { Container, Form, Row, Col, Button, Card, Modal } from 'react-bootstrap';

import { API_Key } from "../Constants";

class Home extends Component {

    constructor() {
        super()
        this.state = {
            movieSearch: '',
            searchedMovie: {},
            nominated: false
        }
    }

    changeMovieSearch = event => {
        this.setState({
            movieSearch: event.target.value
        })
    }

    searchMovies = event => {
        event.preventDefault()
        fetch(`http://www.omdbapi.com/?apikey=${API_Key}&t=${this.state.movieSearch}`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    movieSearch: '',
                    searchedMovie: data
                })
            })
            .catch(err => console.log(err))
    }

    nominationCard = () => {
        const movieCheck = this.props.myMovies.filter(movie => {
            return movie.title === this.state.searchedMovie.Title
        })
        return (
            <Card>
                <Container>
                    <Row>
                        <Card.Title>{this.state.searchedMovie.Title}, ({this.state.searchedMovie.Year})</Card.Title>
                        {movieCheck.length > 0 ? <Button variant='dark' disabled>Already Nominated</Button> : <Button variant='dark' onClick={() => this.props.nominateMovie(this.state.searchedMovie)}>Nominate Movie</Button>}
                    </Row>
                </Container>
            </Card>
        )
    }

    nominatedMovies = () => {
        return this.props.myMovies.map(movie => {
            return (
                <div>
                    <br></br>
                    <Card>
                        <Container>
                            <Row>
                                <Card.Body>
                                    <h3>{movie.title}, ({movie.year})</h3>
                                    <Button variant='dark' onClick={() => this.props.removeNomination(movie)}>Remove Nomination</Button>
                                </Card.Body>
                            </Row>
                        </Container>
                    </Card>
                </div>
            )
        })
    }

    render() {
        return (
            <Container>
                <Modal show={this.props.noUserModal} onHide={this.props.closeUserModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>No User Logged In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You must be logged in in order to nominate a movie. </Modal.Body>
                </Modal>
                <Modal show={this.props.nominationNumberModal} onHide={this.props.closeNumberModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>You've already nominated five movies</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Any one use is only allowed to nominate five movies.</Modal.Body>
                </Modal>
                <br></br>
                <Form onSubmit={this.searchMovies}>
                    <Form.Group>
                        <Form.Label class='text-dark'>Movie Title:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Movie Title" onChange={this.changeMovieSearch} value={this.state.movieSearch} />
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                    <Button variant="dark" type='submit'>Search</Button>
                </Form>
                <br></br>
                <Row>
                    <Col>
                        <h2>Movie:</h2>
                        {this.state.searchedMovie.Title ? this.nominationCard() : null}
                    </Col>
                    <Col>
                        <h2>My Nominations:</h2>
                        {this.props.myMovies.length > 0 ? this.nominatedMovies() : null}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home