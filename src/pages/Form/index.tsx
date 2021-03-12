import React, { useCallback, useState } from 'react'
import { PageHeader, Button, Form, Input } from 'antd'
import { useHistory } from 'react-router-dom';

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 4 },
};

const PageForm: React.FC = () => {

    const [form] = Form.useForm();

    const [salary, setSalary] = useState<any>([]);

    const history = useHistory();

    const onChangeSalary = useCallback((e: any) => {
        const value = e.target.value;
        const regex = /^[0-9\.\,0-9]*$/

        if (regex.test(value)) {
            setSalary(value)
            form.setFieldsValue(
                { salary: value }
            );
        } else {
            form.setFieldsValue(
                { salary: salary }
            );
        }
    }, [salary]);

    const onFinish = useCallback((values: any) => {
        console.log(values);
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
