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
      if (global.document.readyState === "complete") {
        resolve(global.document);
      } else {
        global.document.addEventListener("DOMContentLoaded", completed, false);
        global.addEventListener("load", completed, false);
      }

      function completed() {
        global.document.removeEventListener("DOMContentLoaded", completed, false);
        global.removeEventListener("load", completed, false);
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

          if (!("content" in document.createElement("template"))) {
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
      var appHost = doc.querySelectorAll("[aurelia-app]");

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
//# sourceMappingURL=data:application/json;base64,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QU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQzFDLFlBQUcsY0FBYyxFQUFFLEVBQUM7QUFDbEIsaUJBQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUNsQzs7QUFFRCxlQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUM7O0FBRXBDLGVBQU8sT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7aUJBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtTQUFBLENBQUMsQ0FBQztPQUMvQyxDQUFDLENBQUM7S0FDSjtHQUNGOztBQUVELFdBQVMsR0FBRyxHQUFHO0FBQ2IsV0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRyxFQUFJO0FBQy9CLFVBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7QUFFcEQsYUFBTyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBTTtBQUMvQixlQUFPLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFVO0FBQ3RDLGNBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQzs7QUFFVixlQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtBQUM1QyxxQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1dBQ3ZCOztBQUVELGlCQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ2YsZUFBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7QUFDL0Msc0JBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1dBQ2pCO0FBQ0Qsb0JBQVUsR0FBRyxFQUFFLENBQUM7U0FDakIsQ0FBQyxDQUFDO09BQ0osQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0dBQ0o7Ozs7OztrQ0E1T08sT0FBTztxQ0FBRSxVQUFVOzsrQ0FDbkIsZUFBZTs7O0FBRW5CLFlBQU0sR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztBQUU3QyxnQkFBVSxHQUFHLEVBQUU7QUFDZixhQUFPLEdBQUcsS0FBSztBQStHZixpQ0FBMkIsR0FBRyxLQUFLO0FBeUh2QyxTQUFHLEVBQUUsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
