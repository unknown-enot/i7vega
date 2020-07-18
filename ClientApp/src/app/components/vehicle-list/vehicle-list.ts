import { ToastrService } from 'ngx-toastr';
import { Vehicle } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent implements OnInit {
    isLoading = true;
    vehicles: Vehicle[];
    constructor(
        private vehicleService: VehicleService,
        private router: Router,
        private toastrService: ToastrService){
    }
    
    ngOnInit(){
        this.vehicleService.getVehicles()
            .subscribe(vehicles => this.vehicles = <any>vehicles,
                null,
                () => this.isLoading = false);
    }

    delete(vehicle){
		if (confirm("Are you sure you want to delete " + vehicle.make.name + " - " + vehicle.model.name + "?")) {
			var index = this.vehicles.indexOf(vehicle)
			// Here, with the splice method, we remove 1 object
            // at the given index.
            this.vehicles.splice(index, 1);

			this.vehicleService.delete(vehicle.id)
				.subscribe(null, 
					err => {
						this.toastrService.error('Could not delete the vehicle.', 'NotDeleted');
                        // Revert the view back to its original state
                        // by putting the user object at the index
                        // it used to be.
						this.vehicles.splice(index, 0, vehicle);
                    },
                    () => this.toastrService.success('Vehicle has been successfully deleted from the Database.','Deleted'));
		}
	}
}