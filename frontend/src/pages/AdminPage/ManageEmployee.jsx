import React, { useState, useEffect } from "react";
import { Table } from "antd";

function ManageEmployee() {

    const data = Array.from({ length: 10 }, (_, index) => ({
        id: `22100${index + 1}`,
        name: `Hoang Thi ${String.fromCharCode(65 + index)}`,
        quantity: index + index * 2,
    }));

    const columns = [
        {
            title: <span style={{ fontWeight: '600' }}>ID</span>,
            dataIndex: 'id',
        },
        {
            title: <span style={{ fontWeight: '600' }}>Họ và tên</span>,
            dataIndex: 'name',
        },
        {
            title: <span style={{ fontWeight: '600' }}>Số khách hàng đảm nhận</span>,
            dataIndex: 'quantity',
        },
    ];



    return (
        <div className="overflow-auto mt-6 h-[490px]">
            <Table
                columns={columns}
                dataSource={data}
                className="rounded-lg  border-[1px] border-[#EFF1F3] shadow"
            />
        </div>
    );
}
export default ManageEmployee;