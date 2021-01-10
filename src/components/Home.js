import React, { Component } from "react"
import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';

class Home extends Component {

    constructor() {
        super()
        this.state = {
            movieSearch: '',
            searchedMovie: {}
        }
    }

    changeMovieSearch = event => {
        this.setState({
            movieSearch: event.target.value
        })
    }

    searchMovies = () => {
        fetch(`http://www.omdbapi.com/?apikey=a51950c&t=${this.state.movieSearch}`)
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
        return (
            <Card>
                <Container>
                    <Row>
                        <Card.Title>{this.state.searchedMovie.Title}, ({this.state.searchedMovie.Year})</Card.Title>
                        <Button onClick={() => this.props.nominateMovie(this.state.searchedMovie)}>Nominate Movie</Button>
                    </Row>
                </Container>
            </Card>
        )
    }

    render() {
        console.log(this.state.searchedMovie)
        return (
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Label class='text-primary'>Movie Title:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Movie Title" onChange={this.changeMovieSearch} value={this.state.movieSearch} />
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                    <Button variant="primary" onClick={this.searchMovies}>Search</Button>
                </Form>
                {this.state.searchedMovie.Title ? this.nominationCard() : null}
            </Container>
        )
    }
}

export default Home