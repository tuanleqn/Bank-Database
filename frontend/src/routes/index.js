import ManageUser from '../pages/AdminPage/ManageUser';
import UserPage from '../pages/UserPage/UserPage';
import LandingPage from '../pages/LandingPage/LandingPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ServiceReport from '../pages/AdminPage/ServiceReport';

const routes = [
    {
        path: '/',
        component: LandingPage,
    },
    {
        path: '/admin/manage-users',
        component: ManageUser,
        layout: true,
    },    
    {
        path: '/admin/manage-employees',
        component: ServiceReport,
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
