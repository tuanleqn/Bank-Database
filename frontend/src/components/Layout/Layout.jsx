import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '../../img/hcmut.png'

function Header() {
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
        <div className="mx-6 flex h-[60px] items-center  rounded-2xl bg-opacity-10 bg-gradient-to-r from-[#DBE2EF] to-[#64768C] px-6">
            <div className="mr-[150px] flex items-center">
                <img src={logo} alt="Logo" className="size-[45px]" />
                <p className="ml-4 text-xl font-semibold">Bank</p>
            </div>
            <ul className="headerNav mr-auto flex gap-4 font-medium text-textColor border-l-2 pl-4 border-primary">
                <li className="rounded-lg bg-primary px-4 py-1 text-white hover:bg-primary">
                    <Link to="">Trang chủ</Link>
                </li>
                
            </ul>
            <div className="flex items-center">
                <img
                    src="https://c4.wallpaperflare.com/wallpaper/821/698/393/anime-naruto-akatsuki-naruto-deidara-naruto-wallpaper-preview.jpg"
                    alt="avatar"
                    className="size-[45px] rounded-full object-cover"
                />
            </div>
        </div>
    );
}

function Footer() {
    return (
        <div className="flex h-20 items-center justify-center bg-primary text-white -mb-20">
            <p className="text-center">© 2024 Tài chính vững mạnh, tương lai thịnh vượng.</p>
        </div>
    );
}

function Layout({ children }) {
    return (
        <div className="flex h-20 min-h-screen flex-col bg-bgColor pt-6">
            <Header />
            <main className="flex-grow px-12">{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
