
import React from "react";
import LoginForm from "../components/Login/LoginForm";

const LoginPage = () => {
  return (
    <div className="login-page d-flex align-items-center justify-content-center vh-100">
      <div className="container row justify-content-center">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card card-custom mt-5 bg-dark text-light">
              <div className="card-body">
                <h2 className="card-title mb-4 text-center">
                  <strong>Log in to MusicApp</strong>
                </h2>
                <LoginForm />
                <div className="mt-3 text-center">
                  <p className="text">
                    <strong>Don't have an account?</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
