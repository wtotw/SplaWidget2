/// <reference path='../../typings/index.d.ts' />

'use strict';

import * as request from 'superagent';
import * as moment from 'moment';
import * as $ from 'jquery';
import * as co from 'co';

import {Splatoon} from './component/Splatoon';

chrome.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion);

  localStorage['notification'] = 'true';
  localStorage['mainSkill'] = 'undefined';
  localStorage['subSkill'] = 'undefined';
  localStorage['completion'] = 'undefined';
});

const splatoon: Splatoon = new Splatoon();

function sleep(ms: number) {
  return function (fn: any) {
    setTimeout(fn, ms);
  };
}

co(function *() {
  while (true) {
    const notification = localStorage['notification'] === 'true' ? true : false;
    const mainSkill = localStorage['mainSkill'];
    const subSkill = localStorage['subSkill'];
    const completion = localStorage['completion'];
    let notificationFlg = false;

    if (notification && !(mainSkill === 'hatena' && subSkill === 'hatena')) {
      const gearsInfo = yield splatoon.getGearInfo();
      const gears = gearsInfo.merchandises;

      for (const gear of gears) {
        if (mainSkill === (gear.skill.name).replace(/[^a-zA-Z0-9]/g, '') || mainSkill === 'hatena') {
          if (subSkill === (gear.gear.brand.frequent_skill.name).replace(/[^a-zA-Z0-9]/g, '') || subSkill === 'hatena') {
            const reg = new RegExp(gear.id);
            if (!completion.match(reg)) {
              notificationFlg = true;
              if (completion.split(',').length <= 6) {
                localStorage['completion'] = completion + ',' + gear.id;
              } else {
                localStorage['completion'] = completion.replace(/.*,/, '') + ',' + gear.id;
              }
            }
          }
        }
      }

      if (notificationFlg) {
        const n = new Notification('ギアが見つかりました！');
      }
    }
    yield sleep(1000 * 60 * 10);
  }
});

