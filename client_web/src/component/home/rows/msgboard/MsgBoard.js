import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link} from "react-router-dom";
import {Badge, Panel} from 'react-bootstrap'
import {connect} from "react-redux";

import {getLength} from "../Util";
import Msg from "./Msg";

class MsgBoard extends React.Component{
    render(){
        const page = this.props.page;
        const {list,total} = page;

        const MAX_LENGTH = 5;
        const length = getLength(list,MAX_LENGTH);

        const msgList = [];
        for(let i = 0;i < length;i++){
            const msg = list[i];
            msgList.push(
                <Msg key={msg.id} msg={msg}/>
            )
        }

        return(
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">
                        留言板&nbsp;&nbsp;<Badge>{total}</Badge>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <ReactCSSTransitionGroup
                        transitionName='fade'
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                        {msgList}
                    </ReactCSSTransitionGroup>
                    <Link className="more_link"
                          to="/msg_board">
                        查看更多留言
                    </Link>
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

const MsgBoardContainer = connect(
    mapStateToProps,
    null
)(MsgBoard);

export default MsgBoardContainer