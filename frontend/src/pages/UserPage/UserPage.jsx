import { Table } from 'antd';

function userPage() {
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
                            ID: <span className="ml-2 font-normal"> 07538772427</span>
                        </p>
                        <p>
                            Họ và tên:
                            <span className="ml-2 font-normal"> Nguyễn Văn A</span>
                        </p>
                        <p>
                            Email: <span className="ml-2 font-normal"> abc@hcmut.edu.vn</span>
                        </p>
                        <p className="flex gap-4 ">
                            <span>Số điện thoại: </span>
                            <div className='flex flex-col'>
                                <span className="ml-2 font-normal"> 19006791</span>
                                <span className="ml-2 font-normal"> 19006791</span>
                            </div>
                        </p>
                        <p>
                            Địa chỉ nhà: <span className="ml-2 font-normal">KTX khu A, Đông Hòa, Dĩ An, Bình Dương</span>
                        </p>
                        <p>
                            Địa chỉ công ty: <span className="ml-2 font-normal">KTX khu A, Đông Hòa, Dĩ An, Bình Dương</span>
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

export default userPage;
