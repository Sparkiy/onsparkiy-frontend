/**
 * Created by Aleksandar Toplek on 22.6.2015..
 */

import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {WebAPI} from './web-api';
import "jquery";

export class Profile {
  router = null;
  api = null;

  username = "";

  static inject = [Router, WebAPI];
  constructor(router, api) {
    this.router = router;
    this.api = api;

    this.api.getProfile().then(result => {
      if (result) {
        console.log(result);
        this.username = result.user.userName;
      }
    });
  }
}
