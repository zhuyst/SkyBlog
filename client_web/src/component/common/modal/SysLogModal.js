import React from 'react'
import {setSysLogModalShow} from "../../../action/common/ModalAction";
import {listSysLog} from "../../../action/syslog/SysLogAction";
import {FADE_ENTER, SYS_LOG_PAGE_SIZE} from "../../../Constant";
import {connect} from "react-redux";
import {Button, Label, Modal, Pager, Table} from "react-bootstrap";
import {CSSTransition, TransitionGroup} from "react-transition-group";

class SysLogModal extends React.Component{

    componentWillMount(){
        this.props.listSysLog(1)
    }

    render(){
        const {page,show,onHide,listSysLog} = this.props;
        const {total,page_num,pages} = page;

        const previousShow = (page_num !== 1);
        const nextShow = (page_num !== pages);

        return (
            <Modal show={show} onHide={onHide} bsSize="large"
                   aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                        系统日志&nbsp;<Label bsStyle="primary">&nbsp;{total}&nbsp;</Label>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped hover>
                        <thead>
                        <tr>
                            <th>操作人</th>
                            <th>操作类型</th>
                            <th>资源</th>
                            <th>方法名</th>
                            <th>操作时间</th>
                        </tr>
                        </thead>
                        <TransitionGroup component="tbody">
                            {
                                page.list.map(sys_log => (
                                    <CSSTransition
                                        classNames="fade"
                                        exit={false}
                                        timeout={{
                                            enter: FADE_ENTER
                                        }}
                                        key={sys_log.id}>
                                        <tr>
                                            <td>{sys_log.user.nickname}</td>
                                            <td>{sys_log.type}</td>
                                            <td>{sys_log.resource}</td>
                                            <td>{sys_log.method}</td>
                                            <td>{sys_log.create_date}</td>
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
                                        onClick={() => listSysLog(page_num - 1)}>
                                &larr; 上一页
                            </Pager.Item>
                        }
                        {
                            nextShow &&
                            <Pager.Item next
                                        onClick={() => listSysLog(page_num + 1)}>
                                下一页 &rarr;
                            </Pager.Item>
                        }
                    </Pager>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={() => listSysLog(page_num)}>
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
        show : state.navigation.modal.sysLogModal_show,
        page : state.sys_log
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onHide : () => {
            dispatch(setSysLogModalShow(false))
        },
        listSysLog : pageNum => {
            dispatch(listSysLog(pageNum,SYS_LOG_PAGE_SIZE))
        }
    }
};

const SysLogModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SysLogModal);

export default SysLogModalContainer