import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Col, Well } from 'react-bootstrap';

import FieldGroup from '../../../common/FieldGroup';
import { FORM_CLASSIFY } from '../../../../Constant';
import { insertClassify } from '../../../../action/article/ClassifyAction';

class NewClassify extends React.Component {
  render() {
    const { show, submitting, handleSubmit } = this.props;
    const className = show ? 'classify_content' : 'classify_content collapse';

    return (
      <div className={className}>
        <Well className="classify_well">
          <Col md={10} sm={12}>
            <FieldGroup
              name="name"
              type="text"
              label="分类名"
              placeholder="请输入分类名"
              disabled={submitting}
            />
          </Col>
          <Col md={2} smHidden xsHidden>
            {classifyButton(handleSubmit, false)}
          </Col>
          <Col sm={12} lgHidden mdHidden>
            {classifyButton(handleSubmit, true)}
          </Col>
        </Well>
      </div>
    );
  }
}

const classifyButton = (handleSubmit, sm) => {
  let props = {
    bsStyle: 'success',
    block: true,
    className: 'classify_button',
    onClick: handleSubmit,
  };

  if (sm) {
    props = {
      ...props,
      style: {
        marginTop: 0,
      },
    };
  }

  return (
    <Button {...props}>
            新增
    </Button>
  );
};

const validate = (values) => {
  const errors = {};
  const { name } = values;

  if (!name || name.length === 0) {
    errors.name = '分类名不能为空';
  }

  return errors;
};

const onSubmit = (values, dispatch) => {
  const { name } = values;
  const classify = {
    name,
  };

  dispatch(insertClassify(classify));
};

const NewClassifyForm = reduxForm({
  form: FORM_CLASSIFY,
  onSubmit,
  validate,
})(NewClassify);

const mapStateToProps = (state) => {
  return {
    show: state.classify.show,
  };
};

const NewClassifyContainer = connect(
  mapStateToProps,
  null
)(NewClassifyForm);

export default NewClassifyContainer;
