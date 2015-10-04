/**
 * Created by Aleksandar Toplek on 14.6.2015..
 */

import {Router} from 'aurelia-router';
import "modernizr";
import "fastclick";

export class App {
  static inject() {
    return [Router];
  }

  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = "Sparkiy";
      config.map([
        {route: ["", "auth"], moduleId: "./auth", nav: false, title: "Login"},
        {route: ["profile"], moduleId: "./user-router"}
      ]);
    });
  }
}
