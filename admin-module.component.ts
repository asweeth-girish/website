import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AdminModuleService } from './admin-module.service';

interface Module {
  id: number;
  name: string;
  label?: string;
  icon?: string;
  themecolor?: string;
}

interface Role {
  id: number;
  role: string;
}

interface ModuleAccess {
  moduleId: number;
  name: string;
  label: string;
  icon: string;
  themecolor: string;
  requiredAuth: boolean;
  enabled: boolean;
  isEdited?: boolean;
}

@Component({
  selector: 'app-admin-module',
  templateUrl: './admin-module.component.html',
  styleUrls: ['./admin-module.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  providers: [AdminModuleService]
})
export class AdminModuleComponent implements OnInit {
  roles: Role[] = [];
  modules: Module[] = [];
  selectedRoleId: number = 0;
  moduleAccessList: ModuleAccess[] = [];

  constructor(private adminService: AdminModuleService) {}

  ngOnInit(): void {
    this.loadRoles();
    this.loadModules();
  }

  loadRoles() {
    this.adminService.getRoles().subscribe(data => {
       this.roles = data.map((r: any) => ({
             id: r.ID || r.id,         // Use correct key here
                  role: r.ROLE || r.role     // from backend "ROLE"
          }));
      if (this.roles.length > 0) {
        this.selectedRoleId = this.roles[0].id;
        this.onRoleChange();
      }
    });
  }

  loadModules() {
    this.adminService.getModules().subscribe(data => {
      this.modules = data;
      this.loadModuleAccess();
    });
  }

  loadModuleAccess() {
    if (!this.selectedRoleId) {
      this.moduleAccessList = [];
      return;
    }
    this.adminService.getModulesByRoleId(this.selectedRoleId).subscribe(data => {
      if (data && data.length > 0) {
        this.moduleAccessList = data.map((m: any) => ({
          moduleId: m.module?.id || m.moduleId,
          name: m.module?.name || m.name,
          label: m.module?.label || m.label || '',
          icon: m.module?.icon || m.icon || 'extension',
          themecolor: m.module?.themecolor || m.themecolor || '#1976d2',
          requiredAuth: m.requireAuth || false,
          enabled: m.enabled || false
        }));
      } else {
        // If no module access assigned yet, show all modules with defaults
        this.moduleAccessList = this.modules.map(m => ({
          moduleId: m.id,
          name: m.name,
          label: m.label || '',
          icon: m.icon || 'extension',
          themecolor: m.themecolor || '#1976d2',
          requiredAuth: false,
          enabled: false
        }));
      }
    });
  }

  toggleEnabled(moduleId: number) {
    const mod = this.moduleAccessList.find(m => m.moduleId === moduleId);
    if (mod) mod.enabled = !mod.enabled;
  }

  toggleRequireAuth(moduleId: number) {
    const mod = this.moduleAccessList.find(m => m.moduleId === moduleId);
    if (mod) mod.requiredAuth = !mod.requiredAuth;
  }

  saveModuleAccess() {
    if (!this.selectedRoleId) {
      alert('Please select a role first');
      return;
    }
    const role = this.roles.find(r => r.id === this.selectedRoleId);
    if (!role) {
      alert('Invalid role selected');
      return;
    }

    // Send one request per module assignment
    const requests = this.moduleAccessList.map(m =>
      this.adminService.assignModuleToRole(role.role, m.name, m.enabled, m.requiredAuth).toPromise()
    );

    Promise.all(requests)
      .then(() => alert('Modules assigned successfully'))
      .catch(() => alert('Error assigning modules'));
  }

  onRoleChange() {
    this.selectedRoleId = Number(this.selectedRoleId);
    this.loadModuleAccess();
  }

saveOverrides() {
  const edited = this.moduleAccessList.filter(m => m.isEdited);

  if (edited.length === 0) {
    alert("No overrides to save.");
    return;
  }

  const requests = edited.map(m =>
    this.adminService.saveModuleOverride(m).toPromise()
  );

  Promise.all(requests)
    .then(() => alert("Overrides saved successfully!"))
    .catch(() => alert("Failed to save overrides."));
}

}
