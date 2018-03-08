import React from 'react'
import {Button, Label, Modal, Pager, Table} from "react-bootstrap";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {ACCESS_LOG_PAGE_SIZE, FADE_ENTER} from "../../../Constant";
import {connect} from "react-redux";
import {setAccessLogModalShow} from "../../../action/common/ModalAction";
import {listAccessLog} from "../../../action/log/AccessLogAction";

class AccessLogModal extends React.Component{

    componentWillMount(){
        this.props.listAccessLog(1)
    }

    render(){
        const {page,show,onHide,listAccessLog} = this.props;
        const {total,page_num,pages} = page;

        const previousShow = (page_num !== 1);
        const nextShow = (page_num !== pages);

        return (
            <Modal show={show} onHide={onHide} bsSize="large"
                   aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                        访问日志&nbsp;<Label bsStyle="primary">&nbsp;{total}&nbsp;</Label>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped hover>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>IP地址</th>
                            <th>访问人</th>
                            <th>访问时间</th>
                        </tr>
                        </thead>
                        <TransitionGroup component="tbody">
                            {
                                page.list.map(access_log => (
                                    <CSSTransition
                                        classNames="fade"
                                        exit={false}
                                        timeout={{
                                            enter: FADE_ENTER
                                        }}
                                        key={access_log.id}>
                                        <tr>
                                            <td>{access_log.id}</td>
                                            <td>{access_log.ip}</td>
                                            <td>{access_log.user ? access_log.user.nickname : "匿名用户"}</td>
                                            <td>{access_log.access_date}</td>
                                        </tr>
                                    </CSSTransition>
                                ))
                            }
                        </TransitionGroup>
                    </Table>
                    <div className="pager_message">
                        当前为第{page_num}页，共有{pages}页
                    </div>
                    <Pager>
                        {
                            previousShow &&
                            <Pager.Item previous
                                        onClick={() => listAccessLog(page_num - 1)}>
                                &larr; 上一页
                            </Pager.Item>
                        }
                        {
                            nextShow &&
                            <Pager.Item next
                                        onClick={() => listAccessLog(page_num + 1)}>
                                下一页 &rarr;
                            </Pager.Item>
                        }
                    </Pager>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={() => listAccessLog(page_num)}>
                        &nbsp;刷新&nbsp;
                    </Button>
                    <Button onClick={onHide}>&nbsp;关闭&nbsp;</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        show : state.navigation.modal.accessLogModal_show,
        page : state.access_log.page
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onHide : () => {
            dispatch(setAccessLogModalShow(false))
        },
        listAccessLog : pageNum => {
            dispatch(listAccessLog(pageNum,ACCESS_LOG_PAGE_SIZE))
        }
    }
};

const AccessLogModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccessLogModal);

export default AccessLogModalContainer