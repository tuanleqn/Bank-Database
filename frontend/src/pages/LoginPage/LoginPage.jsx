import { Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImgLogin from '../../img/image.png';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [iconShowPassword, setIconShowPassword] = useState(true);
    const passwordRef = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const cheklogin = async () => {
            try {
                const response = await fetch(`${apiUrl}auth/check`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                const data = await response.json();

                if (response.ok && data.status === false) {
                    navigate('/user');
                }
            } catch (error) {
                console.error('Lỗi khi kiểm tra đăng nhập.');
            }
        };
        cheklogin();
        const passwordInput = passwordRef.current;
        if (showPassword) {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    }, [showPassword, navigate, apiUrl]);

    function toggleShowPassword() {
        setShowPassword(!showPassword);
        setIconShowPassword(!iconShowPassword);
    }

    function handleKeyDownPW(e) {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

    function handleKeyDownEmail(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            passwordRef.current.focus();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Vui lòng nhập tên đăng nhập và mật khẩu.');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}auth/log_in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            const data = await response.json();

            if (data.status) {
                localStorage.setItem('idUser', data.idUser);
                localStorage.setItem('role', data.role);
                toast.success('Đăng nhập thành công!');
                setTimeout(() => {
                    navigate('/user');
                }, 300000);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Không thể kết nối đến máy chủ.');
        }
    };

    return (
        <div className="flex sm:p-10 p-4 justify-center sm:bg-transparent ms:items-center h-dvh">
            <ToastContainer />
            {/* column left */}
            <div className="sm:flex-1 sm:p-10 p-5 my-auto h-fit text-[#6F6F6F] bg-white rounded-xl sm:rounded-none">
                {/* logo in mobile */}
                <div className="sm:hidden mb-6 flex items-center gap-3 justify-center">
                    <span className="text-pribg-primary font-bold text-3xl">Bank ABC</span>
                </div>
                <h1 className="sm:text-3xl text-lg text-black font-bold text-center">DỊCH VỤ ĐĂNG NHẬP NGÂN HÀNG</h1>
                <p className="text-balance text-center mt-6">
                    Vui lòng nhập thông tin tài khoản để truy cập vào dịch vụ ngân hàng trực tuyến của chúng tôi
                </p>
                <form className="flex flex-col sm:w-[450px] m-auto mt-8" onSubmit={handleSubmit}>
                    <label>Tên đăng nhập</label>
                    <input
                        type="text"
                        placeholder="Vui lòng nhập tên đăng nhập"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyDownEmail}
                        className="border-[1px] mt-2 mb-4 focus:outline-none border-black sm:w-[450px] px-6 py-2 rounded-xl"
                    />
                    <label className="">Mật khẩu</label>
                    <div className="border-[1px] border-black rounded-xl mt-2 mb-2 flex justify-between w-auto">
                        <input
                            ref={passwordRef}
                            type="password"
                            placeholder="Vui lòng nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDownPW}
                            className="flex-1 block mr-auto focus:outline-none px-6 rounded-xl"
                        />
                        {iconShowPassword && (
                            <EyeInvisibleOutlined
                                onClick={toggleShowPassword}
                                className="hover:cursor-pointer hover:text-black hover:scale-110 p-[10px] text-xl"
                            />
                        )}
                        {!iconShowPassword && (
                            <EyeOutlined
                                onClick={toggleShowPassword}
                                className="hover:cursor-pointer hover:text-black hover:scale-110 p-[10px] text-xl"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-primary px-3 py-3  text-white font-bold rounded-xl mt-6 shadow-inner hover:shadow-secondary"
                    >
                        Đăng nhập
                    </button>
                </form>
                <div className="text-center mt-20">
                    Bạn chưa có tài khoản?
                    <Link to="/register" className="text-primary font-semibold hover:underline ml-2">
                        Đăng ký ngay
                    </Link>
                </div>
            </div>
            {/* column right */}
            <div className="hidden sm:flex flex-col flex-1 bg-[#D2ECF4] rounded-xl h-[90vh] items-center justify-center gap-6 pt-4">
                <img src={ImgLogin} alt="login" className="object-cover" />
            </div>
        </div>
    );
}

export default Login;
