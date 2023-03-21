import DefaultLayout from '../layout/DefaultLayout/DefaultLayout';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

const routes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/login', component: Login, layout: DefaultLayout },
    { path: '/register', component: Register, layout: DefaultLayout },
];

export default routes;
