import React from "react";
import history from "../../services/History";

class ConversationList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchUserName: "",
      isSearchEnabled: false,
      contactList: []
    };
    this.searchRef = React.createRef();
  }

  handleSearch = () => {
    let self = this;
    let shouldSearch = false;
    for (var i = 0; i < this.state.contactList.length; i++) {
      if (this.state.contactList[i].userName == this.searchRef.current.value) {
        shouldSearch = true;
        break;
      }
    }
    if (shouldSearch) {
      this.setState({
        isSearchEnabled: true,
        searchUserName: self.searchRef.current.value,
      });
    } else {
      this.setState({ isSearchEnabled: false, searchUserName: "" });
    }
  };

  render() {
    return (
      <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="sidebar-heading" id="userNameTxt">
          {this.props.fullName}
        </div>
        <div class="row">
          <input class="text col-8" ref={this.searchRef}></input>
          <div class="col-3" onClick={this.handleSearch}>
            <i class="fas fa-search fa-2x"></i>
          </div>
        </div>
        {!this.state.isSearchEnabled ? (
          <div class="list-group list-group-flush">
            {console.log(this.props)}
            {/* {this.props.contactList.map((user) => (
            <a
              class="list-group-item list-group-item-action bg-light"
              onClick={() =>
                history.push({
                  pathname:
                    "/user/" + this.props.userName + "/chat/" + user.userName,
                  state: { toUserName: user.userName, userName: this.props.userName },
                })
              }
            >
              {user.userName}
            </a>
          ))} */}
          </div>
        ) : (
          <div>
            <a
              class="list-group-item list-group-item-action bg-light"
              onClick={() =>
                history.push({
                  pathname:
                    "/user/" +
                    this.props.userName +
                    "/chat/" +
                    this.state.searchUserName,
                  state: {
                    toUserName: this.state.searchUserName,
                    userName: this.props.userName,
                  },
                })
              }
            >
              {console.log(this.state.searchUserName)}
              {this.state.searchUserName}
            </a>
          </div>
        )}
        <button
          type="button"
          class="btn btn-primary rounded-circle"
          id="createConvoBtn"
        >
          <i class="fas fa-comment-medical"></i>
        </button>
      </div>
    );
  }
}

export default ConversationList;
