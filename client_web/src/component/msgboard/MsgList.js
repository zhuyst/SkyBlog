import React from 'react'
import {Alert, Badge, Panel} from "react-bootstrap";
import {connect} from "react-redux";

import Msg from './Msg'

import {MSG_PAGE_SIZE} from "../../Constant";
import {listMsg} from "../../action/msgboard/MsgBoardAction";

class MsgList extends React.Component{

    componentWillMount(){
        this.props.listMsg(1);
    }

    render(){
        const {listMsg,page} = this.props;
        const {list,page_num,pages,total} = page;

        let msgList = [];
        list.forEach(msg => {
            msgList.push(
                <Msg key={msg.id} msg={msg}/>
            )
        });

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

        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">
                        留言列表&nbsp;&nbsp;<Badge>{total}</Badge>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    {msgList}
                    {pager}
                </Panel.Body>
            </Panel>
        )
    }
}

const mapStateToProps = state => {
    return {
        page : state.msg.page
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