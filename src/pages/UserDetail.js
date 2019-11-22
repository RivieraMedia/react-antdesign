import React from 'react';
import { Button, Card, Avatar, Descriptions } from 'antd';
const { Meta } = Card;

class UserDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }
    componentDidMount = () => {
        if (this.props.location.params === undefined) {
            console.log('user not found')
            this.props.history.goBack()
            return false
        }
        this.setState({ user: this.props.location.params.user })
    }
    back = () => {
        this.props.history.goBack()
    }
    render() {
        const { user } = this.state
        return (
            <div className="content-area">
                <Button onClick={this.back} type="dashed" >Back </Button>
                <br />
                <hr />
                {
                    user !== null &&
                    <Card
                    >
                        <Meta
                            avatar={<Avatar src={user._links.avatar.href} size='large' />}
                            title={user.first_name + ' ' + user.last_name}
                            description={user.address}
                        />
                        <br/>
                        <br/>
                        <Descriptions title="User Info" layout="vertical">
                            <Descriptions.Item label="Date of birth">{user.dob}</Descriptions.Item>
                            <Descriptions.Item label="Phone ">{user.phone}</Descriptions.Item>
                            <Descriptions.Item label="Address" span={2}>
                                {user.address}
                            </Descriptions.Item>
                            <Descriptions.Item label="Website"><a href={user.website}>{user.website}</a></Descriptions.Item>
                        </Descriptions>
                    </Card>
                }

            </div>
        )
    }
}
export default UserDetail