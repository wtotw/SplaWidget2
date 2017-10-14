/// <reference path='../../typings/index.d.ts' />

'use strict';

import * as $ from 'jquery';

class Option {
  notification: string;
  mainSkill: string;
  subSkill: string;

  constructor() {
    this.setNotification(localStorage['notification']);
    this.setMainSkill(localStorage['mainSkill']);
    this.setSubSkill(localStorage['subSkill']);

    if (localStorage['notification'] !== 'undefined') {
      const notification = $('.notification input')[0] as HTMLInputElement;
      notification.checked = localStorage['notification'] === 'true' ? true : false;
    } else {
      const notification = $('.notification input')[0] as HTMLInputElement;
      notification.checked = true;
      localStorage['notification'] = 'true';
    }

    if (localStorage['mainSkill'] !== 'undefined') {
      const mainSkill = $(`.skill.main.${localStorage['mainSkill']}`)[0] as HTMLInputElement;
      mainSkill.checked = true;
    } else {
      const mainSkill = $(`.skill.main`)[0] as HTMLInputElement;
      mainSkill.checked = true;
      localStorage['mainSkill'] = mainSkill.value;
    }

    if (localStorage['subSkill'] !== 'undefined') {
      const subSkill = $(`.skill.sub.${localStorage['subSkill']}`)[0] as HTMLInputElement;
      subSkill.checked = true;
    } else {
      const subSkill = $(`.skill.sub`)[0] as HTMLInputElement;
      subSkill.checked = true;
      localStorage['subSkill'] = subSkill.value;
    }
  }

  public setNotification(notification: string) {
    this.notification = notification;
    localStorage['notification'] = notification;
  }

  public getNotification(): string {
    return this.notification;
  }

  public setMainSkill(mainSkill: string) {
    this.mainSkill = mainSkill;
    localStorage['mainSkill'] = mainSkill;
  }

  public getMainSkill(): string {
    return this.mainSkill;
  }

  public setSubSkill(subSkill: string) {
    this.subSkill = subSkill;
    localStorage['subSkill'] = subSkill;
  }

  public getSubSkill(): string {
    return this.subSkill;
  }
}

const option = new Option();
$('.optionTitle').text(chrome.i18n.getMessage('option'));
$('.mainSkill .title').text(chrome.i18n.getMessage('mainSkill'));
$('.subSkill .title').text(chrome.i18n.getMessage('subSkill'));

$('.notification input').on('change', () => {
  const notification = $('.notification input')[0] as HTMLInputElement;
  option.setNotification(notification.checked.toString());
});

$('.mainSkill input').on('change', () => {
  const mainSkill = $('.mainSkill input:checked')[0] as HTMLInputElement;
  option.setMainSkill(mainSkill.value.toString());
});

$('.subSkill input').on('change', () => {
  const subSkill = $('.subSkill input:checked')[0] as HTMLInputElement;
  option.setSubSkill(subSkill.value.toString());
});