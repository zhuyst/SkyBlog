import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { Badge, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';

import { LinkContainer } from 'react-router-bootstrap';
import { getLength } from '../Util';
import Msg from './Msg';
import FadeTransition from '../../../common/FadeTransition';
import { listMsg } from '../../../../action/msgboard/MsgBoardAction';
import { MSG_PAGE_SIZE } from '../../../../Constant';
import Loading from '../../../common/Loading';

class MsgBoard extends React.Component {
  componentWillMount() {
    const { listMsg, page } = this.props;
    if (page.total === 0) {
      listMsg(1);
    }
  }

  render() {
    const { loading, page } = this.props;
    const { list, total } = page;

    const MAX_LENGTH = 5;
    const length = getLength(list, MAX_LENGTH);

    const msgList = [];
    for (let i = 0; i < length; i++) {
      const msg = list[i];
      msgList.push(
        <FadeTransition key={msg.id}>
          <Msg msg={msg} />
        </FadeTransition>
      );
    }

    const url = '/msg_board';

    const content = loading
      ? <Loading />
      : [
        <TransitionGroup key={1}>
          {msgList}
        </TransitionGroup>,
        <Link key={2}
          className="more_link"
          to="/msg_board"
        >
                    查看更多留言
        </Link>,
      ];

    return (
      <Panel bsStyle="primary">
        <LinkContainer to={url}>
          <Panel.Heading className="rows_title">
            <Panel.Title componentClass="h3">
                            留言板&nbsp;&nbsp;
              <Badge>{total}</Badge>
            </Panel.Title>
          </Panel.Heading>
        </LinkContainer>
        <Panel.Body>
          {content}
        </Panel.Body>
      </Panel>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.msg.page,
    loading: state.msg.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listMsg: (pageNum) => {
      dispatch(listMsg(pageNum, MSG_PAGE_SIZE));
    },
  };
};

const MsgBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MsgBoard);

export default MsgBoardContainer;
