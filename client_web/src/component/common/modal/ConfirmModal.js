import React from 'react'
import {confirmable} from "react-confirm";
import {Button, Modal} from "react-bootstrap";

class ConfirmModal extends React.Component{
    render(){
        const {show,dismiss,proceed,cancel,confirmation} = this.props;

        return (
            <Modal show={show} onHide={dismiss}
                   bsSize="small" aria-labelledby="contained-modal-title-lg" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">确认</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {confirmation}
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={proceed}>确定</Button>
                    <Button onClick={cancel}>取消</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default confirmable(ConfirmModal)