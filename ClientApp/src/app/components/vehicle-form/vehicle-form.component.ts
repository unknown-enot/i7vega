import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

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
  vehicle: any = {
    features:[],
    contact:{}
  };

  radioSel:any;
  
  

  itemsList;

  constructor(
    private vehicleService: VehicleService) { 
      this.itemsList = [
        {
           name:'Yes',
           value:'true'
        },
        {
           name:'No',
           value:'false'
        }
      ];
      this.vehicle.isRegistered = "true";
      this.getSelecteditem();
  }

  getSelecteditem(){
    //console.log("radioSelected", this.radioSelected);
    this.radioSel = this.itemsList.find(Item => Item.value === this.vehicle.isRegistered);
    if(!this.radioSel)
      this.radioSel = {
        name: '',
        value: ''
      };
    //console.log("radioSel", this.radioSel);
  }

  onItemChange(item){
    this.getSelecteditem();
  }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes =>
        this.makes = <any>makes
      );

    this.vehicleService.getFeatures()
      .subscribe(features => {
        this.features = <any>features;
        this.isFeaturesLoading = false;});
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



}
