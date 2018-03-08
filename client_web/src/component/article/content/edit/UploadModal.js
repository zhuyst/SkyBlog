import React from 'react'
import {Alert, Button, Modal, ProgressBar} from "react-bootstrap";
import {setUploadModalShow, uploadResponse} from "../../../../action/article/UploadAction";
import {connect} from "react-redux";
import {CopyToClipboard} from 'react-copy-to-clipboard';

import {Uploader, UploadField} from "@navjobs/upload/dist/index";
import {FAIL_RESULT, getToken, OSS_URL} from "../../../../Api";
import {error, success} from "../../../../action/common/NotifyAction";

class UploadModal extends React.Component{
    render(){
        const {show,response,copyUrl,
            onHide,uploadResponse} = this.props;

        let alert = null;
        if(response.ok){
            const url = response.url;
            alert = (
                <Alert bsStyle="info">
                    <p><strong>文件上传成功，文件路径为</strong></p>
                    <p><a id="url" href={url} target="_blank">{url}</a></p>
                    <br/>
                    <CopyToClipboard text={url} onCopy={copyUrl}>
                        <Button block>复制链接</Button>
                    </CopyToClipboard>
                </Alert>
            )
        }
        else if(response.ok === false){
            alert = (
                <Alert bsStyle="error">
                    <strong>{response.message}</strong>
                </Alert>
            )
        }

        return (
            <Modal show={show} onHide={onHide}
                   aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                        上传文件
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Uploader
                        request={{
                            fileName: 'file',
                            url: `${OSS_URL}/upload`,
                            method: 'POST',
                            headers: {
                                "Token": getToken(),
                            },
                            withCredentials: false,
                        }}
                        onComplete={({ response, status }) => uploadResponse(response,status)}
                        //upload on file selection, otherwise use `startUpload`
                        uploadOnSelection={true}
                    >
                        {({ onFiles, progress, complete }) => (
                            <div>
                                <UploadField onFiles={onFiles}
                                             containerProps={{
                                                 className: "upload_button"
                                             }}>
                                    <Button block bsStyle="primary"
                                            disabled={Boolean(progress)}>
                                        上传文件
                                    </Button>
                                </UploadField>
                                {
                                    progress && !complete &&
                                    <ProgressBar active now={progress} />
                                }
                                {
                                    complete &&
                                    <ProgressBar active now={100} bsStyle="success"/>
                                }
                            </div>
                        )}
                    </Uploader>
                    {alert}
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
        show : state.upload.uploadModal_show,
        response : state.upload.response
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onHide : () => {
            dispatch(setUploadModalShow(false))
        },
        uploadResponse : (response,status) => {
            let result;
            if(status === 200){
                dispatch(success("上传文件成功"));
                result = response;
            }
            else {
                dispatch(error("上传文件失败"));
                result = FAIL_RESULT
            }

            dispatch(uploadResponse(result))
        },
        copyUrl : () => {
            dispatch(success("复制链接成功"))
        }
    }
};

const UploadModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadModal);

export default UploadModalContainer

