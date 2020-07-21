import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class PhotoService {
    constructor(private http: HttpClient) { }
    
    upload(vehicleId, photo) {
        var formData = new FormData();
        formData.append('file', photo);

        return this.http.post(
            `/api/vehicles/${vehicleId}/photos`, 
            formData,
            {
                reportProgress: true,
                observe: 'events'
            }).pipe(map((event) => {

                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        const progress = Math.round(100 * event.loaded / event.total);                        
                        return { status: 'progress', message: progress };
                        
                    case HttpEventType.Response:
                        return event.body;
                
                    default:
                        return `Unhandled event: ${event.type}`;
                }
            })
                
            );
    }

    getPhotos(vehicleId){
        return this.http.get(`/api/vehicles/${vehicleId}/photos`);
    }
}