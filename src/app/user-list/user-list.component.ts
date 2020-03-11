import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../services/user.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {Addres, Company, Geo, User} from '../services/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'phone', 'website'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public dataSource: MatTableDataSource<User>;
  error: any;

  constructor(public userservice: UserService) {
  }

  ngOnInit() {
    this.userservice.getUsers().subscribe(
      userList => {
        this.dataSource = new MatTableDataSource(userList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.error = error.message
        console.log(error);
      }
    );
    this.mediaAdaptive();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  mediaAdaptive() {
    if (window.matchMedia('(max-width: 980px)').matches) {
      if (this.displayedColumns.length === 6) {
        this.displayedColumns.splice(4, 5);
      }
    }
    if (window.matchMedia('(min-width: 979px)').matches) {
      if (this.displayedColumns.length === 4) {
        this.displayedColumns.push('phone');
        this.displayedColumns.push('website');
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event = null;
    this.mediaAdaptive();
  }

  usersFactory(): User {
    const num = this.dataSource.data.length;
    return {
        id: num,
        name: `Another user ${num}`,
        username: `user ${num}`,
        email: `user${num}@mail.com`,
        addres: undefined,
        geo: undefined,
        phone: '000-000',
        website: '',
        company: undefined,
    };
  }

  updateFieldID() {
    this.dataSource.data = this.dataSource.data.map((v, it) => {
      v.id = it + 1;
      return v;
    });
  }

  userAdd() {
    console.log('add', this.usersFactory());
    this.dataSource.data.push(this.usersFactory());
    this.updateFieldID();
  }
}
