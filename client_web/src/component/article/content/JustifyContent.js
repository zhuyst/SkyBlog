import React from 'react';
import { connect } from 'react-redux';

import { listComments, setArticle } from '../../../action/article/ContentAction';
import { getArticleInfo } from '../../../action/article/ContentAction';
import { initialArticle } from '../../../reducer/article/ContentReducer';

import CommentSender from './comment/CommentSender';
import CommentList from './comment/CommentList';
import Layout, { LAYOUT_JUSTIFY } from './Layout';
import ContentArea from './ContentArea';

import '../../../static/css/article/content.css';
import ArticleBreadcrumb from './ArticleBreadcrumb';
import { COMMENT_PAGE_SIZE } from '../../../Constant';
import ContentLoading from './ContentLoading';

class JustifyContent extends React.Component {
  componentWillMount() {
    const { setArticle, getArticle, article } = this.props;
    const id = this.props.match.params.id;

    if (id === 'new') {
      setArticle(initialArticle);
    } else if (article.id !== Number(id)) {
      getArticle(id);
    } else {
      listComments(id, 1);
    }
  }

  render() {
    let left;
    if (this.props.loading) {
      left = (
        <ContentLoading />
      );
    } else {
      left = [
        <ArticleBreadcrumb key={1} />,
        <div key={2} className="justify_content">
          <ContentArea key={2} />
        </div>,
      ];
    }

    const right = [
      <CommentList key={1} />,
      <CommentSender key={2} />,
    ];

    return (
      <Layout type={LAYOUT_JUSTIFY}
        contentArea={left}
        right={right}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    article: state.content.article,
    loading: state.content.article_loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getArticle: (id) => {
      dispatch(getArticleInfo(id));
    },
    setArticle: (article) => {
      dispatch(setArticle(article));
    },
    listComments: (id, pageNum) => {
      dispatch(listComments(id, pageNum, COMMENT_PAGE_SIZE));
    },
  };
};

const JustifyContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(JustifyContent);

export default JustifyContentContainer;
