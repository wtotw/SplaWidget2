'use strict';

import * as Config from './Config';
import * as request from 'superagent';

export class Splatoon {

  public getGearInfo() {
    return new Promise((resolve, reject) => {
      request
      .get(Config.API.GET_GEAR)
      .then((respons) => {
        resolve(JSON.parse(respons.text));
      })
      .catch((error) => {
        console.log(error);
        reject(JSON.parse('{}'));
      });
    });
  }

}