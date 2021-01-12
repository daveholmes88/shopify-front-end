import React, { Component } from "react"
import { Container, Table } from 'react-bootstrap';

class NominationList extends Component {

    showNominations = () => {
        const movieNominations = this.props.movies.map(movie => {
            const nominations = this.props.nominations.filter(nomination => nomination.movie_id === movie.id)
            return { title: movie.title, nominations: nominations.length }
        })
        movieNominations.sort((a, b) => b.nominations - a.nominations)
        return movieNominations.map(movie => {
            return (
                <tr>
                    <td>{movie.title}</td>
                    <td>{movie.nominations}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Container>
                <h1>Nominations</h1>
                <Table striped border hover>
                    <thead>
                        <th>Movie</th>
                        <th>Nominations</th>
                    </thead>
                    <tbody>
                        {this.showNominations()}
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default NominationList

