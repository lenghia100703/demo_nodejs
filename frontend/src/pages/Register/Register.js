import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/esm/Stack';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import { registerUser } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        registerUser(
            {
                username: username,
                email: email,
                password: password,
            },
            dispatch,
            navigate,
        );
    };
    return (
        <Container>
            <div className="mt-4 me-auto ms-auto" style={{ maxWidth: 300 }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Stack gap={2} className="mx-auto">
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                        <div className="d-flex justify-content-center">
                            Do you login now? <a href="/login">Login</a>
                        </div>
                    </Stack>
                </Form>
            </div>
        </Container>
    );
}

export default Register;
