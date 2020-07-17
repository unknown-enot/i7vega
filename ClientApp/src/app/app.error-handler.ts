import { ErrorHandler, Inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";

export class AppErrorHandler implements ErrorHandler {
    constructor(@Inject(ToastrService) private toastrService: ToastrService){

    }

    handleError(error: any) :void {
        this.toastrService.error('An unexpected error happened', 'Error');

    }
}
