import { Constants } from 'src/app/shared/constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  private reportsPath = Constants.URL_SERVER + 'reports/';

  public reportsURLS = {
    born_by_animal: this.reportsPath + 'born_by_animals',
    born_alive_per_month: this.reportsPath + 'born_alive_per_month',
    born_dead_per_month: this.reportsPath + 'born_dead_per_month'
  };

  constructor() { }

  ngOnInit() {
  }

}
