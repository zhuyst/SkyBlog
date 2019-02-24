import React from 'react';
import { Alert } from 'react-bootstrap';

class Pager extends React.Component {
  render() {
    const { page, loading, onClick } = this.props;
    const { total, page_num, pages } = page;

    if (loading) {
      return (
        <Alert bsStyle="warning">
          <p>
            <span className="more_left">
              <i className="fa fa-lg fa-spinner fa-spin" />
            </span>

            <i className="fa fa-lg fa-spinner fa-spin" />
                        &nbsp;&nbsp;加载中...&nbsp;&nbsp;
            <i className="fa fa-lg fa-spinner fa-spin" />

            <span className="more_right">
              <i className="fa fa-lg fa-spinner fa-spin" />
            </span>
          </p>
        </Alert>
      );
    }
    if (total === 0) {
      return (
        <Alert bsStyle="info">
                    &nbsp;&nbsp;还没有文章，快来发布一个吧&nbsp;&nbsp;
        </Alert>
      );
    }
    if (page_num === pages) {
      return (
        <Alert bsStyle="info">
                    &nbsp;&nbsp;已经没有更多文章啦！&nbsp;&nbsp;
        </Alert>
      );
    }

    return (
      <div className="more">
        <div onClick={onClick}>
          <Alert bsStyle="warning">
            <p>
              <span className="more_left">
                <i className="fa fa-angle-double-down fa-lg" />
              </span>

              <i className="fa fa-toggle-down" />
                                &nbsp;&nbsp;点击查看更多文章&nbsp;&nbsp;
              <i className="fa fa-toggle-down" />

              <span className="more_right">
                <i className="fa fa-angle-double-down fa-lg" />
              </span>
            </p>
          </Alert>
        </div>
      </div>
    );
  }
}

export default Pager;
