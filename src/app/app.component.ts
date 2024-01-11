import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
import { UserService } from './user.service';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'UserManagement';

constructor(private dialog:MatDialog, private userservice:UserService){}

displayedColumns: string[] = ['id', 'name', 'email', 'role','action'];
dataSource!: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
  
openAddComp(){
  this.dialog.open(AddUserComponent)
}


ngOnInit(): void {
  this.getUserList()
}


getUserList() {
  this.userservice.getUsers().subscribe({
    next:(res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    
    } ,
    error: console.log,
  });
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


deleteID(id: number) {
  this.userservice.deleteUser(id).subscribe({
    next: (res) => {
      this.getUserList();
      alert("User Id `{{this.id}}` Deleted")
    },
    error: console.log,
  });
}

// openEditForm(data: any) {
//   const dialogRef = this.dialog.open(AddUserComponent, {
//     data,
//   });

//   dialogRef.afterClosed().subscribe({
//     next: (val) => {
//       if (val) {
//         this.getUserList();
//       }
//     },
//   });
// }

}
