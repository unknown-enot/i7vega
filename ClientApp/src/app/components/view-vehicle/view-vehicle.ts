import { VehicleService } from './../../services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    templateUrl: 'view-vehicle.html'
})
export class ViewVehicleComponent implements OnInit {
    vehicle: any;
    vehicleId: number;
    viewMode = 'vehicles';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private vehicleService: VehicleService) {

        route.params.subscribe(p => {
            this.vehicleId = +p['id'];
            if (isNaN(this.vehicleId) || this.vehicleId <=0) {
                router.navigate(['/vehicles']);
                return;
            }
        });
        
    }

    ngOnInit() {
        this.vehicleService.getVehicle(this.vehicleId)
            .subscribe(
                v => this.vehicle = v,
                err => {
                    if (err.status == 404) {
                        this.router.navigate(['/vehicles']);
                        return;
                    }
                }
            );
    }

    delete(){
		if (confirm("Are you sure you want to delete " + this.vehicle.make.name + " - " + this.vehicle.model.name + "?")) {
			
			this.vehicleService.delete(this.vehicle.id)
				.subscribe(
                    null, 
					null,
                    () => { 
                        this.toastrService.success('Vehicle has been successfully deleted from the Database.','Deleted');
                        this.router.navigate(['/vehicles'])
                    });
		}
    }
}