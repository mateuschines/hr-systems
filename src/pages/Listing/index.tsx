import React, { useCallback, useEffect, useState } from 'react'
import { PageHeader, Button, Table, Space, Typography } from 'antd'
import { useHistory } from 'react-router-dom'

import axios from 'axios'

import './style.css';

const { Title } = Typography;

const Listing: React.FC = () => {

    const history = useHistory();

    const [data, setData] = useState<any>([]);

    useEffect((): void => {

        const request = async () => {
            try {
                let result = await axios.get("http://localhost:3333/employees");

                setData(result.data)

            } catch (error) {
                console.log(error);
            }
        }

        request();
    }, []);

    const onClick = useCallback((): void => {
        history.push("/form");
    }, [history]);

    const onClickDetails = useCallback((record: any): void => {
        history.push("/details", record);
    }, [history]);

    const onClickDelete = useCallback((record: any): void => {

        const request = async () => {
            try {
                await axios.delete("http://localhost:3333/employees/"+record.id);

                let result = await axios.get("http://localhost:3333/employees");

                setData(result.data)

            } catch (error) {
                console.log(error);
            }
        }

        request();
    }, [history]);

    const columns = [
        {
            title: 'Employee ID',
            dataIndex: 'id',
            key: 'id',
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
                <Space style={{marginRight: 0}}>
                    <Button onClick={() => onClickDelete(record)} type="link">Delete and</Button>
                    <Button style={{marginLeft: -34}} onClick={() => onClick()} type="link">Create</Button>
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
                <Table  columns={columns} rowKey={(record) => record.id} dataSource={data} />
            </div>
        </>
    );
}

export default Listing;
