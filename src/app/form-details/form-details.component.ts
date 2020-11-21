import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { FormData } from '../form-details/forn.model';
import { FormServiceService } from '../form-service.service';

export const config = {
  page_size: 10,
  page_size_options: [5, 10, 20, 50, 100]
}

let tableData: FormData[] = [
  { id: 1, sno: 1, firstName: "abc", lastName: "def", userName: "bunny", email: "abc@gmail.com", gender: "f", phoneNo: 1875643245 },
  { id: 2, sno: 2, firstName: "efg", lastName: "klm", userName: "hello", email: "kgc@gmail.com", gender: "f", phoneNo: 2786543287 }

];
@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.sass']
})
export class FormDetailsComponent implements OnInit {
  pageIndex: number = 0;
  dataSource = new MatTableDataSource(tableData);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild('ft')
  ft!: MatSort;
  displayedColumns = ['sno', 'firstName', 'lastName', 'userName', 'email', 'gender', 'phoneNo', 'action'];
  pageSize = config.page_size;
  pageSizeOptions = config.page_size_options;
  constructor(public dialog: MatDialog, public service: FormServiceService) { }
  ngOnInit() {
    this.pageSize = this.dataSource.data.length
  }

  arrData = tableData
  data1: any
  data2: any
  openDialog(data = {}): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.pageSize = this.dataSource.data.length
      this.data1 = tableData
      this.data2 = [result]
      //this.arrData=this.data1.concat(this.data2)
      // tableData=this.arrData
      this.data2.findIndex((element: { id: any; }) => {
        // console.log("element",element.id)
        //console.log(FormServiceService.id)
        if (element.id === FormServiceService.id) {
          this.arrData = this.data1.concat(this.data2)
          tableData = this.arrData
          console.log("editedddd")

        }
        else {
          console.log("not updated")
          // // tableData
        }
      })

    });
  }
  dataList() {
    this.dataSource
  }
  indexvalue(index: any) {
    // console.log(index)
    FormServiceService.id = index
  }
  editDetails(updateDetails: {} | undefined) {
    console.log(updateDetails)
    this.openDialog(updateDetails);
  }

  getPaginatorData(event: { pageIndex: number; pageSize: number; }) {
    console.log(event.pageIndex)
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.ft;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }

}
