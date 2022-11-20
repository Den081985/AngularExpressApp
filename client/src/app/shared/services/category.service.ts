import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../classes/ICategory';
import { IMessage } from '../model/IMessage';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  fetch(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>('/api/category');
  }

  getById(id: string): Observable<ICategory> {
    return this.httpClient.get<ICategory>(`/api/category/${id}`);
  }

  create(name: string, image?: File): Observable<ICategory> {
    const formData = new FormData();
    if (image) {
      formData.append('image', image, image.name);
    }
    formData.append('name', name);
    return this.httpClient.post<ICategory>('/api/category', formData);
  }

  update(id: number, name: string, image?: File): Observable<ICategory> {
    const formData = new FormData();
    if (image) {
      formData.append('image', image, image.name);
    }
    formData.append('name', name);
    return this.httpClient.patch<ICategory>(`/api/category/${id}`, formData);
  }

  removeById(id: number): Observable<IMessage> {
    return this.httpClient.delete<IMessage>(`/api/category/${id}`);
  }
}
