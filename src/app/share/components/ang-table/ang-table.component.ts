import { Component, Input, EventEmitter, Output, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
export enum MONTH_ENUM { '一月' = 1, '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月', };
export interface FormaterDate {
  year: number;
  month: number;
  day: number;
  week?: number;
  stampYMD: number;
  symbolYMD: string;
  textYMD: string;
}
@Component({
  selector: 'ang-table',
  templateUrl: './ang-table.component.html',
  styleUrls: ['./ang-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AngTableComponent implements OnInit {
  MONTH_ENUM: any = MONTH_ENUM
  daterows: any[] = [];
  finllyDate: any;
  @Input('dateValue')
  set dateValue(value: any) {
    this.initValueAndUi(value)
  }
  @Output() outputDate: EventEmitter<FormaterDate> = new EventEmitter();

  constructor() {
    // this.finllyDate = {
    //   year: moment().year(),
    //   month: moment().month() + 1,
    //   day: moment().date(),
    //   stampYMD: moment().unix(), // miao cuo
    //   symbolYMD: `${moment().year()}-${moment().month() + 1}-${moment().date()}`,
    //   textYMD: `${moment().year()}年${moment().month() + 1}月${moment().date()}日`
    // }
    this.initValueAndUi(`${moment().year()}-${moment().month() + 1}-${moment().date()}`)
  }

  ngOnInit(): void {
    // this.renderUi()
  }
  initValueAndUi(datevalue: any) {
    if (!datevalue) return
    console.log('init', datevalue)
    try {
      let ymdString = '', year: number, month: number, day: number;
      if (Object.is(parseInt(datevalue), NaN) && parseInt(datevalue) > 100000) {
        ymdString = moment(parseInt(datevalue)).format('YYYY-MM-DD')
      } else if (typeof datevalue === 'string' && datevalue.indexOf('-') > -1) {
        ymdString = datevalue
      }
      const ymdArr: string[] = ymdString.split('-')
      year = Number(ymdArr[0]) || moment().year();
      month = Number(ymdArr[1]) || moment().month();
      day = Number(ymdArr[2]) || moment().day();
      this.finllyDate = { ...this.finllyDate, year, month, day }
      this.renderUi()
    } catch {

    }

  }
  renderUi() {
    this.daterows = [];
    this.finllyDate = { ...this.finllyDate, year: Number(this.finllyDate.year), month: Number(this.finllyDate.month) }
    let firstRowFillDaysTem = moment(`${this.finllyDate.year}-${this.finllyDate.month}`, 'YYYY-MM').date(1).weekday() || 7;
    let firstRowFillDays = firstRowFillDaysTem - 1;
    let getYear = this.finllyDate.month === 0 ? this.finllyDate.year - 1 : this.finllyDate.year;
    let getMonth = this.finllyDate.month === 0 ? 12 : this.finllyDate.month - 1;
    let previousMonthDays = moment(`${getYear} - ${getMonth}`, 'YYYY-MM').daysInMonth();
    let firstRowFillDaysArr = Array.from({ length: previousMonthDays }, (_, i) => 1 + (i)).reverse().slice(0, firstRowFillDays).sort();
    let bodyRowFillDays = moment(`${this.finllyDate.year}-${this.finllyDate.month}`, 'YYYY-MM').daysInMonth();
    let bodyRowFillDaysArr = Array.from({ length: bodyRowFillDays }, (_, i) => 1 + (i));
    let lastRowFillDays = 7 - ((firstRowFillDays + bodyRowFillDays) % 7);
    let lastRowFillDaysArr = Array.from({ length: lastRowFillDays }, (_, i) => 1 + (i));
    let forUiDaysArr: number[] = [...firstRowFillDaysArr, ...bodyRowFillDaysArr, ...lastRowFillDaysArr];
    forUiDaysArr.forEach((d, i) => {
      if ((i + 1) % 7 === 0) {
        this.daterows.push(forUiDaysArr.slice(i - 6, i + 1))
      }
    })
    this.formatDate()
  }
  changeYear() {
    this.renderUi()
  }
  changeMonth() {
    this.finllyDate = { ...this.finllyDate, month: this.finllyDate.month }
    this.renderUi()
  }
  selectDay(day: number) {
    this.finllyDate = { ...this.finllyDate, day }
    this.formatDate()
  }
  formatDate() {
    let stampYMD = moment().unix();// miao cuo
    let symbolYMD = `${this.finllyDate.year}-${this.finllyDate.month}-${this.finllyDate.day}`;
    let textYMD = `${this.finllyDate.year}年${this.finllyDate.month}月${this.finllyDate.day}日`;
    this.finllyDate = { ...this.finllyDate, stampYMD, symbolYMD, textYMD }
    console.log('Finally Year Month Day', this.finllyDate)
    this.outputDate.emit(this.finllyDate)
  }
}