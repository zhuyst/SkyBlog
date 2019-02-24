import React from 'react';
import { Label, Panel } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { setArticle } from '../../../action/article/ContentAction';

class Preview extends React.Component {
  render() {
    const { article, push } = this.props;
    const classify = article.classify;
    const classifyUrl = `/article/classify/${classify.id}`;

    return (
      <div className="preview">
        <Panel defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle className="hidden-xs">
              {article.title}
              <LinkContainer to={classifyUrl}>
                <Label className="preview_classify-xs">
                  {classify.name}
                </Label>
              </LinkContainer>
            </Panel.Title>
            <Panel.Title className="preview_classify-lg hidden-sm hidden-md hidden-lg">
              <LinkContainer to={classifyUrl}>
                <Label>
                  {classify.name}
                </Label>
              </LinkContainer>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <a onClick={() => push(article)}>
                <div className="preview_content">
                  <h3 className="preview_title">{article.title}</h3>
                  <p className="preview_sub_title">{article.sub_title}</p>
                  <p className="preview_preview">{article.content}</p>
                  <p className="preview_date">
发布时间 :
                    {article.create_date}
                  </p>
                </div>
              </a>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    push: (article) => {
      dispatch(setArticle(article));

      const path = `/article/content/${article.id}/full`;
      dispatch(push(path));
    },
  };
};

const PreviewContainer = connect(
  null,
  mapDispatchToProps
)(Preview);

export default PreviewContainer;
