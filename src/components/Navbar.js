import React from 'react';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';

export default function NavBar() {

    return (
        <Navbar collapseOnSelect expand='lg' sticky='top' bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/"><h1>Nominations</h1></Navbar.Brand>
                <Nav className='mr-auto'>
                    <Nav.Item>
                        <Nav.Link href="/list" className='text-primary'>List</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav>
                    <Nav.Link href='/login'>
                        <Button bg='warning' variant='oultine-primary'>
                            Login
                    </Button>
                    </Nav.Link>
                </Nav>
            </Container>

        </Navbar>
    )
}