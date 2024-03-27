import { Injectable } from '@angular/core';
import { CookiesService } from './cookies.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor(
    private cookiesService: CookiesService,
    private http: HttpClient,
  ) {
    //
  }

  closeSwal() {
    Swal.close();
  }

  async fireSwal(
    success: boolean,
    swalTitle: string,
    swalText: string
  ) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })
    Toast.fire({
      icon: success ? 'success' : 'error',
      title: swalTitle,
      text: swalText
    })
  };

  progressSwal(data: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    })
    Toast.fire({
      text: data,
    })
  }
}
