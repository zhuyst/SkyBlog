import React from 'react'
import {TransitionGroup} from "react-transition-group";
import {Alert, Badge, Panel} from "react-bootstrap";
import {connect} from "react-redux";

import Msg from './Msg'

import {MSG_PAGE_SIZE} from "../../Constant";
import {listMsg} from "../../action/msgboard/MsgBoardAction";
import FadeTransition from "../common/FadeTransition";
import Loading from "../common/Loading";

class MsgList extends React.Component{

    componentWillMount(){
        const {page,listMsg} = this.props;
        if(page.total === 0){
            listMsg(1);
        }
    }

    render(){
        const {listMsg,loading,page} = this.props;
        const {list,page_num,pages,total} = page;

        let content;
        if(loading){
            content = <Loading/>
        }
        else {
            let pager;
            if(total === 0){
                pager = (
                    <div className="pager" style={{
                        marginTop : 0
                    }}>
                        <Alert bsStyle="info" className="comment_pager">
                            &nbsp;&nbsp;还没人留过言，来发送第一条留言吧！&nbsp;&nbsp;
                        </Alert>
                    </div>
                )
            }
            else if(page_num === pages){
                pager = (
                    <div className="pager">
                        <Alert bsStyle="info" className="comment_pager">
                            &nbsp;&nbsp;已经没有更多留言啦！&nbsp;&nbsp;
                        </Alert>
                    </div>
                )
            }
            else {
                pager = (
                    <div className="pager">
                        <div className="more">
                            <div onClick={() => listMsg(page_num + 1)}>
                                <Alert bsStyle="warning" className="comment_pager">
                                    <p>
                            <span className="more_left">
                                <i className="fa fa-angle-double-down fa-lg"/>
                            </span>

                                        <i className="fa fa-toggle-down" />
                                        &nbsp;&nbsp;点击查看更多留言&nbsp;&nbsp;
                                        <i className="fa fa-toggle-down" />

                                        <span className="more_right">
                                <i className="fa fa-angle-double-down fa-lg"/>
                            </span>
                                    </p>
                                </Alert>
                            </div>
                        </div>
                    </div>
                )
            }

            content = [
                <TransitionGroup key={1}>
                    {
                        list.map(msg => (
                            <FadeTransition key={msg.id}>
                                <Msg msg={msg}/>
                            </FadeTransition>
                        ))
                    }
                </TransitionGroup>,
                <div key={2}>
                    {pager}
                </div>
            ]
        }

        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">
                        留言列表&nbsp;&nbsp;<Badge>{total}</Badge>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    {content}
                </Panel.Body>
            </Panel>
        )
    }
}

const mapStateToProps = state => {
    return {
        page : state.msg.page,
        loading : state.msg.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        listMsg : pageNum => {
            dispatch(listMsg(pageNum,MSG_PAGE_SIZE))
        }
    }
};

const MsgListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MsgList);

export default MsgListContainer