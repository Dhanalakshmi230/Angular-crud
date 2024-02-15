import { Component } from '@angular/core';
import { LoginService } from './../login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  array: any = [];

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.service.get().subscribe(
      response => {
        console.log('get successful:', response);
        this.array = response;
      },
      error => {
        console.error('get error:', error);
      }
    );
  }

  getByIdAndNavigate(id: string): void {
    this.service.getById(id).subscribe(
      response => {
        console.log('getById successful:', response);
        // Navigate to the login route with the id parameter
        this.router.navigate(['/login', id]);
      },
      error => {
        console.error('getById error:', error);
      }
    );
  }


  deleteItem(id: string): void {
    this.service.delete(id).subscribe(
      response => {
        console.log('delete successful:', response);
        this.refreshData(); // Refresh data after deletion
      },
      error => {
        console.error('delete error:', error);
      }
    );
  }


}
