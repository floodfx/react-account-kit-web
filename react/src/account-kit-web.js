import React, { Component, PropTypes } from 'react';

class AccountKitWeb extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inited: false,
      appId: '',
      csrf: '',
      version: '',
      debug: process.env.NODE_ENV !== 'production' || props.debug,
    }
  }

  componentWillMount() {
    const script = document.createElement("script");
    script.src = "https://sdk.accountkit.com/en_US/sdk.js";
    document.body.appendChild(script);
  }

  componentDidMount() {
    this.initAccountKit();
  }

  componentWillUpdate(nextProps, nextState) {
    if(!this.state.inited && nextState.inited) {
      window.AccountKit_OnInteractive = () => {
          window.AccountKit.init({
            appId: nextState.appId,
            state: nextState.csrf,
            version: nextState.version,
            debug: this.state.debug
        })
      }
    }
  }

  initAccountKit() {
    this.props.client.init()
      .then((data) => {
        data.init.debug = this.state.debug;
        this.setState({
          inited:true,
          appId: data.init.appId,
          csrf: data.init.csrf,
          version: data.init.version
        })
        this.props.onInit(data, null);
      })
      .catch((error) => {
        this.props.onInit(null, error)
      });
  }

  render() {
    return null
  }

}

AccountKitWeb.defaultProps = {
  debug: false
};

AccountKitWeb.propTypes = {
  onInit: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  debug: PropTypes.bool
};



export default AccountKitWeb
