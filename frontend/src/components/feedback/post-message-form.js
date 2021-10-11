import React, {useState} from "react";
import {Button, Paper} from "@material-ui/core";
import {connect} from "react-redux";
import * as actions from "../../actions/post-messages";
import {Form, Input, message} from "antd";
import TextArea from "antd/es/input/TextArea";

const PostMessageForm = (props) => {

  const [form] = Form.useForm();

  const onSubmit = (value) => {
    props.sendFeedback(value);
    form.setFieldsValue({name: '', feedback: ''});
  }

  const demo = () => {
    form.setFieldsValue({name: 'Sirimal Perera', feedback: 'This is a sample feedback.'})
  }

  return (
    <Paper className="mb-3 mx-1">

      <Form
        layout='vertical'
        name='productForm'
        form={form}
        onFinish={onSubmit}
        autoComplete='off'
        style={{padding: "10px"}}
      >

        <h6>Send your feedback</h6>

        <Form.Item
          name='name'
          label='Name'
          rules={[{required: true, message: 'This filed is required.'}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          name='feedback'
          label='Feedback'
          rules={[{required: true, message: 'This filed is required.'}]}
        >
          <TextArea/>
        </Form.Item>

        <div className="row mx-0">
          <div className="col-12 mx-0 px-0">
            <Button type="submit" color="primary" variant="contained">Send Feedback</Button>
            <Button type="button" color="default" variant="outlined" className="mx-1" onClick={demo}>Demo</Button>
          </div>
        </div>

      </Form>

    </Paper>
  );
}


const mapStateToProps = state => ({
  postMessageList: state.postMessage.list
})

const mapActionToProps = {
  createPostMessage: actions.create,
  updatePostMessage: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(PostMessageForm);
