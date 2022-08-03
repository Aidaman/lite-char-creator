import {Injectable} from "@angular/core";
import {Races} from "../enums/races"
import {Classes} from "../enums/classes";

export const FORMS: { [key: string]: (Races | Classes)[] } = {
  race: [Races.HUMAN, Races.ELF, Races.DWARF, ],
  class: [Classes.WARRIOR, Classes.RANGER, Classes.MAGE, ],
};

export interface Modal {
  isSystem?: boolean
  trigger: string;
  text: string[];
}

export interface cTheme {
  bgCharColor: string;
  isDarkTheme: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CreatorService{
  public isThemeDark: boolean = false;
  public charBgColor: string = '#fff';

  public selectedRace: string = '';
  public selectedClass: string = '';

  public modalMessages: Modal[] = [
    {
      isSystem: true,
      trigger: '',
      text: ['the first is', 'Race', 'everyone is crazy about it now...'],
    },
    {
      trigger: 'human|',
      text: ["Lol what?", "Human?!", "you're human IRL"],
    },
    {
      trigger: 'elf|',
      text: ['Elf!?', 'Are you gay?'],
    },
    {
      trigger: 'dwarf|',
      text: ['good choice'],
    },
    {
      isSystem: true,
      trigger: 'choose class',
      text: ['the second:', 'Class', 'Second but not the least'],
    },
    {
      trigger: 'human|warrior',
      text: ['"Original"'],
    },
    {
      trigger: 'dwarf|warrior',
      text: ['Classic'],
    },
    {
      trigger: 'dwarf|mage',
      text: ['Lol really?'],
    },
  ];

  constructor(){
    const colors: cTheme = JSON.parse(localStorage.getItem('colors') as string)
    console.log(colors);
    if (colors){
      this.isThemeDark = colors.isDarkTheme;
      this.charBgColor = colors.bgCharColor;
    }
    // this.changeTheme(this.isThemeDark);
  }

}
