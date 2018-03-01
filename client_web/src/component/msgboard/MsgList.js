import React from 'react'
import {TransitionGroup} from "react-transition-group";
import {Badge, Panel} from "react-bootstrap";
import {connect} from "react-redux";

import Msg from './Msg'

import {MSG_PAGE_SIZE} from "../../Constant";
import {listMsg} from "../../action/msgboard/MsgBoardAction";
import FadeTransition from "../common/FadeTransition";
import Loading from "../common/Loading";
import Pager from "./Pager";

class MsgList extends React.Component{

    componentWillMount(){
        const {page,listMsg} = this.props;
        if(page.total === 0){
            listMsg(1);
        }
    }

    render(){
        const {listMsg,loading,page} = this.props;
        const {list,page_num,total} = page;

        let content;
        if(page.total === 0 && loading){
            content = <Loading/>
        }
        else {
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
                <Pager key={2} page={page} loading={loading}
                       onClick={() => listMsg(page_num + 1)}/>
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