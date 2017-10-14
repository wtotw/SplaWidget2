/// <reference path='../../typings/index.d.ts' />

'use strict';

import * as request from 'superagent';
import * as moment from 'moment';
import * as $ from 'jquery';
import * as co from 'co';
import * as Config from './component/Config';

import {Splatoon} from './component/Splatoon';

class SplaWidget extends Splatoon {
  schedules:  any;
  gears: any;

  constructor() {
    super();
  }

  public setGears(gears: any) {
    this.gears = gears;
  }

  public getGears(): any {
    return this.gears;
  }

  public updateGears() {
    const gearsArea = $('#gesotown .gears');
    const now = moment();

    this.gears.forEach((gear: any, index: number) => {
      // 残り時間計算
      const endTime = moment.unix(gear.end_time);
      const countDown = endTime.diff(now, 'm');
      const countDownHour = Math.floor(countDown / 60);
      const countDownMin = countDown % 60;

      // レア度表示
      const slot = `<img src="${Config.AWS.S3}/skill/hatena.png">`;
      let skillSlot = '';
      for (let i = 0; i <= gear.gear.rarity; i++) {
        skillSlot += slot;
      }

      gearsArea.append(`<dl id="gear${index + 1}"></dl>`);
      const gearRow = $(`dl#gear${index + 1}`);
      gearRow.append(
        `<div class="leftItem">
          <dt class="image"><img src="${Config.AWS.S3}/gear/${(gear.kind)}/${(gear.gear.name).replace(/[^a-zA-Z0-9]/g, '')}.png"></dt>
        </div>`
      );

      gearRow.append(
        `<div class="rightItem">
          <div class="baseInfo">
            <dt class="name">${chrome.i18n.getMessage((gear.gear.name).replace(/[^a-zA-Z0-9]/g, ''))}</dt>
            <dt class="countDown">${chrome.i18n.getMessage('countDown', [countDownHour, countDownMin])}</dt>
          </div>
          <div class="gearInfo">
            <dt class="mainSkill"><img src="${Config.AWS.S3}/skill/${(gear.skill.name).replace(/[^a-zA-Z0-9]/g, '')}.png"></dt>
            <dt class="skillSlot">${skillSlot}</dt>
            <dt class="subSkill"><img src="${Config.AWS.S3}/skill/${(gear.gear.brand.frequent_skill.name).replace(/[^a-zA-Z0-9]/g, '')}.png"></dt>
            <dt class="brand"><img src="${Config.AWS.S3}/brand/${(gear.gear.brand.name).replace(/[^a-zA-Z0-9]/g, '')}.png"></dt>
            <dt class="price">${String(gear.price).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')} G</dt>
          </div>
        </div>`
      );
    });
  }
}


const splawidget: SplaWidget = new SplaWidget();

co(function *() {
  $('#reloadButton').text(chrome.i18n.getMessage('reload'));
  $('.fullScreen').show();
  const gears = yield splawidget.getGearInfo();
  splawidget.setGears(gears.merchandises);
  splawidget.updateGears();
  $('.fullScreen').hide();
});


$('#reloadButton').on('click', function() {
  location.reload();
});