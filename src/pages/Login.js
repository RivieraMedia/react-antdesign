import React from 'react';
import { Input, Button, Typography, Card, Form, Icon } from 'antd';
const { Title } = Typography;
const bearToken = 'dNMVUMRnpIwdBH7r3AlCLBOO0V7ow1S61Kq_';
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }
    onChangeInput = (type, value) => {
        this.setState({ [type]: value })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                localStorage.setItem('token', bearToken)
                this.props.history.push('/')
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className="register-area">
                <Card>
                    <Title level={3}>Sign In</Title>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email Address"
                                    type={'email'}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                {'Sign In'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Login)