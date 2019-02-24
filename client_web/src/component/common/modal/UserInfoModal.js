import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import FieldGroup, { MODE_SUCCESS } from '../FieldGroup';

import { FORM_USERINFO } from '../../../Constant';
import { validate as validateInfo } from './RegisterModal';
import { updateUserInfo } from '../../../action/user/UsersAction';
import { setUserInfoModalShow } from '../../../action/common/ModalAction';

class UserInfoModal extends React.Component {
  render() {
    const { show, submitting,
      onHide, handleSubmit } = this.props;

    return (
      <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">修改个人信息</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <Field name="id" component="input" type="hidden" />
            <FieldGroup
              name="username"
              type="text"
              label="用户名"
              placeholder="请输入用户名"
              disabled
            />
            <FieldGroup
              name="nickname"
              type="text"
              label="昵称"
              placeholder="请输入昵称"
              mode={MODE_SUCCESS}
            />
            <FieldGroup
              name="password"
              type="password"
              label="密码"
              placeholder="请输入密码"
              mode={MODE_SUCCESS}
            />
            <FieldGroup
              name="repeatPassword"
              type="password"
              label="重复密码"
              placeholder="请再次输入密码"
              mode={MODE_SUCCESS}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={submitting} onClick={onHide}>&nbsp;关闭&nbsp;</Button>
            <Button disabled={submitting} type="submit" bsStyle="primary">&nbsp;修改&nbsp;</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

const validate = (values) => {
  const errors = validateInfo(values);
  const { password, repeatPassword } = values;

  if ((!password || password.length === 0)
        && (!repeatPassword || repeatPassword.length === 0)) {
    errors.password = null;
    errors.repeatPassword = null;
  }

  return errors;
};

const onSubmit = (values, dispatch) => {
  const user = {
    id: values.id,
    username: values.username,
    nickname: values.nickname,
    password: values.password,
  };

  dispatch(updateUserInfo(user));
};

const UserInfoModalForm = reduxForm({
  form: FORM_USERINFO,
  validate,
  onSubmit,
})(UserInfoModal);

const mapStateToProps = (state) => {
  return {
    show: state.navigation.modal.userInfoModal_show,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHide: () => {
      dispatch(setUserInfoModalShow(false));
    },
  };
};

const UserInfoModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoModalForm);

export default UserInfoModalContainer;
