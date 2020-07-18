import { SaveVehicle } from './../models/vehicle';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicles';
  constructor(private http: HttpClient) {
    
  }
  
  getVehicle(id){
    return this.http.get(this.vehiclesEndpoint + '/' + id);
  }

  getVehicles(filter){
    return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter));
  }

  toQueryString(obj){
    // prop = value &
    var parts = [];
    for (var property in obj){
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }

    return parts.join('&');
  }

  getFeatures(){
    return this.http.get('/api/features');
  }

  getMakes(){
    return this.http.get('/api/makes');
  }

  create(vehicle) {
    return this.http.post(this.vehiclesEndpoint, vehicle);
  }

  update(vehicle: SaveVehicle){
    return this.http.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle);
  }

  delete(id){
    return this.http.delete(this.vehiclesEndpoint + '/' + id);
  }

}
