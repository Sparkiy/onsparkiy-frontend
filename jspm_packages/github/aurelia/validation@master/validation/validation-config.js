/* */ 
System.register(['../validation/validation-locale', '../validation/validate-custom-attribute-view-strategy'], function (_export) {
  var ValidationLocale, ValidateCustomAttributeViewStrategy, _classCallCheck, ValidationConfigDefaults, ValidationConfig;

  return {
    setters: [function (_validationValidationLocale) {
      ValidationLocale = _validationValidationLocale.ValidationLocale;
    }, function (_validationValidateCustomAttributeViewStrategy) {
      ValidateCustomAttributeViewStrategy = _validationValidateCustomAttributeViewStrategy.ValidateCustomAttributeViewStrategy;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      ValidationConfigDefaults = function ValidationConfigDefaults() {
        _classCallCheck(this, ValidationConfigDefaults);
      };

      _export('ValidationConfigDefaults', ValidationConfigDefaults);

      ValidationConfigDefaults._defaults = {
        debounceTimeout: 0,
        dependencies: [],
        locale: 'en-US',
        localeResources: 'aurelia-validation/resources/',
        viewStrategy: ValidateCustomAttributeViewStrategy.TWBootstrapAppendToMessage
      };
      ValidationConfigDefaults.defaults = function () {
        var defaults = {};
        Object.assign(defaults, ValidationConfigDefaults._defaults);
        return defaults;
      };

      ValidationConfig = (function () {
        function ValidationConfig(innerConfig) {
          _classCallCheck(this, ValidationConfig);

          this.innerConfig = innerConfig;
          this.values = this.innerConfig ? {} : ValidationConfigDefaults.defaults();
          this.changedHandlers = new Map();
        }

        ValidationConfig.prototype.getValue = function getValue(identifier) {
          if (this.values.hasOwnProperty(identifier) !== null && this.values[identifier] !== undefined) {
            return this.values[identifier];
          }
          if (this.innerConfig !== null) {
            return this.innerConfig.getValue(identifier);
          }
          throw Error('Config not found: ' + identifier);
        };

        ValidationConfig.prototype.setValue = function setValue(identifier, value) {
          this.values[identifier] = value;
          return this;
        };

        ValidationConfig.prototype.onLocaleChanged = function onLocaleChanged(callback) {
          var _this = this;

          if (this.innerConfig !== undefined) {
            return this.innerConfig.onLocaleChanged(callback);
          } else {
            var _ret = (function () {
              var id = ++ValidationConfig.uniqueListenerId;
              _this.changedHandlers.set(id, callback);
              return {
                v: function () {
                  _this.changedHandlers['delete'](id);
                }
              };
            })();

            if (typeof _ret === 'object') {
              return _ret.v;
            }
          }
        };

        ValidationConfig.prototype.getDebounceTimeout = function getDebounceTimeout() {
          return this.getValue('debounceTimeout');
        };

        ValidationConfig.prototype.useDebounceTimeout = function useDebounceTimeout(value) {
          return this.setValue('debounceTimeout', value);
        };

        ValidationConfig.prototype.getDependencies = function getDependencies() {
          return this.getValue('dependencies');
        };

        ValidationConfig.prototype.computedFrom = function computedFrom(dependencies) {
          var deps = dependencies;
          if (typeof dependencies === 'string') {
            deps = [];
            deps.push(dependencies);
          }
          return this.setValue('dependencies', deps);
        };

        ValidationConfig.prototype.useLocale = function useLocale(localeIdentifier) {
          this.setValue('locale', localeIdentifier);
          var callbacks = Array.from(this.changedHandlers.values());
          for (var i = 0; i < callbacks.length; i++) {
            callbacks[i]();
          }
          return this;
        };

        ValidationConfig.prototype.locale = function locale() {
          return ValidationLocale.Repository.load(this.getValue('locale'), this.getValue('localeResources'));
        };

        ValidationConfig.prototype.useViewStrategy = function useViewStrategy(viewStrategy) {
          return this.setValue('viewStrategy', viewStrategy);
        };

        ValidationConfig.prototype.getViewStrategy = function getViewStrategy() {
          return this.getValue('viewStrategy');
        };

        return ValidationConfig;
      })();

      _export('ValidationConfig', ValidationConfig);

      ValidationConfig.uniqueListenerId = 0;
    }
  };
});