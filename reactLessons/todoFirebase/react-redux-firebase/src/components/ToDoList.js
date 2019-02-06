import "./ToDoList.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import ToDoListItem from "./ToDoListItem";
import {Col, Row, Icon, Button} from "react-materialize"

class ToDoList extends Component {
  state = {
    addFormVisible: false,
    addFormValue: ""
  };

  handleInputChange = event => {
    this.setState({ addFormValue: event.target.value });
  };

  handleFormSubmit = event => {
    const { addFormValue } = this.state;
    const { addToDo } = this.props;
    event.preventDefault();
    addToDo({ title: addFormValue });
    this.setState({ addFormValue: "" });
  };

  renderAddForm = () => {
    const { addFormVisible, addFormValue } = this.state;
    if (addFormVisible) {
      return (
        // <Row className="to-do-list-item">
        <Col s={10} className="offset-s1">
          <form onSubmit={this.handleFormSubmit}>
            <div className="to-do-list-item input-field">
                {<Icon className="prefix">note_add</Icon>}
              <input
                value={addFormValue}
                onChange={this.handleInputChange}
                id="toDoNext"
                type="text"
                placeholder="What To Do Next"
              />
            </div>
          </form>
        </Col>
        // </Row>
      );
    }
  };

  renderToDos() {
    const { data } = this.props;
    const toDos = _.map(data, (value, key) => {
      return <ToDoListItem key={key} todoId={key} todo={value} />;
    });
    if (!_.isEmpty(toDos)) {
      return toDos;
    }
    return (
      <div className="col s10 offset-s1 center-align">
        {<Icon>adb</Icon>}
        <h4>You have completed all the tasks</h4>
        <p>Start by clicking add button in the bottom of the screen</p>
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchToDos();
  }

  render() {
    const { addFormVisible } = this.state;
    return (
      <div className="to-do-list-container">
        <Row>
          {this.renderAddForm()}
          {this.renderToDos()}
        </Row>
        <div className="fixed-action-btn">
          <Button floating large teal darken-4
            onClick={() => this.setState({ addFormVisible: !addFormVisible })}
          >
            {addFormVisible ? (
                <Icon large>close</Icon>
            ) : (
                <Icon large>add</Icon>
            )}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(ToDoList);