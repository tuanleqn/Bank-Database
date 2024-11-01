import AdminPage from '../pages/AdminPage/AdminPage';
import UserPage from '../pages/UserPage/UserPage';
import LandingPage from '../pages/LandingPage/LandingPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';

const routes = [
    {
        path: '/',
        component: LandingPage,
    },
    {
        path: '/admin',
        component: AdminPage,
        layout: true,
    },
    {
        path: '/user',
        component: UserPage,
        layout: true,
    },
    {
        path: '/auth/login',
        component: LoginPage,
    },
    {
        path: '/auth/register',
        component: RegisterPage,
    },
];

export default routes;
