import { SaveVehicle, Vehicle } from './../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import * as _ from 'underscore';


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
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

  radioSel:any;
  
  

  itemsList;

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.itemsList = [
        {
           name:'Yes',
           value: 'true'
        },
        {
           name:'No',
           value: 'false'
        }
      ];
      
      this.getSelecteditem();

      route.params.subscribe(p => {
        this.vehicle.id = +p['id'];
      });
  }

  getSelecteditem(){
    
    this.radioSel = this.itemsList.find(Item => Item.value === this.vehicle.isRegistered);
    //console.log(this.itemsList.find(Item => Item.value === this.vehicle.isRegistered));
    if(!this.radioSel)
      this.radioSel = {
        name: 'No',
        value: 'false'
      };
    //console.log("radioSel", this.radioSel);
  }

  onItemChange(item){
    this.getSelecteditem();
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
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;   
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
    this.vehicleService.create(this.vehicle)
      .subscribe(
        x => console.log(x));
  }

}
