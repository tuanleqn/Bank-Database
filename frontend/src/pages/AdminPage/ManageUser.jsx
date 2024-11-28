import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';

function ManageUsers() {
    const [dataUsers, setDataUsers] = useState([]);
    const [dataAccouts, setDataAccouts] = useState([]);
    const [customerActive, setCustomerActive] = useState(null);
    const [typeAccount, setTypeAccount] = useState(null);

    const columnsCustomers = [
        {
            title: <span style={{ fontWeight: '600' }}>ID</span>,
            dataIndex: 'customerCode',
        },
        {
            title: <span style={{ fontWeight: '600' }}>Họ</span>,
            dataIndex: 'lastName',
        },
        {
            title: <span style={{ fontWeight: '600' }}>Tên</span>,
            dataIndex: 'firstName',
        },
    ];

    const columnsAccounts = [
        {
            title: <span style={{ fontWeight: '600' }}>Loại tài khoản</span>,
            dataIndex: 'accountType',
        },
        {
            title: <span style={{ fontWeight: '600' }}>Mã số</span>,
            dataIndex: 'accountNumber',
        },
        {
            title: 'Account Balance',
            render: (_, record) => record.details?.dueBalance || record.details?.accountBalance || 'N/A',
        },
        {
            title: <span style={{ fontWeight: '600' }}>Lãi suất</span>,
            render: (_, record) => record.details?.interestRate || 'N/A',
        },
        {
            title: <span style={{ fontWeight: '600' }}>Ngày mở / Ngày vay</span>,
            dataIndex: 'openDate',
        },
    ];

    const toggleAddAccount = () => {
        const addAccountBox = document.querySelector('.addAccountBox');
        addAccountBox.classList.toggle('hidden');
        addAccountBox.classList.toggle('flex');

        resetInput();
    };

    const resetInput = () => {
        const input = document.querySelectorAll('input');
        input.forEach((item) => {
            item.value = '';
        });
    };

    const handleAddAccount = () => {
        let apiAddAccount = 'http://localhost:3001/user/account';
        let accountBalance = '';
        let interestRate = '';
        let dueBalance = '';
        let customerCode = '';
        let data = {};

        if (typeAccount === 'Savings') {
            accountBalance = document.querySelector('#accountBalance').value;
            interestRate = document.querySelector('#interestRate').value;
            data = {
                accountBalance,
                interestRate,
            };
            customerCode = customerActive.customerCode;
        }

        if (typeAccount === 'Checking') {
            accountBalance = document.querySelector('#accountBalance').value;
            data = {
                accountBalance,
            };
            customerCode = customerActive.customerCode;
        }

        if (typeAccount === 'Loan') {
            dueBalance = document.querySelector('#dueBalance').value;
            interestRate = document.querySelector('#interestRate').value;
            data = {
                dueBalance,
                interestRate,
            };
            customerCode = customerActive.customerCode;
        }

        axios
            .post(`${apiAddAccount}`, {
                customerCode,
                accountType: typeAccount,
                additionalData: data,
            })
            .then((response) => {
                resetInput();
                toggleAddAccount();
                alert("Tài khoản đã được thêm thành công");
            })
            .catch((error) => {
                console.log(error.response.data.message);                
                alert("Có lỗi xảy ra khi thêm tài khoản");
            });
    };

    useEffect(() => {
        const apiCustomer = 'http://localhost:3001/admin/all_customers';
        axios
            .get(`${apiCustomer}`, {
                withCredentials: true,
            })
            .then((response) => {
                setDataUsers(response.data);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    window.location.href = 'http://localhost:3000/auth/login';
                }
                console.log(error.response.data.message);
            });
    }, []);

    useEffect(() => {
        const listCus = document.querySelectorAll('.ant-table-row');
        let customerCode = '';

        listCus.forEach((item) => {
            item.addEventListener('click', () => {
                customerCode = item.children[0].innerText;
                dataUsers.forEach((customer) => {
                    if (customer.customerCode === customerCode) {
                        setCustomerActive(customer);
                        setDataAccouts(customer.accounts);
                    }
                });
            });
        });
    }, [dataUsers]);

    useEffect(() => {
        const type = document.querySelector('#type');
        if (type) {
            type.addEventListener('change', () => {
                setTypeAccount(type.value);
            });
        }
    }, []);


    return (
        <div className="flex  gap-12 ">
            {/* left */}
            <div className="w-[35%] border   flex flex-col shadow-lg bg-white rounded-xl overflow-hidden">
                <div className="bg-primary rounded-ee-xl text-white font-semibold px-6 py-2 w-fit">Khách hàng</div>

                <div className="flex border mt-6 ml-6 w-[300px] items-center rounded-full bg-white px-4 py-2 shadow outline-none">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search" className="ml-4 w-fit flex-grow outline-none" />
                </div>

                <div className="overflow-auto mt-6 h-[500px]">
                    <Table
                        columns={columnsCustomers}
                        dataSource={dataUsers}
                        pagination={false}
                        className="rounded-lg  border-[1px] border-[#EFF1F3] shadow"
                    />
                </div>
            </div>

            {/* right */}
            <div className="flex-grow">
                {/* top */}
                <div className="shadow-lg border bg-white rounded-xl overflow-hidden">
                    <div className="bg-primary rounded-ee-xl text-white font-semibold px-6 py-2 w-fit">
                        Thông tin chi tiết{' '}
                    </div>

                    <div className="flex pb-6">
                        <div className=" w-1/5  flex items-center justify-center">
                            <i className="fa-solid fa-user text-[100px] "></i>
                        </div>

                        <div className="left space-y-2 ml-24 font-semibold">
                            <p>
                                Họ và tên:
                                <span className="ml-2 font-normal">
                                    {customerActive
                                        ? customerActive?.lastName + ' ' + customerActive?.firstName
                                        : '---'}
                                </span>
                            </p>
                            <p>
                                Mã số:{' '}
                                <span className="ml-2 font-normal"> {customerActive?.customerCode || '---'}</span>
                            </p>
                            <p>
                                Email: <span className="ml-2 font-normal"> {customerActive?.email || '---'}</span>
                            </p>
                            <p>
                                Số điện thoại:{' '}
                                <span className="ml-2 font-normal"> {customerActive?.phoneNumbers || '---'}</span>
                            </p>
                            <p>
                                Địa chỉ nhà:{' '}
                                <span className="ml-2 font-normal"> {customerActive?.homeAddress || '---'}</span>
                            </p>
                            <p>
                                Địa chỉ công ty:{' '}
                                <span className="ml-2 font-normal"> {customerActive?.officeAddress || '---'}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* bottom */}
                <div className="shadow-lg mt-6 border  bg-white rounded-xl overflow-hidden">
                    <div className="flex justify-between">
                        <div className="bg-primary  rounded-ee-xl text-white font-semibold px-6 py-2 h-fit">
                            Danh sách tài khoản{' '}
                        </div>

                        {customerActive && (
                            <button
                                onClick={toggleAddAccount}
                                className="text-white bg-primary rounded-lg mt-4 mr-4 px-6 py-2 shadow-inner hover:shadow-white"
                            >
                                Thêm tài khoản
                            </button>
                        )}

                        {/* pop up add account */}
                        <div className="addAccountBox z-50 hidden absolute left-0 bottom-0 top-0 bg-gray-300 bg-opacity-70 w-screen h-screen">
                            <div className=" ml-auto flex-col rounded-lg   right-0 py-4 px-12 m-auto bg-white shadow border w-fit h-fit">
                                <div
                                    onClick={toggleAddAccount}
                                    className="px-4 py-1 cursor-pointer text-white bg-primary size-fit shadow-inner ml-auto hover:shadow-white select-none rounded-lg"
                                >
                                    X
                                </div>
                                <div class="mb-4">
                                    <label class="block text-gray-700 font-medium mb-2">Loại tài khoản</label>
                                    <select
                                        id="type"
                                        class="w-full p-2 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:border-blue-200 focus:bg-white transition duration-300 ease-in-out"
                                    >
                                        <option value="null">Chọn loại tài khoản</option>
                                        <option value="Savings">Tài khoản tiết kiệm</option>
                                        <option value="Checking">Tài khoản thanh toán</option>
                                        <option value="Loan">Tài khoản vay</option>
                                    </select>
                                </div>

                                {typeAccount === 'Savings' && (
                                    <>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 font-medium mb-2">Số dư</label>
                                            <input
                                                type="text"
                                                id="accountBalance"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
                                                placeholder="..."
                                            />
                                        </div>

                                        <div class="mb-4">
                                            <label class="block text-gray-700 font-medium mb-2">Lãi suất</label>
                                            <input
                                                type="text"
                                                id="interestRate"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
                                                placeholder="..."
                                            />
                                        </div>
                                    </>
                                )}

                                {typeAccount === 'Checking' && (
                                    <>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 font-medium mb-2">Số dư</label>
                                            <input
                                                type="text"
                                                id="accountBalance"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
                                                placeholder="..."
                                            />
                                        </div>
                                    </>
                                )}

                                {typeAccount === 'Loan' && (
                                    <>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 font-medium mb-2">Dư nợ</label>
                                            <input
                                                type="text"
                                                id="dueBalance"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
                                                placeholder="..."
                                            />
                                        </div>

                                        <div class="mb-4">
                                            <label class="block text-gray-700 font-medium mb-2">Lãi suất</label>
                                            <input
                                                type="text"
                                                id="interestRate"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
                                                placeholder="..."
                                            />
                                        </div>
                                    </>
                                )}

                                <button
                                    onClick={handleAddAccount}
                                    className="text-white ml-7 bg-primary rounded-lg mt-4 px-6 py-2 shadow-inner hover:shadow-white"
                                >
                                    Thêm tài khoản
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-auto h-[280px] flex-grow mt-6">
                        <Table
                            columns={columnsAccounts}
                            dataSource={dataAccouts}
                            className="rounded-lg  border-[1px] border-[#EFF1F3] shadow"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageUsers;
