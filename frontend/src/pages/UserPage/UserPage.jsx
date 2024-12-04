import { Table } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

function UserPage() {
    const [userData, setUserData] = useState([]);
    const [dataAccouts, setDataAccouts] = useState([]);    

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
            title: 'Số dư',
            render: (_, record) => record.savingDetails?.accountBalance || record.checkingDetails?.accountBalance || record.loanDetails?.dueBalance || record.details?.accountBalance || 'N/A',
        },
        {
            title: <span style={{ fontWeight: '600' }}>Lãi suất</span>,
            render: (_, record) => record.savingDetails?.interestRate ||record.loanDetails?.interestRate || 'N/A',
        },
        {
            title: <span style={{ fontWeight: '600' }}>Ngày mở / Ngày vay</span>,
            render: (_, record) =>  record.loanDetails?.dateOfTaken || record?.openDate || 'N/A',
            
        },
    ];

    useEffect(() => {
        axios
            .get('https://bank-database-production.up.railway.app/user/profile', {
                withCredentials: true,
            })
            .then((res) => {
                setUserData(res.data[0]);
                setDataAccouts(res.data[0].accounts);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log(userData);
    console.log(dataAccouts);
    


    return (
        <div className=" mx-auto flex justify-between gap-12">
            {/* top */}
            <div className="w-2/5 h-fit shadow-lg border bg-white rounded-xl overflow-hidden">
                <div className="bg-primary rounded-ee-xl text-white font-semibold px-6 py-2 w-fit">
                    Thông tin chi tiết{' '}
                </div>

                <div className="flex py-12">
                    <div className=" w-1/5  ml-12  flex items-center justify-center">
                        <i className="fa-solid fa-user text-[100px] "></i>
                    </div>

                    <div className="left space-y-2 ml-24 pr-6 font-semibold">
                        <p>
                            ID: <span className="ml-2 font-normal">{userData?.customerCode || '---'}</span>
                        </p>
                        <p>
                            Họ và tên:
                            <span className="ml-2 font-normal">
                                {userData?.lastName + ' ' + userData?.firstName || '---'}
                            </span>
                        </p>
                        <p>
                            Email: <span className="ml-2 font-normal">{userData?.email || '---'}</span>
                        </p>
                        
                        <p>
                            Địa chỉ nhà:{' '}
                            <span className="ml-2 font-normal">{userData?.homeAddress || '---'}</span>
                        </p>
                        <p>
                            Địa chỉ công ty:{' '}
                            <span className="ml-2 font-normal">{userData?.officeAddress || '---'}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* bottom */}
            <div className="shadow-lg border flex-grow  bg-white rounded-xl overflow-hidden">
                <div className="bg-primary  rounded-ee-xl text-white font-semibold px-6 py-2 w-fit">
                    Danh sách tài khoản{' '}
                </div>

                <div className="overflow-auto h-[560px] flex-grow mt-6">
                    <Table
                        columns={columnsAccounts}
                        dataSource={dataAccouts}
                        className="rounded-lg  border-[1px] border-[#EFF1F3] shadow"
                    />
                </div>
            </div>
        </div>
    );
}

export default UserPage;
