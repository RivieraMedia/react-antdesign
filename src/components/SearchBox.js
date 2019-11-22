import React from 'react';
import { Input } from 'antd';
import PropsTypes from 'prop-types';
const { Search } = Input;
class SearchBox extends React.Component {
    render() {
        return (
            <Search placeholder="Search the users here ..." onSearch={this.props.handleInput} enterButton />
        )
    }
}
SearchBox.propTypes = {
    handleInput: PropsTypes.func.isRequired
}
export default SearchBox