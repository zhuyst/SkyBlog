import React from 'react';
import { Button, Col, Glyphicon, Grid, Panel, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route, withRouter } from 'react-router-dom';

import AboutLoading from './AboutLoading';
import Markdown from '../common/markdown/Markdown';

import { getAbout } from '../../action/about/AboutAction';
import AboutEditor from './AboutEditor';

import '../../static/css/about/about.css';

class Index extends React.Component {
  componentWillMount() {
    document.title = '关于 - 青云的小窝';

    const { about, getAbout } = this.props;
    if (about.content.text === '') {
      getAbout();
    }
  }

  render() {
    const { about, management, editing, editAbout } = this.props;
    const { content, loading } = about;
    const path = this.props.match.path;

    let body;
    if (loading) {
      body = (
        <AboutLoading />
      );
    } else {
      body = [];
      if (management && !editing) {
        body.push(
          <Button key={1}
            bsStyle="primary"
            className="about_edit_button"
            onClick={editAbout}
          >
            <Glyphicon glyph="edit" />
                        &nbsp;&nbsp;编辑&nbsp;
          </Button>
        );
      }
      body.push(
        <Markdown key={2} text={content.text} />
      );
    }

    return (
      <div className="about_main">
        {
                    management
                    && <Route exact strict path={`${path}/edit`} component={editor} />
                }
        <Grid fluid>
          <Row>
            <Col md={8} mdOffset={2} sm={12}>
              <Panel>
                <Panel.Body>
                  {body}
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const editor = () => {
  return (
    <Row>
      <Col md={8} mdOffset={2} sm={12}>
        <AboutEditor />
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  const pathname = state.router.location.pathname;
  const editing = pathname === '/about/edit';

  return {
    about: state.about,
    management: state.login.management,
    pathname,
    editing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAbout: () => {
      dispatch(getAbout());
    },
    editAbout: () => {
      dispatch(push('/about/edit'));
    },
  };
};

const IndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);

export default withRouter(IndexContainer);
