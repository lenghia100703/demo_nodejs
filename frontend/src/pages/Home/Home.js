import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '../../redux/apiRequest';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { loginSuccess } from '../../redux/authSlice';
import { deleteUserSuccess } from '../../redux/userSlice';
import { createAxios } from '../../createInstance';

function Home() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const userList = useSelector((state) => state.users.users?.allUsers);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        if (user.admin) {
            deleteUser(id, user?.accessToken, dispatch, createAxios(user, dispatch, deleteUserSuccess));
        } else {
            alert('You are not allowed to delete this user');
        }
    };

    useEffect(() => {
        getAllUsers(user?.accessToken, dispatch, createAxios(user, dispatch, loginSuccess));
    }, []);
    return (
        <main className="container d-flex">
            {userList?.map((data, index) => (
                <Card className="mt-5 me-5 ms-5" style={{ width: '18rem' }} key={index}>
                    <Card.Body>
                        <Card.Title>{data.username}</Card.Title>
                        <Card.Text>{data.email}</Card.Text>
                        <Card.Text>{data.admin ? <>admin</> : <>user</>}</Card.Text>
                        <Button variant="primary">Detail</Button>
                        <Button variant="outline-primary ms-5" onClick={() => handleDelete(user._id)}>
                            Delete
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </main>
    );
}

export default Home;
