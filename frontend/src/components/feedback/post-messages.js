import React from "react";
import {connect} from "react-redux";
import * as actions from "../../actions/post-messages";
import {Typography} from "@material-ui/core";
import PostMessageForm from "./post-message-form";
import Messages from "./messages";
import {message, Spin} from "antd";

class PostMessages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      feedbacks: [],
      loading: false
    };
  }

  onDelete = item => {
    this.setState({loading: true});
    fetch('/api/feedback/delete-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({_id: item._id}),
    })
      .then((response) => {
        this.setState({loading: false});
        if (response.status !== 200) {
          throw new Error(response.statusText.toString())
        }
        return response.json()
      })
      .then(() => {
        const feedbacks = this.state.feedbacks;
        feedbacks.splice(feedbacks.indexOf(item), 1);
        this.setState({feedbacks});
        message.success({
          content: 'Feedback successfully deleted..!',
          style: {
            marginTop: '90vh',
          },
        })
      })
      .catch(() => {
        message.error({
          content: 'Error deleting feedbacks..!',
          style: {
            marginTop: '90vh',
          },
        })
        this.setState({loading: false});
      });
  }

  getFeedbacks = (_id) => {
    this.setState({loading: true});
    console.log(this.props);
    fetch('/api/feedback/get-feedbacks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({_id}),
    })
      .then((response) => {
        this.setState({loading: false});
        if (response.status !== 200) {
          throw new Error(response.statusText.toString())
        }
        return response.json()
      })
      .then(data => {
        this.setState({feedbacks: data});
      })
      .catch(() => {
        message.error({
          content: 'Error loading feedbacks..!',
          style: {
            marginTop: '90vh',
          },
        })
        this.setState({loading: false});
      });
  }

  sendFeedback = (value) => {
    this.setState({loading: true});
    value._id = this.props._id;
    fetch('/api/feedback/send-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
      .then((response) => {
        this.setState({loading: false});
        if (response.status !== 200) {
          throw new Error(response.statusText.toString())
        }
        return response.json()
      })
      .then(data => {
        message.success({
          content: 'Feedback sent successfully..!',
          style: {
            marginTop: '90vh',
          },
        })
        value.new = true;
        value._id = data._id
        this.setState(oldState => ({feedbacks: [value, ...oldState.feedbacks]}));
      })
      .catch(() => {
        message.error({
          content: 'Error sending the feedback..!',
          style: {
            marginTop: '90vh',
          },
        })
        this.setState({loading: false});
      });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps._id) {
      this.getFeedbacks(nextProps._id);
    }
  }

  render() {
    return (

      <div className="container container-md">

        <div className="row mx-0 mb-3 px-0">
          <Typography variant="h6" className="fw-bold">Feedback</Typography>
        </div>

        <Spin
          size='large'
          tip='Loading...'
          spinning={this.state.loading}
          style={{minHeight: '200px'}}
        >
          <div className="row">
            <div className="col-md-4 mx-0 p-0">
              <PostMessageForm _id={this.props._id} sendFeedback={this.sendFeedback}/>
            </div>

            <div className="col-md-8 mx-0 p-0">
              <Messages feedbacks={this.state.feedbacks} deleteFeedback={this.onDelete}/>
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  postMessageList: state.postMessage.list
})

const mapActionToProps = {
  fetchAllPostMessages: actions.fetchAll,
  deletePostMessage: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(PostMessages);
