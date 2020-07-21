import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
            })
            .pipe(catchError(this.errorMgmt))
            .pipe(map((event) => {

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

    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
        }
        return throwError(errorMessage);
      }

    getPhotos(vehicleId){
        return this.http.get(`/api/vehicles/${vehicleId}/photos`);
    }
}