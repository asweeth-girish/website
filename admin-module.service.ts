import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminModuleService {
  private baseUrl = 'http://localhost:8082/modules';
  private rolesUrl = 'http://localhost:8082/roles';

  constructor(private http: HttpClient) {}

  getModules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.rolesUrl}/all`);
  }

  getModulesByRoleId(roleId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/access/role/${roleId}`);
  }

  assignModuleToRole(roleName: string, moduleName: string, enabled: boolean, requireAuth: boolean): Observable<any> {
    return this.http.post(`${this.baseUrl}/access/assign`, {
      role: roleName,
      module: moduleName,
      enabled,
      requireAuth
    });
  }
  saveModuleOverride(module: any): Observable<any> {
    return this.http.post('http://localhost:8082/modules/override/save', {
      name: module.name,
      label: module.label,
      icon: module.icon,
      themecolor: module.themecolor,
      enabled: module.enabled,
      requireAuth: module.requiredAuth
    });
  }

}
