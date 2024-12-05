import axios from 'axios';
import dayjs from 'dayjs';
import './ServiceReport.css'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import React, { useState, useEffect } from "react";
import { Space, DatePicker, Modal, Button, notification } from "antd";
import CustomTable from '../../../components/Common/CustomTable';

dayjs.extend(customParseFormat)
const { RangePicker } = DatePicker

function ServiceReport() {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [filteredDataP, setFilteredDataP] = useState([])
    const [isLoadingP, setLoadingP] = useState(true)
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const apiUrl = process.env.REACT_APP_API_URL;

    const disabledDate = (current) => {
        return current && current > dayjs().endOf('day');
    };

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
    };

    const handleDateChange = (values) => {
        if (values && values.length === 2) {
            const [start, end] = values;
            const sDate = new Date(formatDate(start, 'ymd'));
            const eDate = new Date(formatDate(end, 'ymd'));
            setStartDate(sDate);
            setEndDate(eDate);
            setFilteredData(
                data.filter((item) => {
                    const dateOfServing = new Date(formatDate(item.dateOfServing, 'ymd'));
                    return dateOfServing >= sDate && dateOfServing <= eDate;
                }),
            );
        }
    };

    const openNotification = () => {
        notification.error({
            message: 'Vui lòng chọn ngày!',
            description: 'Thông báo này sẽ tự động đóng sau 2 giây.',
            duration: 2,
        });
    };

    const showModal = async () => {
        if (startDate !== '' && endDate !== '') {
            try {
                const response = await axios.post(`${apiUrl}admin/total-serve`, {
                    startDate: formatDate(startDate, 'ymd'),
                    endDate: formatDate(endDate, 'ymd'),
                });
                setFilteredDataP(
                    response.data.data[0].map((item, index) => ({
                        ...item,
                        stt: index + 1,
                        key: index,
                    })),
                );
                setLoadingP(false);
                setOpen(true);
            } catch (error) {
                console.error('Error:', error.message);
            }
        } else {
            openNotification();
        }
    };

    const hideModal = () => {
        setOpen(false);
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
                },
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
            sorter: (a, b) =>
                new Date(formatDate(a.dateOfServing, 'ymd')) - new Date(formatDate(b.dateOfServing, 'ymd')),
            fixed: 'right',
        },
    ];

    const columnsP = [
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
            width: 100,
            dataIndex: 'eID',
            key: 'eID',
            fixed: 'left',
            isSearched: true,
        },
        {
            title: 'Tên nhân viên',
            width: 140,
            dataIndex: 'eName',
            key: 'eName',
            isSearched: true,
        },
        {
            title: 'Số khách hàng đảm nhận',
            dataIndex: 'totalServe',
            key: 'totalServe',
            width: 100,
            sorter: (a, b) => a.totalServe - b.totalServe,
        },
    ];

    useEffect(() => {
        axios
            .get(`${apiUrl}admin/service-report`)
            .then((response) => {
                setData(
                    response.data.data.map((item, index) => ({
                        ...item,
                        stt: index + 1,
                        key: index,
                    })),
                );
                setFilteredData(
                    response.data.data.map((item, index) => ({
                        ...item,
                        stt: index + 1,
                        key: index,
                    })),
                );
                setLoading(false);
            })
            .catch((error) => {
                console.error(error.message);
            });
    }, []);

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
                <div className="btn-procedure" onClick={showModal}>
                    Procedure
                </div>
                <Modal
                    title={`Số khách hàng do mỗi nhân viên đảm nhận từ ngày ${formatDate(startDate, 'dmy')} đến ngày ${formatDate(endDate, 'dmy')}!`}
                    className='modal-procedure'
                    open={open}
                    onOk={hideModal}
                    onCancel={hideModal}
                    okText="Xác nhận"
                    footer={[
                        <Button key="ok" type="primary" onClick={hideModal} style={{ height: 42, width: 72 }}>
                            OK
                        </Button>,
                    ]}
                >
                    <CustomTable
                        columns={columnsP}
                        data={filteredDataP}
                        isLoading={isLoadingP}
                        searchText={searchText}
                        searchedColumn={searchedColumn}
                        setSearchText={setSearchText}
                        setSearchedColumn={setSearchedColumn}
                    />
                </Modal>
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