import { Link, useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';
import ImgLogin from '../../img/image.png';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [iconShowPassword, setIconShowPassword] = useState(true);
    const passwordRef = useRef(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const openNotification = (type, message) => {
        notification[type]({
            message: type === 'success' ? 'Thành công' : 'Thất bại',
            description: message,
            duration: 3,
        });
    };

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
                console.log(data);

                if (response.ok && data.status === false) {
                    navigate('/home');
                }
            } catch (error) {}
        };
        cheklogin();

        const passwordInput = passwordRef.current;
        passwordInput.type = showPassword ? 'text' : 'password';
    }, [showPassword, apiUrl, navigate]);

    function toggleShowPassword() {
        setShowPassword(!showPassword);
        setIconShowPassword(!iconShowPassword);
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setMessage('Vui lòng nhập đầy đủ thông tin.');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}auth/sign_up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await response.json();

            if (data.status) {
                openNotification('success', 'Tạo tài khoản thành công!');
                navigate('/auth/login');
            } else {
                openNotification('fail', 'Tạo tài khoản thất bại!');
            }
        } catch (error) {
            setMessage('Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    };

    return (
        <div className="flex sm:p-10 p-4 justify-center sm:bg-transparent ms:items-center h-dvh">
            {/* column left */}
            <div className="sm:flex-1 sm:p-10 p-5 my-auto h-fit text-[#6F6F6F] bg-white rounded-xl sm:rounded-none">
                {/* logo in mobile */}
                <div className="sm:hidden mb-6 flex items-center gap-3 justify-center">
                    <span className="text-[#0688B4] font-bold text-3xl">BK SSPS</span>
                </div>
                <h1 className="sm:text-3xl text-lg text-black font-bold text-center">DỊCH VỤ XÁC THỰC NGÂN HÀNG</h1>
                <p className="text-center mt-6">
                    Xin mời bạn nhập đầy đủ thông tin đăng ký. Sau đó bạn sẽ có quyền truy cập và sử dụng các dịch vụ
                    của chúng tôi.
                </p>
                <form className="flex flex-col sm:w-[450px] m-auto mt-8" onSubmit={handleRegister}>
                    <label>Họ và tên</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Vui lòng nhập họ và tên"
                        className="border-[1px] mt-2 mb-4 focus:outline-none border-black sm:w-[450px] px-6 py-2 rounded-xl"
                    />

                    <label>Địa chỉ email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Vui lòng nhập địa chỉ email"
                        className="border-[1px] mt-2 mb-4 focus:outline-none border-black sm:w-[450px] px-6 py-2 rounded-xl"
                    />
                    <label>Mật khẩu</label>
                    <div className="border-[1px] border-black rounded-xl mt-2 mb-2 flex justify-between w-auto">
                        <input
                            ref={passwordRef}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Vui lòng nhập mật khẩu"
                            className="flex-1 block mr-auto focus:outline-none px-6 rounded-xl"
                        />
                        {iconShowPassword ? (
                            <EyeInvisibleOutlined
                                onClick={toggleShowPassword}
                                className="hover:cursor-pointer hover:text-black hover:scale-110 p-[10px] text-xl"
                            />
                        ) : (
                            <EyeOutlined
                                onClick={toggleShowPassword}
                                className="hover:cursor-pointer hover:text-black hover:scale-110 p-[10px] text-xl"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-primary py-2 text-white font-bold rounded-xl mt-6 hover:shadow hover:shadow-[#0688B4]"
                    >
                        Đăng ký
                    </button>
                </form>
                {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
                <div className="text-center mt-6">
                    Bạn đã có tài khoản?{' '}
                    <Link to="/auth/login" className="text-primary ml-2 font-semibold hover:underline">
                        Đăng nhập ngay
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

export default Register;
