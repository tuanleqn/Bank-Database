import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import logo from '../../img/hcmut.png';

function Header() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleLogout = async () => {
        try {
            await axios.post(`${apiUrl}auth/log_out`, {}, { withCredentials: true });
            localStorage.clear();
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    useEffect(() => {
        const items = document.querySelectorAll('.headerNav li');
        items.forEach((item) => {
            item.addEventListener('click', () => {
                items.forEach((i) => i.classList.remove('bg-primary'));
                item.classList.add('bg-primary');
            });
        });
    }, []);

    return (
        <div className="mx-6 flex  items-center  rounded-2xl bg-opacity-10 bg-gradient-to-r from-[#DBE2EF] to-[#64768C] px-6 py-2">
            <div className="mr-[150px] flex items-center">
                <img src={logo} alt="Logo" className="size-[45px]" />
                <p className="ml-4 text-xl font-semibold">Bank</p>
            </div>
            <ul className="headerNav mr-auto flex gap-4 font-medium text-textColor border-l-2 pl-4 border-primary">
                <li className="rounded-lg bg-primary px-4 py-1 text-white hover:bg-primary">
                    <Link to="">Trang chủ</Link>
                </li>
            </ul>
            <div className="relative flex items-center group ">
                <img
                    src="https://c4.wallpaperflare.com/wallpaper/821/698/393/anime-naruto-akatsuki-naruto-deidara-naruto-wallpaper-preview.jpg"
                    alt="avatar"
                    className="size-[45px] rounded-full object-cover"
                />
                <div className="absolute top-[60px] right-0 opacity-0 bg-primary group-hover:opacity-100 transition-opacity duration-300 w-fit p-2 rounded-lg">
                    <div
                        className="hover:bg-white  hover:text-textColor text-white cursor-pointer px-4 py-2 rounded-lg inline-block whitespace-nowrap"
                        onClick={handleLogout}
                    >
                        Đăng xuất
                    </div>
                </div>
            </div>
        </div>
    );
}



function Layout({ children }) {
    return (
        <div className="flex h-screen  flex-col bg-bgColor pt-0">
            <Header />
            <main className=" pt-6  px-12 py-0 bg-bgColor">{children}</main>
        </div>
    );
}

export default Layout;
