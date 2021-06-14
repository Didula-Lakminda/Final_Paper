import React, { Component } from "react";
import axios from "axios";

const Allvehicles = {
  vehicles: [],
};

export default class vehicles extends Component {
  constructor(props) {
    super(props);
    this.state = Allvehicles;
  }

  componentDidMount() {
    axios
      .get("http://localhost:8020/vehicle/")
      .then((response) => {
        this.setState({ vehicles: response.data.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  navigateLoadPage(e, vehicleId) {
      window.location = `/vehicleload/${vehicleId}`
  }

  onDelete(e, vehicleId) {
    axios.delete(`http://localhost:8020/vehicle/delete/${vehicleId}`)
    .then(response => {
      alert('Data Deleted');
    })
    .catch(error => {
      console.log(error => error.message);
    })
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1>Vehicles</h1>
          {/* get all courses name to page */}
          {this.state.vehicles.length > 0 &&
            this.state.vehicles.map((vehicle, index) => (
              <div
                key={index}
                className="card mb-3"
                onClick={e => this.navigateLoadPage(e, vehicle._id)}
              >
                <h5>{vehicle.name}</h5>
                <br />
                <div class="d-grid gap-2 d-md-block">
                <button type="delete" className="btn btn-primary btn-sm" onClick={e => this.onDelete(e, vehicle._id)}>Delete</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
