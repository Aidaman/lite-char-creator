import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CreatorService, FORMS} from "../creator.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Classes} from "../../enums/classes";
import {Races} from "../../enums/races";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  @Output() imagePath: EventEmitter<string> = new EventEmitter<string>()
  @Output() callModal: EventEmitter<{idx: number, isSystem: boolean }> = new EventEmitter<{idx: number,isSystem: boolean  }>()
  public currentPage$: Observable<(Races | Classes)[]> = this.activeRoute.params.pipe(
    map(({type, value}) => {
      this.type = type;
      this.modalWereCalled = false;
      this.typeValue = value;
      this.formGroup.setValue({option: value});
      this.imagePath.emit(`assets/img/${this.type === 'race' ? value : this.creatorService.selectedRace + '/' + value}`);
      return FORMS[type];
    })
  );

  public type: string = '';
  public typeValue: string = '';

  private modalWereCalled: boolean = false;

  public formGroup: FormGroup = new FormGroup({
    option: new FormControl(),
  });

  constructor(public creatorService: CreatorService,
              public activeRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {}

  private getModalIdx(e: boolean): {idx: number,isSystem: boolean}{
    let res: {idx: number, isSystem: boolean,} = {idx: 1, isSystem: false,};
    const searchValue = e ? `choose class` : `${this.creatorService.selectedRace}|${this.creatorService.selectedClass}`
    // this.isModalSystem = e;
    res.isSystem = e;
    res.idx = this.creatorService.modalMessages.findIndex(message => {
        return message.trigger === searchValue;
      })
    return res;
  }

  public toNextPage(): void {
    this.creatorService[this.type === 'race' ? 'selectedRace' : 'selectedClass'] = this.typeValue;
    const emittingValue = this.getModalIdx(false);

    if(!this.modalWereCalled && emittingValue.idx > 0){
        this.callModal.emit(emittingValue);
        this.modalWereCalled = true;
    } else{
      this.modalWereCalled = true;

      if (this.type === 'class') {
        this.router.navigate(['end']);

      } else {
        this.router.navigate(['/main', 'class', 'warrior']);

        const emittingValue = this.getModalIdx(true);
        this.getModalIdx(true);
        this.callModal.emit(emittingValue);
      }
    }
  }


  public toPreviousPage(): void {
    this.creatorService.selectedClass = '';
    this.router.navigate(['/main', 'race', this.creatorService.selectedRace]);
  }

  public optionSelect(option: Races | Classes): void {
    this.imagePath.emit(`assets/img/${
      this.type === 'race' ?
        option : this.creatorService.selectedRace + '/' + option}`);
    this.router.navigate(['/main', this.type, option]);
  }
}
