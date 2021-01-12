import React, { Component } from 'react';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';

class NavBar extends Component {

    render() {
        return (
            <Navbar collapseOnSelect expand='lg' sticky='top' bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/"><h1>The Shoppies</h1></Navbar.Brand>
                    <Nav className='mr-auto'>
                        <Nav.Item>
                            <Nav.Link href="/list" className='text-light'><h3>List</h3></Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        <Nav.Link href='/login'>
                            <Button variant='light' onClick={this.props.handleLogout}>
                                {this.props.user.id ? "Logout" : "Login"}
                            </Button>
                        </Nav.Link>
                    </Nav>
                </Container>

            </Navbar>
        )
    }
}

export default NavBar