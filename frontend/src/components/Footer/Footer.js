import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
    return (
        <Navbar bg="light" expand="lg" fixed="bottom">
            <Container>
                <div className="ms-auto me-auto">Copy Right</div>
            </Container>
        </Navbar>
    );
}

export default Footer;
