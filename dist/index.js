System.register(['core-js', 'aurelia-framework', 'aurelia-logging-console'], function (_export) {
  'use strict';

  var core, Aurelia, LogManager, ConsoleAppender, logger, readyQueue, isReady, installedDevelopmentLogging;

  _export('bootstrap', bootstrap);

  function onReady(callback) {
    return new Promise(function (resolve, reject) {
      if (!isReady) {
        readyQueue.push(function () {
          try {
            resolve(callback());
          } catch (e) {
            reject(e);
          }
        });
      } else {
        resolve(callback());
      }
    });
  }

  function bootstrap(configure) {
    return onReady(function () {
      var loader = new window.AureliaLoader(),
          aurelia = new Aurelia(loader);

      return configureAurelia(aurelia).then(function () {
        return configure(aurelia);
      });
    });
  }

  function ready(global) {
    return new Promise(function (resolve, reject) {
      if (global.document.readyState === 'complete') {
        resolve(global.document);
      } else {
        global.document.addEventListener('DOMContentLoaded', completed, false);
        global.addEventListener('load', completed, false);
      }

      function completed() {
        global.document.removeEventListener('DOMContentLoaded', completed, false);
        global.removeEventListener('load', completed, false);
        resolve(global.document);
      }
    });
  }

  function ensureLoader() {
    if (!window.AureliaLoader) {
      if (window.System) {
        return System.normalize('aurelia-bootstrapper').then(function (bootstrapperName) {
          return System.normalize('aurelia-loader-default', bootstrapperName).then(function (loaderName) {
            return System['import'](loaderName);
          });
        });
      } else if (window.require) {
        return new Promise(function (resolve, reject) {
          require(['aurelia-loader-default'], resolve, reject);
        });
      } else {
        throw new Error('No window.AureliaLoader is defined and there is neither a System API (ES6) or a Require API (AMD) available to load your app.');
      }
    }

    return Promise.resolve();
  }

  function preparePlatform() {
    return System.normalize('aurelia-bootstrapper').then(function (bootstrapperName) {
      return System.normalize('aurelia-framework', bootstrapperName).then(function (frameworkName) {
        System.map['aurelia-framework'] = frameworkName;

        return System.normalize('aurelia-loader', frameworkName).then(function (loaderName) {
          var toLoad = [];

          if (!System.polyfilled) {
            logger.debug('loading core-js');
            toLoad.push(System.normalize('core-js', loaderName).then(function (name) {
              return System['import'](name);
            }));
          }

          toLoad.push(System.normalize('aurelia-dependency-injection', frameworkName).then(function (name) {
            System.map['aurelia-dependency-injection'] = name;
          }));

          toLoad.push(System.normalize('aurelia-router', bootstrapperName).then(function (name) {
            System.map['aurelia-router'] = name;
          }));

          toLoad.push(System.normalize('aurelia-logging-console', bootstrapperName).then(function (name) {
            System.map['aurelia-logging-console'] = name;
          }));

          if (!('import' in document.createElement('link'))) {
            logger.debug('loading the HTMLImports polyfill');
            toLoad.push(System.normalize('webcomponentsjs/HTMLImports.min', loaderName).then(function (name) {
              return System['import'](name);
            }));
          }

          if (!('content' in document.createElement('template'))) {
            logger.debug('loading the HTMLTemplateElement polyfill');
            toLoad.push(System.normalize('aurelia-html-template-element', loaderName).then(function (name) {
              return System['import'](name);
            }));
          }

          return Promise.all(toLoad);
        });
      });
    });
  }

  function configureAurelia(aurelia) {
    return System.normalize('aurelia-bootstrapper').then(function (bName) {
      var toLoad = [];

      toLoad.push(System.normalize('aurelia-templating-binding', bName).then(function (templatingBinding) {
        aurelia.use.defaultBindingLanguage = function () {
          aurelia.use.plugin(templatingBinding);
          return this;
        };
      }));

      toLoad.push(System.normalize('aurelia-templating-router', bName).then(function (templatingRouter) {
        aurelia.use.router = function () {
          aurelia.use.plugin(templatingRouter);
          return this;
        };
      }));

      toLoad.push(System.normalize('aurelia-history-browser', bName).then(function (historyBrowser) {
        aurelia.use.history = function () {
          aurelia.use.plugin(historyBrowser);
          return this;
        };
      }));

      toLoad.push(System.normalize('aurelia-templating-resources', bName).then(function (name) {
        System.map['aurelia-templating-resources'] = name;
        aurelia.use.defaultResources = function () {
          aurelia.use.plugin(name);
          return this;
        };
      }));

      toLoad.push(System.normalize('aurelia-event-aggregator', bName).then(function (eventAggregator) {
        System.map['aurelia-event-aggregator'] = eventAggregator;
        aurelia.use.eventAggregator = function () {
          aurelia.use.plugin(eventAggregator);
          return this;
        };
      }));

      aurelia.use.standardConfiguration = function () {
        aurelia.use.defaultBindingLanguage().defaultResources().history().router().eventAggregator();
        return this;
      };

      aurelia.use.developmentLogging = function () {
        if (!installedDevelopmentLogging) {
          installedDevelopmentLogging = true;
          LogManager.addAppender(new ConsoleAppender());
          LogManager.setLevel(LogManager.logLevel.debug);
        }
        return this;
      };

      return Promise.all(toLoad);
    });
  }

  function runningLocally() {
    return window.location.protocol !== 'http' && window.location.protocol !== 'https';
  }

  function handleApp(appHost) {
    var configModuleId = appHost.getAttribute('aurelia-app'),
        aurelia,
        loader;

    if (configModuleId) {
      loader = new window.AureliaLoader();

      return loader.loadModule(configModuleId).then(function (m) {
        aurelia = new Aurelia(loader);
        aurelia.host = appHost;
        return configureAurelia(aurelia).then(function () {
          return m.configure(aurelia);
        });
      });
    } else {
      aurelia = new Aurelia();
      aurelia.host = appHost;

      return configureAurelia(aurelia).then(function () {
        if (runningLocally()) {
          aurelia.use.developmentLogging();
        }

        aurelia.use.standardConfiguration();

        return aurelia.start().then(function (a) {
          return a.setRoot();
        });
      });
    }
  }

  function run() {
    return ready(window).then(function (doc) {
      var appHost = doc.querySelectorAll('[aurelia-app]');

      return ensureLoader().then(function () {
        return preparePlatform().then(function () {
          var i, ii;

          for (i = 0, ii = appHost.length; i < ii; ++i) {
            handleApp(appHost[i]);
          }

          isReady = true;
          for (i = 0, ii = readyQueue.length; i < ii; ++i) {
            readyQueue[i]();
          }
          readyQueue = [];
        });
      });
    });
  }

  return {
    setters: [function (_coreJs) {
      core = _coreJs['default'];
    }, function (_aureliaFramework) {
      Aurelia = _aureliaFramework.Aurelia;
      LogManager = _aureliaFramework.LogManager;
    }, function (_aureliaLoggingConsole) {
      ConsoleAppender = _aureliaLoggingConsole.ConsoleAppender;
    }],
    execute: function () {
      logger = LogManager.getLogger('bootstrapper');
      readyQueue = [];
      isReady = false;
      installedDevelopmentLogging = false;
      run();
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QWdCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQU07QUFDMUMsWUFBRyxjQUFjLEVBQUUsRUFBQztBQUNsQixpQkFBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQ2xDOztBQUVELGVBQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQzs7QUFFcEMsZUFBTyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztpQkFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO1NBQUEsQ0FBQyxDQUFDO09BQy9DLENBQUMsQ0FBQztLQUNKO0dBQ0Y7O0FBRUQsV0FBUyxHQUFHLEdBQUc7QUFDYixXQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHLEVBQUk7QUFDL0IsVUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDOztBQUVwRCxhQUFPLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQy9CLGVBQU8sZUFBZSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVU7QUFDdEMsY0FBSSxDQUFDLEVBQUUsRUFBRSxDQUFDOztBQUVWLGVBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFO0FBQzVDLHFCQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7V0FDdkI7O0FBRUQsaUJBQU8sR0FBRyxJQUFJLENBQUM7QUFDZixlQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtBQUMvQyxzQkFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7V0FDakI7QUFDRCxvQkFBVSxHQUFHLEVBQUUsQ0FBQztTQUNqQixDQUFDLENBQUM7T0FDSixDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7R0FDSjs7Ozs7O2tDQTVPTyxPQUFPO3FDQUFFLFVBQVU7OytDQUNuQixlQUFlOzs7QUFFbkIsWUFBTSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO0FBRTdDLGdCQUFVLEdBQUcsRUFBRTtBQUNmLGFBQU8sR0FBRyxLQUFLO0FBK0dmLGlDQUEyQixHQUFHLEtBQUs7QUF5SHZDLFNBQUcsRUFBRSxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==