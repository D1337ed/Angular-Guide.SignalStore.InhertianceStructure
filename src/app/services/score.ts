import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICore } from '../interfaces/icore';

@Injectable({
  providedIn: 'root'
})
export class SCore {
  
  private readonly http = inject(HttpClient);

  private cpuUrl = 'http://localhost:5294';

  getAll() {
    return this.http.get<ICore[]>(`${this.cpuUrl}/all`);
  }

  get(cpuId: number) {
    return this.http.get<ICore>(`${this.cpuUrl}/all/${cpuId}`)
  }

    create(core: ICore) {
    return this.http.post(`${this.cpuUrl}/new`, {core});
  }

  update(update: ICore) {
    return this.http.patch(`${this.cpuUrl}/update/${update.id}`, {update});
  }

  delete(cpuId: number) {
    return this.http.delete(`${this.cpuUrl}/delete/${cpuId}`);
  }
}
