import { Component, OnInit , Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  dialogPurpose: string;
  dialogDescription: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogPurpose = data.purpose;
    this.dialogDescription = data.description;
  }

  ngOnInit() {
  }

}
