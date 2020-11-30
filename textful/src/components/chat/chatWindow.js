import React from "react";
import ConversationList from "./ConversationList";
import ConversationView from "./ConversationView";
import "./Chat.css";

export default class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      contactList: [],
    };
  }

  componentDidMount = () => {
    console.log(this.props);
    const url = "https://wbdv-textful-server.herokuapp.com/users/";
    const userName = this.props.match.params.userName;
    fetch(url + userName)
      .then((res) => res.json())
      .then((user) => {
        return this.setState({
          fullName: user.firstName + " " + user.lastName,
        });
      });

    fetch(url)
      .then((res) => res.json())
      .then((users) => {
        users.map((user) => {
          if (user.userName !== userName) {
            return this.setState({
              contactList: [...this.state.contactList, user.userName],
            });
          }
        });
      });
  };

  render() {
    return (
      <div class="d-flex" id="wrapper">
        <ConversationList
          fullName={this.state.fullName}
          contactList={this.state.contactList}
        />
        <ConversationView />
      </div>
    );
  }
}
