import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Vehicles from './components/Vehicles/vehicles';
import CreateVehicle from './components/CreateVehicle/createvehicle';
import CreateLoads from './components/CreateLoad/createload';
import VehicleLoads from './components/VehicleLoads/vehicleloads';
import DeleiveryCharge from './components/Calculate/delieverycharge';

function App() {
  return (
    <div>
        <Router>
          <Navbar/>
          <section>
            <switch>
              <Route path="/" component={Vehicles} exact />
              <Route path="/create-vehicle" component={CreateVehicle} />
              <Route path="/create-load" component={CreateLoads} />
              <Route path="/vehicleload/:id" component={VehicleLoads} />
              <Route path="/delievery-charge/:id" component={DeleiveryCharge} />
            </switch>
          </section>
        </Router>
    </div>
  );
}

export default App;
