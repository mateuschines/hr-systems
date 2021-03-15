import React, { useCallback, useEffect, useRef } from 'react'
import { PageHeader, Button, Form, Input } from 'antd'
import { useHistory } from 'react-router-dom'

import VMasker from 'vanilla-masker'

import axios from 'axios'

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 4 },
};

const PageForm: React.FC = () => {

    const [form] = Form.useForm();

    const history = useHistory();

    const onChangeSalary = useCallback((e: any) => {
        const value = e.target.value;

        let valueMask = VMasker.toMoney(value, {
            // Decimal precision -> "90"
            precision: 2,

            // Decimal separator -> ",90"
            separator: '.',

            // Number delimiter -> "12.345.678"
            delimiter: ',',

            // Money unit -> "R$ 12.345.678,90"
            unit: '$',

        });
        
        form.setFieldsValue(
            { salary: valueMask }
        );

    }, []);

    const onFinish = useCallback((values: any) => {

        values.salary = VMasker.toNumber(values.salary);

        const request = async () => {
            try {
                await axios.post("http://localhost:3333/employees", values);

                history.push("/");

            } catch (error) {
                console.log(error);
            }
        }

        request();
    }, []);

    const onReset = useCallback(() => {
        form.resetFields();
        history.push("/");
    }, [history]);

    return (
        <>
            <PageHeader
                className="site-page-header"
                title="Bank Employee Onboarding Form"
            />
            <div style={{ padding: 24 }}>
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>

                    <Form.Item name="firstName" label="First Name" rules={[{ required: false }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="lastName" label="Last Name" rules={[{ required: false }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="salary" label="Salary" rules={[{ required: false }]}>
                        <Input onChange={onChangeSalary} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            SUBMIT
                        </Button>
                        <Button style={{ marginLeft: 10 }} htmlType="button" onClick={onReset}>
                            CANCEL
                        </Button>

                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default PageForm;
