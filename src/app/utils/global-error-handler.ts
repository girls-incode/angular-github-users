import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorDialogService } from '../services/error-dialog.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorDialogService: ErrorDialogService) {}

  handleError(error: Error): void {
    this.errorDialogService.openDialog(error.message || 'unknowm client error');
  }
}
