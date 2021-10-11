import React from "react";
import {Paper} from "@material-ui/core";
import {List, Avatar} from "antd";

import profilePicture from '../../img/default-profile-picture.jpg';

const Messages = (props) => {

  return (
    <Paper className="mb-3 mx-1" style={{padding: '10px'}}>
      <h6>User feedbacks</h6>
      <List
        itemLayout="horizontal"
        dataSource={props.feedbacks}
        renderItem={item => (
        <List.Item
          style={item.new ? {background: "rgb(255, 255, 235)"} : {}}
          actions={[item.new ? <a key="delete-message"><i onClick={() => {props.deleteFeedback(item)}} className="fa fa-trash" /></a> : <></>]}
          className="px-2">
          <List.Item.Meta
            avatar={<Avatar src={profilePicture} />}
            title={<span>{item.name}</span>}
            description={item.feedback}
          />
        </List.Item>
      )} />
    </Paper>
  )

}

export default Messages;
