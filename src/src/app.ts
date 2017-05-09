import {Aurelia} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Zühlke User Profile System';
    config.map([
      { route: ['', 'searchUsers'], name: 'searchUsers',      moduleId: PLATFORM.moduleName('./searchUsers'),      nav: true, title: 'Search Users' },
    ]);

    this.router = router;
  }
}
