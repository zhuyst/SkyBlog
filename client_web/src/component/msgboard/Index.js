import React from 'react';
import { Col, Grid, Panel, Row } from 'react-bootstrap';

import MsgList from './MsgList';
import MsgSender from './MsgSender';

import '../../static/css/msgboard/msgboard.css';
import UserInfoTable from '../common/userinfo/UserInfoTable';
import { connect } from 'react-redux';

class Index extends React.Component {
  componentWillMount() {
    document.title = '留言板 - 青云的小窝';
  }

  render() {
    const login = this.props.login;

    return (
      <Grid fluid>
        <Row className="msg_board_main">
          <Col mdOffset={1} md={6} sm={12}>
            <MsgList />
          </Col>
          <Col md={4} sm={12}>
            {
                            login.ok
                            && (
                            <Col lgOffset={2} lg={8} mdOffset={1} md={10} sm={12}>
                              <Panel bsStyle="primary">
                                <Panel.Heading>
                                  <Panel.Title componentClass="h3">
                                            当前登录用户信息
                                  </Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                  <UserInfoTable user={login.user} />
                                </Panel.Body>
                              </Panel>
                            </Col>
                            )
                        }
            <Col md={12} sm={12}>
              <MsgSender />
            </Col>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const IndexContainer = connect(
  mapStateToProps,
  null
)(Index);

export default IndexContainer;
