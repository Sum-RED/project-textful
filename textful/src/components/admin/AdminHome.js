import React from "react";
import "./AdminHome.css";
import history from "../../services/History";
import NavBar from "../NavBar";
import { Container, Table, Button } from "react-bootstrap";
import * as sessionMgmt from "../../services/SessionHandler";
import { Redirect } from "react-router-dom";

export default class AdminHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      userList: [],
      searchValue: "",
    };
  }

  componentDidMount = () => {
    const url = "https://wbdv-textful-server.herokuapp.com/users/";

    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((users) =>
        users.map((user) => {
          return this.setState({ userList: [...this.state.userList, user] });
        })
      );
  };

  handleChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
    console.log(this.state.searchValue);
  };

  goToProfile = (user) => {
    history.push("/profile/" + user.userName, user);
  };

  deleteUser = (userId) => {
    let self = this;
    fetch("https://cs5200-sp2020-server.herokuapp.com/users/" + userId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      let userObj = self.state.userList.find(
        (element) => element._id === userId
      );
      let indexOfUser = self.state.userList.indexOf(userObj);
      let userArr = self.state.userList;
      userArr.splice(indexOfUser, 1);
      self.setState({ userList: userArr });
    });
  };

  render() {
    if (!sessionMgmt.anyValidSession()) return <Redirect to="/login" />;
    let filteredList = this.state.userList.filter(
      (userObj) => userObj.userName !== sessionMgmt.getUserName()
    );
    const userContent = filteredList.map((userObj) => (
      <tr>
        <td>{userObj._id}</td>
        <td>{userObj.firstName}</td>
        <td>{userObj.lastName}</td>
        <td>{userObj.userName}</td>
        <td>
          <Button
            variant="primary"
            onClick={() => this.deleteUser(userObj._id)}
          >
            Delete User
          </Button>
        </td>
      </tr>
    ));
    return (
      <Container>
        <NavBar userName={sessionMgmt.getUserName()} showSearch={true} />
        <h2>Welcome {sessionMgmt.getUserName()}!</h2>
        <Button variant="primary" onClick={() => history.push("/register")}>
          Create User
        </Button>
        <Table striped bordered hove>
          <thead>
            <th>User Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Name</th>
            <th>Actions</th>
          </thead>
          <tbody>{userContent}</tbody>
        </Table>
      </Container>
    );
  }
}
