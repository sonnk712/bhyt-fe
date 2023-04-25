import {Component, Input, OnInit} from '@angular/core';
import {RaStatusEnum} from "../../../core/model/certificate";

@Component({
  selector: 'agri-ra-status-display',
  templateUrl: './ra-status-display.component.html',
  styleUrls: ['./ra-status-display.component.scss']
})
export class RaStatusDisplayComponent implements OnInit {
  @Input() status?: number;
  statusConst = RaStatusEnum;
  constructor() { }

  ngOnInit(): void {
  }

}
