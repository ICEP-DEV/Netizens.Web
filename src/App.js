//import logo from './logo.svg';
//import './App.css';

//function App() {
  //return (
    //<div className="App">
      //<header className="App-header">
        ////<img src={logo} className="App-logo" alt="logo" />
        //<p>
          //Edit <code>src/App.js</code> and save to reload.
        //</p>
       // <a
          //className="App-link"
          //href="https://reactjs.org"
          //target="_blank"
          //rel="noopener noreferrer"
        //>
          //Learn React
        //</a>
      //</header>
    //</div>
  //);
//}

//export default App;

import React from "react";
import TUTIocn1 from "./TUTIocn1.jpeg";
import "./login_front_style.css";

export const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="div">
        <div className="group">
          <div className="content">
            <div className="overlap-group">
              <div className="input-and-button">
                <input
                  className="field"
                  placeholder="Email address"
                  type="email"
                />

                <div className="label-wrapper">
                  <div className="label">Password</div>
                  <input
                    className="field"
                    placeholder="Password"
                    type="email"
                  />
                </div>

                <button className="button">
                  <div className="text-wrapper">Log in</div>
                </button>
              </div>

              <div className="text-wrapper-2">Forgot password?</div>
            </div>

            <div className="text-wrapper-3">Login</div>
          </div>
        </div>

        <img className="TUT-iocn" alt="Tut iocn" src={TUTIocn1} />

        <div className="text-wrapper-4">We empower people.</div>
      </div>
    </div>
  );
};
export default LoginPage;
