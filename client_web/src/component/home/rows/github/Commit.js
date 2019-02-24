import React from 'react';

class Commit extends React.Component {
  render() {
    const commit = this.props.commit;

    return (
      <div className="comment">
        <div className="comment_content">
          <strong>
            <a href={commit.author_url} target="_blank">
              {commit.author}
            </a>
          </strong>
          <span>&nbsp;&nbsp;提交了&nbsp;&nbsp;</span>
          <a href={commit.commit_url} target="_blank">
            {commit.message}
          </a>
          <span>&nbsp;&nbsp;到项目中</span>
        </div>
      </div>
    );
  }
}

export default Commit;
