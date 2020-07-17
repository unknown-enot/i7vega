import { SaveVehicle } from './../models/vehicle';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) {
    
  }
  
  getVehicle(id){
    return this.http.get('/api/vehicles/' + id);
  }

  getFeatures(){
    return this.http.get('/api/features');
  }

  getMakes(){
    return this.http.get('/api/makes');
  }

  create(vehicle) {
    return this.http.post('/api/vehicles', vehicle);
  }

  update(vehicle: SaveVehicle){
    return this.http.put('/api/vehicles/' + vehicle.id, vehicle);
  }

  delete(id){
    return this.http.delete('/api/vehicles/'+ id);
  }

}
