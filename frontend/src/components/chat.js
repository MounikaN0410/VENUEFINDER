import React, { Component } from "react";

class KommunicateChat extends Component {
  componentDidMount() {
    (function(d, m){
      var kommunicateSettings =
          {"appId":"3f52f9e9dedfc0755ad16ca5ff6c81490","popupWidget":true,"automaticChatOpenOnNavigation":true};
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }

  render() {
    return (
      <div>
        {/* <h1>Hello</h1> */}
      </div>
    );
  }
}

export default KommunicateChat;
    
