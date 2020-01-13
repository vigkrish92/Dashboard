import React, { Component } from "react";

/* Import Components */
import CheckBox from "../components/CheckBox";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Select from "../components/Select";
import Button from "../components/Button";

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        name: "",
        reminder_object: "",
        date: null,
        email: "",
        mobile: "",
        message: ""
      },
      reminderObjects: ["Birthday", "Renewal Reminder"],
      genderOptions: ["Male", "Female", "Others"],
      skillOptions: ["Programming", "Development", "Design", "Testing"]
    };
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handleFullName = this.handleFullName.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleRemindDate = this.handleRemindDate.bind(this);
    // this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleFullName(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          name: value
        }
      }),
    );
  }

  handleAge(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          age: value
        }
      }),
    );
  }

  handleRemindDate(e) {
    let value = e.target.value;
    console.log(value);
    this.setState(
        prevState => ({
          newUser: {
            ...prevState.newUser,
            date: value
          }
        }),
    );
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          [name]: value
        }
      }),
    );
  }

  handleTextArea(e) {
    console.log("Inside handleTextArea");
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          message: value
        }
      }),
    );
  }

  // handleCheckBox(e) {
  //   const newSelection = e.target.value;
  //   let newSelectionArray;
  //
  //   if (this.state.newUser.skills.indexOf(newSelection) > -1) {
  //     newSelectionArray = this.state.newUser.skills.filter(
  //       s => s !== newSelection
  //     );
  //   } else {
  //     newSelectionArray = [...this.state.newUser.skills, newSelection];
  //   }
  //
  //   this.setState(prevState => ({
  //     newUser: { ...prevState.newUser, skills: newSelectionArray }
  //   }));
  // }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;
    console.log(userData);

    fetch("http://localhost:8081/reminder/creation", {
      method: "POST",
      body: JSON.stringify(userData),
    }).then(response => {
      response.json().then(data => {
        console.log(data.status);
      });
    });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newUser: {
        name: "",
        reminder_object: "",
        date: null,
        email: "",
        mobile: "",
        message: ""
      }
    });
  }

  render() {
    return (
        <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h3 style={{align: "center"}}>Reminder</h3>
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>
        <Input
          inputType={"text"}
          title={"Full Name"}
          name={"name"}
          value={this.state.newUser.name}
          placeholder={"Enter your name"}
          handleChange={this.handleFullName}
        />{" "}
        {/* Name of the user */}
        <Select
            title={"Reminder About"}
            name={"reminder_object"}
            options={this.state.reminderObjects}
            value={this.state.newUser.reminder_object}
            placeholder={"Enter what object to remind"}
            handleChange={this.handleInput}
        />{" "}
        {/* Reminder Object */}
        <Input
          inputType={"date"}
          name={"date"}
          title={"Reminder Date"}
          value={this.state.newUser.date}
          placeholder={"Enter your age"}
          handleChange={this.handleRemindDate}
        />{" "}
        {/* Reminder Date */}
        <Input
            inputType={"text"}
            title={"Email Id"}
            name={"email"}
            value={this.state.newUser.email}
            placeholder={"Enter your email Id"}
            handleChange={this.handleInput}
        />{" "}
        {/* Email Id of the user */}
        <Input
            inputType={"text"}
            title={"Mobile"}
            name={"mobile"}
            value={this.state.newUser.mobile}
            placeholder={"Enter your mobile number"}
            handleChange={this.handleInput}
        />{" "}
        {/* Mobile number of the user */}
        <TextArea
          title={"Message"}
          rows={10}
          value={this.state.newUser.message}
          name={"message"}
          handleChange={this.handleTextArea}
          placeholder={"Describe your message here"}
        />
        {/* Reminder message */}
        <Button
          action={this.handleFormSubmit}
          type={"primary"}
          title={"Submit"}
          style={buttonStyle}
        />{" "}
        {/*Submit */}
        <Button
          action={this.handleClearForm}
          type={"secondary"}
          title={"Clear"}
          style={buttonStyle}
        />{" "}
        {/* Clear the form */}
      </form>
        </div></div>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default FormContainer;

