import React, { useCallback, useEffect, useState } from 'react'
import { PageHeader, Button, Space, Typography } from 'antd'
import { useHistory } from 'react-router-dom';

const { Text } = Typography;

const Details: React.FC = (props: any) => {

    const history = useHistory();

    const [data, setData] = useState<any>(null);

    useEffect((): void => {

        setData(props?.location?.state)
    }, [props]);

    const onClick = useCallback((): void => {
        history.push("/");
    }, [history]);

    return (
        <>
            <PageHeader
                className="site-page-header"

                title="Employee Details"

            />
            <div style={{ padding: 24 }}>
                <Space direction="vertical">
                    <Button style={{ marginBottom: 20 }} onClick={onClick} type="primary">BACK</Button>

                    <Text strong>Employee ID:</Text>
                    <Text>{data ? data?.id : ''}</Text>

                    <Text strong>First Name:</Text>
                    <Text>{data ? data?.firstName : ''}</Text>

                    <Text strong>Last Name:</Text>
                    <Text>{data ? data?.lastName : ''}</Text>

                    <Text strong>Salary:</Text>
                    <Text>{data ? data?.salary : ''}</Text>

                    <Text strong>Tax Amount:</Text>
                    <Text>{data ? data?.tax_amount : ''}</Text>

                </Space>
            </div>
        </>
    );
}

export default Details;
