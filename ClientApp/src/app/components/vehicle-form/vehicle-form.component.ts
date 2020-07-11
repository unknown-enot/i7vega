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
  vehicle: any = {};

  radioSel:any;
  radioSelected:string;
  radioSelectedString:string;

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
      this.radioSelected = "true";
      this.getSelecteditem();
  }

  getSelecteditem(){
    //console.log("radioSelected", this.radioSelected);
    this.radioSel = this.itemsList.find(Item => Item.value === this.radioSelected);
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
    var selectedMake = this.makes.find(m => m.id == this.vehicle.make);
    this.models = selectedMake ? selectedMake.models : [];   
  }



}
