import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPosition } from '../classes/iposition';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  constructor(private httpClient: HttpClient) {}

  fetch(categoryId: number): Observable<IPosition[]> {
    return this.httpClient.get<IPosition[]>(`/api/position/${categoryId}`);
  }

  create(position: IPosition): Observable<IPosition> {
    return this.httpClient.post<IPosition>('/api/position', position);
  }

  update(position: IPosition): Observable<IPosition> {
    return this.httpClient.patch<IPosition>(
      `/api/position/${position.id}`,
      position
    );
  }

  remove(position: IPosition): Observable<IPosition> {
    return this.httpClient.delete<IPosition>(`/api/position/${position.id}`);
  }
}
