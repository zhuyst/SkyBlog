import React from 'react'
import {push} from 'react-router-redux'
import {connect} from "react-redux";

class ErrorBoundary extends React.Component{

    componentDidCatch(){
        this.props.pushError();
    }

    render(){
        return this.props.children;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        pushError : () => {
            dispatch(push("/error"))
        },
    }
};

const ErrorBoundaryContainer = connect(
    null,
    mapDispatchToProps
)(ErrorBoundary);

export default ErrorBoundaryContainer