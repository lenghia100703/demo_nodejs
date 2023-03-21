import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/apiRequest';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '../../createInstance';
import { logoutSuccess } from '../../redux/authSlice';

function Header() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, logoutSuccess);

    const handleLogout = (id) => {
        logoutUser(id, user?.accessToken, dispatch, navigate, axiosJWT);
    };
    return (
        <Navbar bg="secondary" expand="lg">
            <Container>
                <Navbar.Brand href="/" style={{ color: 'white' }}>
                    APP
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" style={{ color: 'white' }}>
                            Home
                        </Nav.Link>
                    </Nav>
                    <Nav className="d-flex"></Nav>
                </Navbar.Collapse>
                {user ? (
                    <>
                        <div className="me-3" style={{ color: 'white' }}>
                            Hi, <span>{user.username}</span>
                        </div>
                        <Button variant="outline-light" onClick={() => handleLogout(user._id)}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button href="/register" variant="outline-light" className="me-3">
                            Register
                        </Button>
                        <Button href="/login" variant="light pe-4 ps-4">
                            Login
                        </Button>
                    </>
                )}
            </Container>
        </Navbar>
    );
}

export default Header;
