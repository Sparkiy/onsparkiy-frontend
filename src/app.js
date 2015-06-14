/**
 * Created by Aleksandar Toplek on 14.6.2015..
 */

import "modernizr";
import "fastclick";

export class App {
  configureRouter(config, router) {
    config.title = "Sparkiy";
    config.map([
      { route: ["", "auth"], moduleId: "./auth", nav: false, title: "Login" }
    ]);

    this.router = router;
  }

}
