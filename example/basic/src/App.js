import React, { Component } from 'react';
import { AccountKitWeb, AccountKitWebClient } from 'react-account-kit-web';

class App extends Component {
  constructor(props) {
    super(props);
    this.client = new AccountKitWebClient("http://localhost:8080/graphql");
    this.state = {
      inited: false,
      type: "Phone"
    };
  }

  onInit = (initData, error) => {
    console.log("Account Kit Inited", initData, error);
    if(error) {
      this.setState({error: error});
    } else {
      this.setState({
        inited: true
      });
    }
  }

  auth = (csrfNonce, authCode) => {
    this.client.auth(csrfNonce, authCode)
      .then((data) => {
        console.log("Account Kit Auth", data);
      })
      .catch(error => this.setState({error: error}));
  }

  onRadioChange = (e) =>  {
    this.setState({
      type: e.target.value
    })
  }

  onChange = (e) =>  {
    this.setState({
      value: e.target.value
    })
  }

  onClick = (e) => {
    console.log(this.state)
    if(this.state.inited) {
      if(this.state.type === "Phone") {
        this.client.phoneLogin(this.state.value.substring(0,2),this.state.value.substring(2))
          .then((data) => {
            console.log("phone login", data)
            const {csrfNonce, authCode} = data;
            this.auth(csrfNonce, authCode);
          })
          .catch((error) => {
            console.log("error", error)
            this.setState({error: error.status})
          })
      } else {
        this.client.emailLogin(this.state.value)
          .then((data) => {
            console.log("email login", data)
            const {csrfNonce, authCode} = data;
            this.auth(csrfNonce, authCode);
          })
          .catch((error) => {
            console.log("error", error)
            this.setState({error: error.status})
          })
      }
    }
  }

  render() {
    return (
      <div>
        <h2>Login with Account Kit</h2>
        {this.state.error &&
          <p>Error: {this.state.error}</p>
        }
        <input defaultChecked type="radio" name="loginType" value="Phone" onChange={this.onRadioChange}/>Phone <br />
        <input type="radio" name="loginType" value="Email" onChange={this.onRadioChange}/>Email <br />
        <input type="text" onChange={this.onChange}/><br />
        <button type="button" onClick={this.onClick}>Login</button>

        <AccountKitWeb
          onInit={this.onInit}
          client={this.client}
          debug={true}
        />
      </div>
    );
  }

}

export default App;
