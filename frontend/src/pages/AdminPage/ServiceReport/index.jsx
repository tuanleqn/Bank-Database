import axios from 'axios';
import dayjs from 'dayjs';
import './ServiceReport.css'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import React, { useState, useEffect } from "react";
import { Space, DatePicker } from "antd";
import CustomTable from '../../../components/Common/CustomTable';

dayjs.extend(customParseFormat)
const { RangePicker } = DatePicker

function ServiceReport() {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')

    const disabledDate = (current) => {
        return current && current > dayjs().endOf('day')
    }

    const formatDate = (isoDate, type) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        if (type === 'dmy') {
            return `${day}/${month}/${year}`;
        } else if (type === 'ymd') {
            return `${year}-${month}-${day}`;
        }
    }

    const handleDateChange = (values) => {
        if (values && values.length === 2) {
            const [start, end] = values;
            const startDate = new Date(formatDate(start, 'ymd'));
            const endDate = new Date(formatDate(end, 'ymd'));
            setFilteredData(
                data.filter(item => {
                    const dateOfServing = new Date(formatDate(item.dateOfServing, 'ymd'));
                    console.log(dateOfServing, startDate, endDate, dateOfServing >= startDate)
                    return dateOfServing >= startDate && dateOfServing <= endDate;
                })
            )
        }
    };


    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: 50,
            fixed: 'left',
            isSearched: false,
        },
        {
            title: 'Mã nhân viên',
            width: 200,
            dataIndex: 'employeeID',
            key: 'employeeID',
            fixed: 'left',
            isSearched: true,
        },
        {
            title: 'Tên nhân viên',
            width: 140,
            dataIndex: 'employeeName',
            key: 'employeeName',
            isSearched: true,
        },
        {
            title: 'Chi nhánh',
            dataIndex: 'branchName',
            key: 'branchName',
            width: 150,
            isSearched: true,
        },
        {
            title: 'Chức vụ',
            dataIndex: 'position',
            key: 'position',
            width: 100,
            isSearched: false,
            filters: [
                {
                    text: 'Manager',
                    value: 'Manager',
                },
                {
                    text: 'Staff',
                    value: 'Staff',
                }
            ],
            onFilter: (value, record) => record.position === value,
        },
        {
            title: 'Mã khách hàng',
            width: 200,
            dataIndex: 'customerCode',
            key: 'customerCode',
            fixed: 'left',
            isSearched: true,
        },
        {
            title: 'Tên khách hàng',
            width: 140,
            dataIndex: 'customerName',
            key: 'customerName',
            isSearched: false,
        },
        {
            title: 'Ngày phục vụ',
            dataIndex: 'dateOfServing',
            key: 'dateOfServing',
            width: 150,
            isSearched: false,
            render: (e) => <p>{formatDate(e, 'dmy')}</p>,
            sorter: (a, b) => new Date(formatDate(a.dateOfServing, 'ymd')) - new Date(formatDate(b.dateOfServing, 'ymd')),
            fixed: 'right',
        }
    ]

    useEffect(() => {
        axios
            .get(`http://localhost:3001/admin/service-report`)
            .then((response) => {
                setData(
                    response.data.data.map((item, index) => ({
                        ...item,
                        stt: index + 1,
                        key: index,
                    }))
                )
                setFilteredData(
                    response.data.data.map((item, index) => ({
                        ...item,
                        stt: index + 1,
                        key: index,
                    }))
                )
                setLoading(false);
            })
            .catch((error) => {
                console.error(error.message)
            })
    }, [])

    return (
        <div className="ServiceReport mt-6 h-[490px]">
            <Space className="service-report-filter">
                <div>
                    <p>Lọc theo:</p>
                    <div className="range-picker-container">
                        <RangePicker
                            disabledDate={disabledDate}
                            format="DD/MM/YYYY"
                            placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>
            </Space>
            <CustomTable
                columns={columns}
                data={filteredData}
                isLoading={isLoading}
                searchText={searchText}
                searchedColumn={searchedColumn}
                setSearchText={setSearchText}
                setSearchedColumn={setSearchedColumn}
            />
        </div>
    );
}
export default ServiceReport;