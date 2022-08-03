import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CreatorService, Modal} from "../creator.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  public imageUrl: string = 'assets/img/human.png';
  public bgColor: string = this.creatorService.charBgColor;
  public isDarkTheme: boolean = this.creatorService.isThemeDark

  public modalIdx: number = 0;
  public isModalDisplayed: boolean = true;
  public isModalSystem: boolean = true;
  public isTheming: boolean = false;
  public modalMessageContent: Modal[] = this.creatorService.modalMessages

  constructor(private creatorService: CreatorService) {}

  ngOnInit(): void {}

  public onImageChange(e: string): void {
    this.imageUrl = e + '.png';
  }

  public onColorChange(e: string): void {
    this.bgColor = e;
  }

  public optionChosenHandle(e: {idx: number,isSystem: boolean}): void {
    this.modalIdx = e.idx;
    this.isModalSystem = e.isSystem;
    this.isModalDisplayed = true;
  }
}
