import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  text: any;
  headers = [];
  result = [];

  @ViewChild('fileImportInput') fileImportInput: any;

  csvJSON(csvText) {
    var lines = csvText.split("\n");
    this.result = [];
    this.headers = lines[0].split(",");
    for (var i = 1; i < lines.length - 1; i++) {
      var obj = {};
      var currentline = lines[i].split(',');
      for (var j = 0; j < this.headers.length; j++) {
        obj[this.headers[j].trim()] = currentline[j];
      }

      this.result.push(obj);

    }
  }


  fileChangeListener($event: any): void {
    var files = $event.srcElement.files;
    if (files[0].name.endsWith('.csv')) {
      var input = $event.target;
      var reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = () => {
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
      this.result = [];
    }
  }
}
