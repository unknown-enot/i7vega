import { Injectable } from '@angular/core';

@Injectable()
export class ScopesService {
    constructor() { }

    protectedRoutes(method){
        switch (method) {
            case 'POST':
                return true;
                break;
            case 'DELETE':
                return true;
                break;
            case 'PUT':
                return true;
                break;
            default:
                return false;
                break;
        }
    }
    
}