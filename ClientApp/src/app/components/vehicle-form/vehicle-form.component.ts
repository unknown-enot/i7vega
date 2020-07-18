import { ToastrService } from 'ngx-toastr';
import { SaveVehicle, Vehicle } from './../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import * as _ from 'underscore';


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css'],
})
export class VehicleFormComponent implements OnInit {

  isFeaturesLoading=true;

  makes: any[];
  models: any[];
  features: any[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features:[],
    contact:{
      name: '',
      email: '',
      phone: ''
    }
  };

  
  

  itemsList;

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService) { 
      
      route.params.subscribe(p => {
        var pid = p['id'];
        if(pid)
          this.vehicle.id += pid;
      });
  }

  ngOnInit() {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    if(this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));

    forkJoin(sources).subscribe(data => {
      this.makes = <any>data[0];
      this.features = <any>data[1];
      this.isFeaturesLoading = false;

      if(this.vehicle.id)
        this.setVehicle(<any>data[2]);
        this.populateModels();
    });
  }

  private setVehicle(v: Vehicle){
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
    
  }

  onMakeChange(){
    this.populateModels();
    delete this.vehicle.modelId;   
  }

  private populateModels(){
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId, $event){
    if($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index,1);
    }
  }

  submit(){
    if(this.vehicle.id){
      this.vehicleService.update(this.vehicle)
        .subscribe(x => {
          this.toastrService.success('The vehicle was successfully updated', 'Success');
          this.router.navigate(['/vehicles']);
        });  
    }
    else {
      this.vehicleService.create(this.vehicle)
      .subscribe(
        x => console.log(x));
        this.toastrService.success('The vehicle was successfully created', 'Success');
        this.router.navigate(['/vehicles']);
    }
    
  }

  

}
