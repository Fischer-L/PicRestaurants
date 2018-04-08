import React, { Component } from "react";

import "./StatusMessage.scss";

class StatusMessage extends Component {
  render() {
    let imgClass = "app-status-img";
    if (this.props.useLoading) {
      imgClass += " app-loading";
    }
    return (
      <div className="app-status">
        <img className={imgClass} src={this.props.img} />
        <h2 className="app-status-msg app-status-msg--main">{this.props.mainMsg}</h2>
        <p className="app-status-msg">{this.props.subMsg}</p>
      </div> 
    );
  }
}

export default StatusMessage;
