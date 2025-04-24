import React from "react";
import TUTIocn1 from "../../assets/TUTIocn1.jpeg"
import "./loginPage.css";
import "./resetPage.css";

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
                  placeholder="email address"
                  type="email"
                />

                <div className="label-wrapper">
                  <div className="label">Password</div>
                </div>

                <button className="button">
                  <div className="text-wrapper">Log in</div>
                </button>
              </div>

              <div className="text-wrapper-2">forgot password?</div>
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