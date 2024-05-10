import { Injectable } from '@angular/core';
import { NetworkModel } from '../model/network.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  network_list: NetworkModel[] = [];

  constructor(private httpClient: HttpClient) {}

  get_network(): Observable<NetworkModel[]> {
    this.network_list = [];
    environment.network.forEach(networkGroup => {
      networkGroup.networks.forEach(network => {
        this.network_list.push({
          id: network.id,
          name: network.name,
          wsProviderEndpoint: network.wsProviderEndpoint,
          net_name: network.net_name,
          is_default: network.is_default
        });
      });
    });
    return new Observable(observer => {
      observer.next(this.network_list);
      observer.complete();
    });
  }
}
