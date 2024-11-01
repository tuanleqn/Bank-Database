import { Table } from 'antd';

function AdminPage() {
    const dataUsers = Array.from({ length: 10 }, (_, index) => ({
        id: `22100${index + 1}`,
        name: 'Nguyễn Văn A',
    }));

    const columnsUsers = [
        {
            title: <span style={{ fontWeight: '600' }}>MSSV</span>,
            dataIndex: 'id',
        },
        {
            title: <span style={{ fontWeight: '600' }}>Tên</span>,
            dataIndex: 'name',
        },
    ];

    const dataAccouts = Array.from({ length: 10 }, (_, index) => ({
        type: 'Tài khoản vay',
        id: `22100${index + 1}`,
    }));

    const columnsAccounts = [
        
        {
            title: <span style={{ fontWeight: '600' }}>Loại tài khoản</span>,
            dataIndex: 'type',
        },
        {
            title: <span style={{ fontWeight: '600' }}>Mã số</span>,
            dataIndex: 'id',
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
            dataIndex: 'id',
        },
    ];

    return (
        <div className="flex mt-6 gap-12 ">
            {/* left */}
            <div className="w-[35%] border h-[560px] flex flex-col shadow-lg bg-white rounded-xl overflow-hidden">
                <div className="bg-primary rounded-ee-xl text-white font-semibold px-6 py-2 w-fit">Khách hàng</div>

                <div className="flex border mt-6 ml-6 w-[300px] items-center rounded-full bg-white px-4 py-2 shadow outline-none">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search" className="ml-4 w-fit flex-grow outline-none" />
                </div>

                <div className="overflow-auto flex-grow mt-6">
                    <Table
                        columns={columnsUsers}
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
                                <span className="ml-2 font-normal"> Nguyễn Văn A</span>
                            </p>
                            <p>
                                Mã số: <span className="ml-2 font-normal"> 2217639</span>
                            </p>
                            <p>
                                Email: <span className="ml-2 font-normal"> abc@hcmut.edu.vn</span>
                            </p>
                            <p>
                                Số điện thoại: <span className="ml-2 font-normal"> 19006791</span>
                            </p>
                            <p>
                                Khoa: <span className="ml-2 font-normal"> Khoa học và kĩ thuật máy tính</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* bottom */}
                <div className="shadow-lg mt-6 border  bg-white rounded-xl overflow-hidden">
                    <div className="bg-primary  rounded-ee-xl text-white font-semibold px-6 py-2 w-fit">
                        Danh sách tài khoản{' '}
                    </div>

                    <div className="overflow-auto h-[260px] flex-grow mt-6">
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

export default AdminPage;
