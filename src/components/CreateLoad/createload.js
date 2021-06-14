import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";

const loadInitial = {
    loadcode: ' ',
    name: ' ',
    loadsize: 0,
    amountPkm: 0,
    vehicles: [],
    selectedVehicle: [],
    options: [],
    getLoad: [],
    vehicleId: ' '


}

export default class createload extends Component {
  constructor(props) {
    super(props);
    this.state = loadInitial;
    this.onChange = this.onChange.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
    this.onVehicleSelect = this.onVehicleSelect.bind(this);
  }

componentDidMount() {
    axios.get('http://localhost:8020/vehicle/')
    .then(response => {
        this.setState({ vehicles: response.data.data }, () => {
            let data = [];
            this.state.vehicles.map((vehicle, index) => {
                let allvehicles = {
                    value: vehicle._id,
                    label: vehicle.name
                }
                data.push(allvehicles);
            });
            this.setState({ options: data });
        })
    })
}

onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
}

onVehicleSelect(e) {
    this.setState({ selectedVehicle: e ? e.label: [] });
    this.setState({ vehicleId: e ? e.value: [] });
}

onSubmit(e) {
    e.preventDefault();

    let loadDetails = {
        code: this.state.loadcode,
        name: this.state.name,
        load: this.state.loadsize,
        amountPKm: this.state.amountPkm,
        vehicles: this.state.vehicleId
    }

   // console.log(loadDetails);

    axios.post('http://localhost:8020/load/create-load', loadDetails)
    .then(response => {
        alert('Load Added');

        this.setState({ getLoad: response.data.data })
        let loadId = {
            loadID: this.state.getLoad._id
        }

        axios.put(`http://localhost:8020/vehicle/update/${this.state.vehicleId}`, loadId)
        .then(response => {
            console.log('Vehicle Updated');
        })
        .catch(error => {
            console.log(error => {
                console.log(error.message);
            })
        })
    })
    .catch(error => {
        alert(error.message);
    })
}

  render() {
    return (
      <div>
        <div className="container">
          <h1>Add Load</h1>
          <form onSubmit={this.onSubmit}>
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">
                Load Code
              </label>
              <input
                type="text"
                className="form-control"
                id="loadcode"
                //state name
                name="loadcode"
                //value of the state
                value={this.state.loadcode}
                onChange={this.onChange}
              />
            </div>
            <div class="mb-3">
              <label htmlFor="exampleFormControlTextarea1" class="form-label">
                Load Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <div class="mb-3">
              <label htmlFor="exampleFormControlTextarea1" class="form-label">
                Load Size (0 - 5)
              </label>
              <input
                type="Number"
                className="form-control"
                id="loadsize"
                name="loadsize"
                value={this.state.loadsize}
                onChange={this.onChange}
              />
            </div>
            <div class="mb-3">
              <label htmlFor="exampleFormControlTextarea1" class="form-label">
                Amount Per KM
              </label>
              <input
                type="Number"
                className="form-control"
                id="amountPKm"
                name="amountPKm"
                value={this.state.amountPKm}
                onChange={this.onChange}
              />
            </div>
            <label htmlFor="exampleFormControlTextarea1" class="form-label">
              Category
            </label>
            <Select
              options={this.state.options}
              onChange={this.onVehicleSelect}
            />
            <button type="submit" className="btn btn-primary">
              Add Load
            </button>
          </form>
        </div>
      </div>
    );
  }
}
