import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';

const vehicleInitiate = {
    vehiclename: ' ',
    description: ' ',
    loads: [],
    options: [],
    selectedLoads: []
}

export default class createvehicle extends Component {
    constructor(props){
        super(props);
        this.state = vehicleInitiate;
        this.onChange = this.onChange.bind(this);
        this.onLoadSelect = this.onLoadSelect.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
}

componentDidMount() {
    axios.get('http://localhost:8020/load/')
    .then(response => {
        console.log(response.data.data);
        this.setState({ loads: response.data.data }, () => {
            let data = [];
            this.state.loads.map((load, index) => {
                let allloads = {
                    value: load._id,
                    label: load.name
                }
                data.push(allloads);
            });
            this.setState({ options: data })
        })
    })
}

onLoadSelect(e) {
    this.setState({ selectedLoads: e ? e.map(load => load.value) : [] });
}

onSubmit(e) {
    e.preventDefault();

    let vehicle = {
        name: this.state.vehiclename,
        description: this.state.description,
        loads: this.state.selectedLoads
    }

    axios.post('http://localhost:8020/vehicle/create-vehicle', vehicle)
    .then(response => {
        alert('Vehicle Added');
    })
    .catch(error => {
        console.log(error.message);
    })
}

    render() {
        return (
            <div className="container">
            <h1>Add Vehicle</h1>
            <form onSubmit={this.onSubmit}>
              <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">
                  Vehicle Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="vehiclename"
                  //state name
                  name="vehiclename"
                  //value of the state
                  value={this.state.vehiclename}
                //   //onchange function
                  onChange={this.onChange}
                />
              </div>
              <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">
                  Vehicle Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  //state name
                  name="description"
                  value={this.state.description}
                //   //onchange function
                  onChange={this.onChange}
                />
              </div>
              <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">
                  Select Loads
                </label>
                <Select
                    options={this.state.options}
                    onChange={this.onLoadSelect}
                  className="basic-multi-select"
                  isMulti
                />
              </div>
              <div className="mt-5">
                <button type="submit" className="btn btn-primary">
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        )
    }
}
