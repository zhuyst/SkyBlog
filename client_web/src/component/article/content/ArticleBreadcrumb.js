import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

class ArticleBreadcrumb extends React.Component {
  render() {
    const { classify, title } = this.props.article;

    return (
      <Breadcrumb>
        <LinkContainer to="/article">
          <Breadcrumb.Item>
                        博客文章
          </Breadcrumb.Item>
        </LinkContainer>
        <LinkContainer to={`/article/classify/${classify.id}`}>
          <Breadcrumb.Item>
            {classify.name}
          </Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>
          {title}
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    article: state.content.article,
  };
};

const ArticleBreadcrumbContainer = connect(
  mapStateToProps,
  null
)(ArticleBreadcrumb);

export default ArticleBreadcrumbContainer;
