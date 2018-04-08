import React, { Component } from "react";

import "./StatusMessage.scss";

class StatusMessage extends Component {
  render() {
    return (
      <div class="app-status">
        <img className="app-status-img" src={this.props.img} />
        <h2 className="app-status-msg app-status-msg--main">{this.props.mainMsg}</h2>
        <p className="app-status-msg">{this.props.subMsg}</p>
      </div> 
    );
  }
}

export default StatusMessage;
