import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent implements OnInit {
    private readonly PAGE_SIZE = 3;

    queryResult: any = {};
    isLoading = true;
    makes: KeyValuePair[];
    models: KeyValuePair[];
    query: any = {
        pageSize: this.PAGE_SIZE
    };
    columns = [
        { title: 'Make', key: 'make', isSortable: true },
        { title: 'Model', key: 'model', isSortable: true },
        { title: 'Contact Name', key: 'contactName', isSortable: true }
    ];



    constructor(
        private vehicleService: VehicleService,
        private router: Router,
        private toastrService: ToastrService){
    }
    
    ngOnInit(){
        this.vehicleService.getMakes()
            .subscribe(makes => this.makes = <any>makes);            

        this.populateVehicles();
    }

    delete(vehicle){
		if (confirm("Are you sure you want to delete " + vehicle.make.name + " - " + vehicle.model.name + "?")) {
			var index = this.queryResult.items.indexOf(vehicle)
			// Here, with the splice method, we remove 1 object
            // at the given index.
            this.queryResult.items.splice(index, 1);

			this.vehicleService.delete(vehicle.id)
				.subscribe(null, 
					err => {
						this.toastrService.error('Could not delete the vehicle.', 'NotDeleted');
                        // Revert the view back to its original state
                        // by putting the user object at the index
                        // it used to be.
						this.queryResult.items.splice(index, 0, vehicle);
                    },
                    () => this.toastrService.success('Vehicle has been successfully deleted from the Database.','Deleted'));
		}
    }

    private populateModels(){
        var selectedMake = this.makes.find(m => m.id == this.query.makeId);
        this.models = selectedMake ? selectedMake.models : [];
      }

    private populateVehicles(){
        

        this.isLoading = true;
        this.vehicleService.getVehicles(this.query)
            .subscribe(result => this.queryResult = result,
                null,
                () => this.isLoading = false);
    }
    
    onMakeChange(){
        this.query.page = 1;
        this.populateModels();
        delete this.query.modelId;
    }

    //onFilterChangeFinal() {
    //    this.populateVehicles();
        
        // var vehicles = this.allVehicles;

        // if(this.filter.makeId)
        //     vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);
        
        // if(this.filter.modelId)
        //     vehicles = vehicles.filter(v => v.model.id == this.filter.modelId);

        // this.vehicles = vehicles;
    //}

    resetFilter(){
        
        this.query = {
            page: 1,
            pageSize: this.PAGE_SIZE
        };
        this.populateVehicles();
    }

    sortBy(columnName){
        if(this.query.sortBy == columnName) {
            this.query.isSortAscending = !this.query.isSortAscending;
        } else {
            this.query.sortBy = columnName;
            this.query.isSortAscending = true;
        }
        this.populateVehicles();
    }

    onPageChange(page){
        this.query.page = page;
        this.populateVehicles();
   
    }

    
}