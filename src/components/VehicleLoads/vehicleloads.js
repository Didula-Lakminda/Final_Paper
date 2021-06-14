import React, { Component } from "react";
import axios from "axios";

const vehicleLoadInitial = {
  loads: [],
  totalAmount: 0,
};

export default class vehicleloads extends Component {
  constructor(props) {
    super(props);
    this.state = vehicleLoadInitial;
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8020/vehicle/${this.props.match.params.id}`)
      .then((response) => {
        console.log(response.data.loads);
        this.setState({ loads: response.data.loads });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

navigateToChargePage(e, loadId) {
  window.location = `/delievery-charge/${loadId}`
}

  render() {
    return (
      <div>
        <div class="container">
          <h1>Vehicle's Load</h1>
          {this.state.loads.length > 0 &&
            this.state.loads.map((load, index) => (
              <div
                key={index}
                class="card mb-3"
                onClick={e => this.navigateToChargePage(e, load._id)}
              >
                <h4>Code : {load.code}</h4>
                <h5>Name : {load.name}</h5>
                <h5>Load : {load.load}</h5>
                <h5>Amount Per KM : {load.amountPKm}</h5>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
