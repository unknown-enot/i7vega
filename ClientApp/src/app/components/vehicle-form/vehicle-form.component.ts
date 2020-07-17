import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';


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
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute) { 
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

      route.params.subscribe(p => {
        this.vehicle.id = +p['id'];
      });
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
        this.vehicle = data[2];
    });
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
