import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ReactMde, { ReactMdeCommands } from 'react-mde';
import { Button, ButtonGroup, Col, ControlLabel, FormGroup, Glyphicon, Row } from 'react-bootstrap';
import { change, Field, reduxForm } from 'redux-form';

import { FORM_ABOUT } from '../../Constant';
import { getAbout, setAbout, updateAbout } from '../../action/about/AboutAction';
import { setUploadModalShow } from '../../action/article/UploadAction';
import { confirm } from '../Util';

class AboutEditor extends React.Component {
  componentWillMount() {
    this.init();
  }

  componentDidUpdate() {
    this.init();
  }

    init = () => {
      const { about, setAboutForm } = this.props;
      setAboutForm(about);
    };

    submit = (data, back) => {
      const about = {
        ...data,
        content: data.content.text,
      };
      this.props.updateAbout(about, back);
    };

    render() {
      const { submitting, handleSubmit,
        goBack, showUploadModal } = this.props;

      return (
        <form>
          <Field name="content" component={editor} showUploadModal={showUploadModal} />
          <Row className="about_button">
            <Col>
              <ButtonGroup>
                <Button disabled={submitting}
                  bsStyle="success"
                  onClick={handleSubmit(data => this.submit(data, false))}
                >
                  <Glyphicon glyph="floppy-disk" />
                                &nbsp;&nbsp;保存&nbsp;
                </Button>
                <Button disabled={submitting}
                  bsStyle="success"
                  onClick={handleSubmit(data => this.submit(data, true))}
                >
                  <Glyphicon glyph="floppy-saved" />
                                &nbsp;&nbsp;保存并退出编辑&nbsp;
                </Button>
                <Button disabled={submitting}
                  bsStyle="primary"
                  onClick={goBack}
                >
                  <Glyphicon glyph="circle-arrow-left" />
                                &nbsp;&nbsp;放弃编辑并返回&nbsp;
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </form>
      );
    }
}

class editor extends React.Component {
  render() {
    const {
      input: { value, onChange },
      meta: { submitting },
      showUploadModal,
    } = this.props;

    const commands = ReactMdeCommands.getDefaultCommands();

    const uploadCommand = {
      icon: 'upload',
      tooltip:
                '上传文件',
      execute: (text, selection) => {
        showUploadModal();

        return {
          text,
          selection,
        };
      },
    };

    commands.push([uploadCommand]);

    return (
      <FormGroup>
        <ControlLabel>内容</ControlLabel>
        <ReactMde value={value}
          onChange={onChange}
          commands={commands}
          textAreaProps={{ disabled: submitting }}
          visibility={{ preview: false }}
        />
      </FormGroup>
    );
  }
}

const validate = (values) => {
  const errors = {};
  const { content } = values;

  if (!content || content.text.length === 0) {
    errors.content = '内容不能为空';
  }

  return errors;
};

const onChange = (values, dispatch) => {
  dispatch(setAbout(values));
};

const AboutEditorForm = reduxForm({
  form: FORM_ABOUT,
  validate,
  onChange,
})(AboutEditor);

const mapStateToProps = (state) => {
  return {
    about: state.about,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAboutForm: (about) => {
      dispatch(change(FORM_ABOUT, 'content', about.content));
    },
    updateAbout: (about, back) => {
      confirm('确定要更新关于吗？').then(() => {
        dispatch(updateAbout(about, back));
      });
    },
    goBack: () => {
      confirm('确定要放弃编辑吗？').then(() => {
        dispatch(getAbout());
        dispatch(push('/about'));
      });
    },
    showUploadModal: () => {
      dispatch(setUploadModalShow(true));
    },
  };
};

const AboutEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutEditorForm);

export default AboutEditorContainer;
