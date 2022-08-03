import {Component, EventEmitter, HostBinding, OnInit, Output, Renderer2} from '@angular/core';
import {ColorEvent} from "ngx-color";
import {Inject} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {CreatorService, cTheme} from "../creator.service";

@Component({
  selector: 'app-theming',
  templateUrl: './theming.component.html',
  styleUrls: ['./theming.component.scss']
})
export class ThemingComponent implements OnInit {
  @Output() colorEmiter: EventEmitter<string> = new EventEmitter<string>();
  @HostBinding('class')
  get themeMode(){
      return this.isDark ? 'my-dark-theme' : 'my-light-theme'
  }
  public isDark = this.cService.isThemeDark;
  public charBgColor: string = '#fff';

  constructor( private cService: CreatorService,
               @Inject(DOCUMENT) private document: Document,
               private renderer: Renderer2) { }

  ngOnInit(): void {
    this.colorThemeChanged(this.isDark);
    // this.renderer.setAttribute(this.document.body, 'class', 'my-light-theme')
  }

  public colorThemeChanged(e: boolean) {
    this.isDark = this.cService.isThemeDark = e;

    const hostTheme = this.isDark ? 'my-dark-theme' : 'my-light-theme'
    this.renderer.setAttribute(this.document.body, 'class', hostTheme)
  }

  public emitcolorChange(e: string): void {
    this.colorEmiter.emit(e);
    this.charBgColor = this.cService.charBgColor = e;
  }

  public saveSettings(){
    const colors: cTheme = {
      bgCharColor: this.cService.charBgColor,
      isDarkTheme: this.isDark,
    }
    console.log(colors);
    localStorage.setItem('colors', JSON.stringify(colors));
  }
}
