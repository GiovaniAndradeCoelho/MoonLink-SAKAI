import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Customer, CustomerService, Representative } from '../service/customer.service';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [
    AvatarModule,
    TableModule,
    HttpClientModule,
    CommonModule,
    InputTextModule,
    TagModule,
    DropdownModule,
    MultiSelectModule,
    ProgressBarModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    SliderModule,
    FormsModule,
    DialogModule,
    TabViewModule,
    CommonModule
  ],
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
  providers: [CustomerService]
})
export class DriversComponent implements OnInit {

  drivers: Array<any> = new Array<any>();

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  searchValue: string | undefined;

  // Propriedades para o dialog modal
  displayDialog: boolean = false;
  selectedDriver: any = null;

  constructor(private customerService: CustomerService) { }

  private async fetchDrivers() {
    const fields = {
      id: true,
      name: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
      approvalStatus: true,
      vehicles: true,
      email: true,
      transports: true // assumindo que "transports" também faz parte dos dados do motorista
    };

    const selectedFields = (Object.keys(fields) as (keyof typeof fields)[]).filter(field => fields[field]);
    const queryString = selectedFields.join(',');

    this.loading = true;
    const response = await fetch(`http://localhost:6006/drivers?fields=${encodeURIComponent(queryString)}`, {
      method: 'GET',
    });

    this.loading = false;
    const result = await response.json();
    this.drivers = result;
  }

  async ngOnInit() {
    await this.fetchDrivers();
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  onGlobalFilter(event: Event, table: Table) {
    const value = (event.target as HTMLInputElement).value;
    table.filterGlobal(value, 'contains');
  }

  onSlideEnd(event: any, filterCallback: Function) {
    filterCallback(event?.values);
  }

  getSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (status.toLowerCase()) {
      case 'unqualified':
        return 'danger' as const;
      case 'qualified':
        return 'success' as const;
      case 'new':
        return 'info' as const;
      case 'negotiation':
        return 'warn' as const;
      case 'renewal':
        return 'secondary' as const;
      case 'proposal':
        return 'contrast' as const;
      default:
        return 'info' as const;
    }
  }

  formatDate(date: any): string {
    return `${new Date(date).toLocaleString('pt-BR')}`;
  }

  countVehicles(data: Array<any> | undefined): number {
    return data?.length || 0;
  }

  openDriverDialog(driver: any) {
    this.selectedDriver = driver;
    this.displayDialog = true;
  }
}
