import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  text: any;
  JSONData : any;
  headers = [];
  result = [];
  // @ViewChild('fileImportInput') fileImportInput: any;

  public csvRecords: any[] = [];
  @ViewChild('fileImportInput') fileImportInput: any;

  csvJSON(csvText) {
    var lines = csvText.split("\n");

    this.result = [];

    this.headers = lines[0].split(",");
    console.log(this.headers);
    for (var i = 1; i < lines.length - 1; i++) {

      var obj = {
        invoiceNumber: String,
        vendorNumber: String
      };
      // console.log(lines[i]);
      var currentline = lines[i].split(',');
      // console.log(currentline);
      for (var j = 0; j < this.headers.length; j++) {
        obj[this.headers[j]] = currentline[j];
        // console.log( currentline[j]);
      }
      console.log(obj);

      this.result.push(obj);

    }
    console.log(this.result[0]);
  }


  fileChangeListener($event: any): void {
    var files = $event.srcElement.files;
    if (files[0].name.endsWith('.csv')) {
      var input = $event.target;
      var reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = (data) => {
        // let csvData = reader.result;
        // let csvRecordsArray = (csvData as string).split(/\r\n|\n/);
        // for (let i = 1; i < csvRecordsArray.length; i++) {
        //   let rowdata = csvRecordsArray[i].match(/(“[^”]*”)|[^,]+/g);
        //   this.csvRecords.push(rowdata);
        // }
        let text = reader.result;
        this.text = text;
        this.csvJSON(text);
      };
      reader.onerror = function () {
        alert(`Unable to read ` + input.files[0]);
      };
    } else {
      alert(`Please import valid .csv file.`);
      this.fileImportInput.nativeElement.value = '';
      this.csvRecords = [];
    }
  }
}
