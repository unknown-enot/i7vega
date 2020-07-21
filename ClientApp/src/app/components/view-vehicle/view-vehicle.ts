import { PhotoService } from './../../services/photo.service';
import { VehicleService } from './../../services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    templateUrl: 'view-vehicle.html'
})
export class ViewVehicleComponent implements OnInit {
    @ViewChild('fileInput', { static: false })
    fileInput: ElementRef;
    vehicle: any;
    vehicleId: number;
    viewMode = 'vehicles';
    photos: any[];

    uploadResponse = {};
    error: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private photoService: PhotoService,
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
        this.photoService.getPhotos(this.vehicleId)
            .subscribe(photos => this.photos = <any>photos);

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

    uploadPhoto(){
        var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        this.photoService.upload(this.vehicleId, nativeElement.files[0])
            .subscribe(res => {
                this.uploadResponse = res},
                err => this.error = err,
                () => this.photos.push(this.uploadResponse)
            );
    }
}