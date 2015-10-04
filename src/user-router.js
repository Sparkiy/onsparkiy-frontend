/**
 * Created by Aleksandar Toplek on 28.6.2015..
 */

export class UserRouter {
  configureRouter(config, router){
    config.map([
      { route: ['', 'me'],  moduleId: './profile', nav: true, title: 'My profile' }
    ]);

    this.router = router;
  }
}
