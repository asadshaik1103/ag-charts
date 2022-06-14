import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private options: any;

  beverageSpending = [
    {
      beverage: 'Coffee',
      Q1: 450,
      Q2: 560,
      Q3: 600,
      Q4: 700,
    },
    {
      beverage: 'Tea',
      Q1: 270,
      Q2: 380,
      Q3: 450,
      Q4: 520,
    },
    {
      beverage: 'Milk',
      Q1: 180,
      Q2: 170,
      Q3: 190,
      Q4: 200,
    },
  ];

  public convetToPDF() {
    var data = document.getElementById('contentToConvert2');
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      // const contentDataURL = canvas.toDataURL('image/png');
      // let pdf = new jsPDF();
      // let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      // var position = 0;
      // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      
      // pdf.save('new-file.pdf'); // Generated PDF

      var imgData = canvas.toDataURL('image/png');
      var doc = new jsPDF('p', 'mm');
      var position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save( 'file.pdf');

    });
  }

  public handleClick() {
    this.convetToPDF();
  }

  constructor() {
    this.options = {
      data: this.beverageSpending,
      title: {
        text: 'Beverage Expenses',
      },
      subtitle: {
        text: 'per quarter',
      },
      series: [
        { type: 'column', xKey: 'beverage', yKey: 'Q1', stacked: true },
        { type: 'column', xKey: 'beverage', yKey: 'Q2', stacked: true },
        { type: 'column', xKey: 'beverage', yKey: 'Q3', stacked: true },
        { type: 'column', xKey: 'beverage', yKey: 'Q4', stacked: true },
      ],
    };
  }
}
