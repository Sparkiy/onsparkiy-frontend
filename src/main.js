/**
 * Created by Aleksandar Toplek on 14.6.2015..
 */

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-validation');

  aurelia.start().then(a => a.setRoot('app', document.body));
}
