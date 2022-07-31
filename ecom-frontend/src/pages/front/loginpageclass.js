import React from "react";
//every component must be child of react component
class LoginPage extends React.Component {
  //constructor pailaa lekhnai parthyo ray.aile naparne. tara raakhe ramro
  constructor(props) {
    super(props); //aafno parent lai call gareko
  }
  //class maa props pass gardaa constructor baata pass garinxa
  //super maa ni props hunai parxa

  //yo hunai parxa.
  render = () => {
    return "Login Page " + this.props.text;
  };
}

export default LoginPage;
