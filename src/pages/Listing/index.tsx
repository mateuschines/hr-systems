import React, { useCallback, useEffect, useState } from 'react'
import { PageHeader, Button, Table, Space, Typography } from 'antd'
import { useHistory } from 'react-router-dom';

// import axios from 'axios';

import './style.css';

const { Title } = Typography;

const Listing: React.FC = () => {

    const history = useHistory();

    const [data, setData] = useState<any>([]);

    useEffect((): void => {

        setData([{
            key: '1',
            firstName: 'John',
            lastName: 'Brown',
            salary: '30000',
            taxAmount: '2242.0'
        },
        {
            key: '2',
            firstName: 'Jim',
            lastName: 'Green',
            salary: '25000',
            taxAmount: '1242.0'
        },
        {
            key: '3',
            firstName: 'Joe',
            lastName: 'Black',
            salary: '35000',
            taxAmount: '3242.0'
        }])

        // const request = async () => {
        //     try {
        //         let result = await axios.get("urlApi", dados);

        //         setData(result.data)

        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        // buscaDeDados();
    }, []);

    const onClick = useCallback((): void => {
        history.push("/form");
    }, [history]);

    const onClickDetails = useCallback((record: any): void => {
        history.push("/details", record);
    }, [history]);

    const onClickDelete = useCallback((record: any): void => {
        console.log(record)
    }, [history]);

    const columns = [
        {
            title: 'Employee ID',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'View',
            key: 'view',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <Button onClick={() => onClickDetails(record)} type="link">View Details</Button>
                </Space>
            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <Button onClick={() => onClickDelete(record)} type="link">Delete and Create</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <PageHeader
                className="site-page-header"
                title="Employee Onboarding"

            />
            <div style={{ padding: 24 }}>

                <Button style={{ marginBottom: 20 }} onClick={onClick} type="primary">PLEASE CREATE YOUR PROFILE</Button>

                <Title level={3}>Your Details</Title>
                <Table columns={columns} dataSource={data} />
            </div>
        </>
    );
}

export default Listing;
