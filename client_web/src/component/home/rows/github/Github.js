import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Commit from './Commit';
import { GITHUB_PAGE_SIZE, SKY_BLOG_URL } from '../../../../Constant';
import FadeTransition from '../../../common/FadeTransition';
import { listCommits } from '../../../../action/github/GithubAction';
import Loading from '../../../common/Loading';

class Github extends React.Component {
  componentWillMount() {
    const { commits, listCommits } = this.props;
    if (commits.length === 0) {
      listCommits();
    }
  }

  render() {
    const { loading, commits } = this.props;

    const content = loading
      ? <Loading />
      : [
        <TransitionGroup key={1}>
          {
                        commits.map(commit => (
                          <FadeTransition key={commit.sha}>
                            <Commit commit={commit} />
                          </FadeTransition>
                        ))
                    }
        </TransitionGroup>,
        <a key={2}
          className="more_link"
          href={SKY_BLOG_URL}
          target="_blank"
        >
                在Github上查看项目
        </a>,
      ];

    return (
      <Panel bsStyle="primary">
        <LinkContainer to={SKY_BLOG_URL}>
          <Panel.Heading className="rows_title">
            <Panel.Title componentClass="h3">
                            SkyBlog项目动态
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
    commits: state.github.commits,
    loading: state.github.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listCommits: () => {
      dispatch(listCommits(GITHUB_PAGE_SIZE));
    },
  };
};

const GithubContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Github);

export default GithubContainer;
