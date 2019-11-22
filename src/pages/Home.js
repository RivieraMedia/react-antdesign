import React from 'react';
import { List, Button,  Avatar, Alert, Spin } from 'antd';
import { connect } from 'react-redux';
import { getAllUsersAction } from '../actions/getAllUser';
import SearchBox from '../components/SearchBox';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: null,
            searchStarted: false,
            currentPageNum : 1,
        }
    }
    handleUserSearch = async (value) => {
        const state = this.state
        state.searchStarted = true
        state.keyword = value
        this.setState(state)
        if(value !== undefined) {
            await this.props.dispatchGetUsers(this.state.keyword)
        }
    }
    onLoadMore = async () => {
        const {currentPage} = this.props
        let nextPage = currentPage + 1
        await this.props.dispatchGetUsers(this.state.keyword, nextPage)
    }
    viewUserDetail = (user) => {
        if(user === undefined || user.id === undefined) {
            return false
        }
        this.props.history.push({
            pathname: `/users/${user.id}`,
            params: { user: user}
        })
    }
    render() {
        const { users, loading, error, totalCount, errorMsg } = this.props
        const loadMore =
            users.length !== totalCount && !loading ? (
            <div
                style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
                }}
            >
                <Button onClick={this.onLoadMore} type="dashed" >Load more</Button>
            </div>
            ) : null;
        return (
            <div className='content-area'>
                <div className='search-area'>
                    <SearchBox handleInput={this.handleUserSearch} />
                    <hr />
                    <br />
                    <br />
                    {
                        users.length > 0 && !error &&
                        <List
                            itemLayout="horizontal"
                            dataSource={users}
                            loadMore={loadMore}
                            renderItem={item => (
                                <List.Item
                                    actions={[<Button key="list-loadmore-edit" type="primary" onClick={() => this.viewUserDetail(item)}>View details</Button>]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item._links.avatar.href}/>}
                                        title={item.first_name+' '+ item.last_name}
                                        description={item.address}
                                    />
                                </List.Item>
                            )}
                        />
                    }
                    {
                        loading &&
                        <div style={{textAlign: 'center'}}>
                            <Spin tip="Searching..."/>
                         </div>
                    }
                    {
                        error &&
                        <Alert message={errorMsg} type="error" />
                    }
                    {
                        !error && !users.length && this.state.searchStarted && !loading && 
                        <Alert message={'No result for the current keyword: ' + this.state.keyword} type="info" />
                    }
                    
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading: state.getAllUsers.loading,
        error: state.getAllUsers.error,
        errorMsg: state.getAllUsers.errorMsg,
        users: state.getAllUsers.users,
        perPage: state.getAllUsers.perPage,
        currentPage: state.getAllUsers.currentPage,
        totalCount: state.getAllUsers.totalCount
    }
};

const mapDispatchToProps = {
    dispatchGetUsers: (keyword, currentPage = 1) => getAllUsersAction(keyword, currentPage)
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
