import axios from "axios";
import React, { Component } from "react";

const initialCharge = {
  distance: 0,
  charge: 0,
};

export default class delieverycharge extends Component {
  constructor(props) {
    super(props);
    this.state = initialCharge;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    axios.get(`http://localhost:8020/load/amount/${this.props.match.params.id}/${this.state.distance}`)
      .then((response) => {
        console.log(response.data)
        this.setState({ charge: response.data.amount });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div class="mb-3">
            <label htmlFor="exampleFormControlInput1" class="form-label">
              Distance (KM)
            </label>
            <input
              type="Number"
              className="form-control"
              id="distance"
              //state name
              name="distance"
              placeholder="Distance"
              value={this.state.distance}
              onChange={this.onChange}
            />
          </div>
          <div className="mt-5">
            <button type="submit" className="btn btn-primary">
              Calculate Charge
            </button>
          </div>
          <input
            type="Number"
            className="form-control"
            id="charge"
            //state name
            name="charge"
            value={this.state.charge}
            onChange={this.onChange}
            disabled
          />
        </form>
      </div>
    );
  }
}
