import { render } from '@testing-library/react';
import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';

function ManageUsers() {
    const [dataUsers, setDataUsers] = useState([]);
    const [dataAccouts, setDataAccouts] = useState([]);
    const [customerActive, setCustomerActive] = useState(null);

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
            title: <span style={{ fontWeight: '600' }}>Số dư</span>,
            dataIndex: 'id',
        },
        {
            title: <span style={{ fontWeight: '600' }}>Lãi suất</span>,
            dataIndex: 'id',
        },
        {
            title: <span style={{ fontWeight: '600' }}>Ngày mở / Ngày vay</span>,
            dataIndex: 'openDate',
        },
    ];

    useEffect(() => {
        const apiCustomer = 'http://localhost:3001/customer/all_customer';
        axios
            .get(`${apiCustomer}`)
            .then((response) => {
                setDataUsers(response.data);

                const accounts = response.data.map((customer) => customer.accounts);
                setDataAccouts(accounts.flat());
            })
            .catch((error) => {
                console.error(error);
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
                    }
                });
            });
        });
    }, [dataUsers]);

    return (
        <div className="flex  gap-12 ">
            {/* left */}
            <div className="w-[35%] border   flex flex-col shadow-lg bg-white rounded-xl overflow-hidden">
                <div className="bg-primary rounded-ee-xl text-white font-semibold px-6 py-2 w-fit">Khách hàng</div>

                <div className="flex border mt-6 ml-6 w-[300px] items-center rounded-full bg-white px-4 py-2 shadow outline-none">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search" className="ml-4 w-fit flex-grow outline-none" />
                </div>

                <div className="overflow-auto mt-6 h-[490px]">
                    <Table
                        columns={columnsCustomers}
                        dataSource={dataUsers}
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
                                Số điện thoại: <span className="ml-2 font-normal"> {customerActive?.phoneNumber || '---'}</span>
                            </p>
                            <p>
                                Địa chỉ nhà: <span className="ml-2 font-normal"> {customerActive?.homeAddress || '---'}</span>
                            </p>
                            <p>
                                Địa chỉ công ty: <span className="ml-2 font-normal"> {customerActive?.officeAddress || '---'}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* bottom */}
                <div className="shadow-lg mt-6 border  bg-white rounded-xl overflow-hidden">
                    <div className="bg-primary  rounded-ee-xl text-white font-semibold px-6 py-2 w-fit">
                        Danh sách tài khoản{' '}
                    </div>

                    <div className="overflow-auto h-[320px] flex-grow mt-6">
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
