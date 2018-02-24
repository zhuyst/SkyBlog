import React from 'react'
import {Button, Modal} from "react-bootstrap";
import {setUploadModalShow} from "../../../../action/article/ContentAction";
import {connect} from "react-redux";

class UploadModal extends React.Component{
    render(){
        const {show,onHide} = this.props;

        return (
            <Modal show={show} onHide={onHide} bsSize="small"
                   aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                        上传文件
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>&nbsp;关闭&nbsp;</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        show : state.content.uploadModal_show
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onHide : () => {
            dispatch(setUploadModalShow(false))
        }
    }
};

const UploadModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadModal);

export default UploadModalContainer

