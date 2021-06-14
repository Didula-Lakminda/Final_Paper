import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Final Paper
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-link" aria-current="page" to="/">
                  Vehicles
                </Link>
                <Link className="nav-link" to="/create-vehicle">
                  Add Vehicle
                </Link>
                <Link className="nav-link" to="/create-load">
                  Add Load
                </Link>
                {/* <Link class="nav-link" to="/select-category">
                  Check Rent
                </Link> */}
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
