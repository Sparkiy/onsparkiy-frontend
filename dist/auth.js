System.register(['aurelia-framework', 'aurelia-router', './web-api', 'aurelia-validation', 'jquery'], function (_export) {
  'use strict';

  var inject, computedFrom, Router, WebAPI, Validation, Auth;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_webApi) {
      WebAPI = _webApi.WebAPI;
    }, function (_aureliaValidation) {
      Validation = _aureliaValidation.Validation;
    }, function (_jquery) {}],
    execute: function () {
      Auth = (function () {
        function Auth(router, api) {
          _classCallCheck(this, Auth);

          this.isRegister = false;
          this.headerText = 'Registered User';
          this.actionButtonText = 'Log in';

          this.router = router;
          this.api = api;

          this.username = '';
          this.email = '';
          this.password = '';
        }

        Auth.prototype.submitForm = function submitForm() {
          if (this.isRegister) {} else {
            this.login();
          }
        };

        Auth.prototype.login = function login() {
          var _this = this;

          this.api.getToken(this.username, this.password).then(function (result) {
            _this.router.navigate('profile');
          });
        };

        Auth.prototype.signUpClick = function signUpClick() {
          $('.signup-field').removeClass('hidden').addClass('appear-vertical');
          $('.signup-field input').focus();

          this.headerText = 'New User';

          $('.action-button').removeClass('secondary');
          this.actionButtonText = 'Sign up';

          $('.signup-message').hide();
        };

        _createClass(Auth, null, [{
          key: 'inject',
          value: [Router, WebAPI],
          enumerable: true
        }]);

        return Auth;
      })();

      _export('Auth', Auth);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dEQVdhLElBQUk7Ozs7Ozs7O2lDQVBULE1BQU07dUNBSU4sWUFBWTs7OEJBSFosTUFBTTs7dUJBQ04sTUFBTTs7c0NBQ04sVUFBVTs7O0FBSUwsVUFBSTtBQU1KLGlCQU5BLElBQUksQ0FNSCxNQUFNLEVBQUUsR0FBRyxFQUFFO2dDQU5kLElBQUk7O2VBQ2YsVUFBVSxHQUFHLEtBQUs7ZUFDbEIsVUFBVSxHQUFHLGlCQUFpQjtlQUM5QixnQkFBZ0IsR0FBRyxRQUFROztBQUl6QixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixjQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQzs7QUFFZixjQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNuQixjQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNoQixjQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztTQUNwQjs7QUFiVSxZQUFJLFdBZWYsVUFBVSxHQUFBLHNCQUFHO0FBRVgsY0FBSSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBRXBCLE1BQ0k7QUFDSCxnQkFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1dBQ2Q7U0FDRjs7QUF2QlUsWUFBSSxXQXlCZixLQUFLLEdBQUEsaUJBQUc7OztBQUNOLGNBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUM3RCxrQkFBSyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1dBQ2pDLENBQUMsQ0FBQztTQUNKOztBQTdCVSxZQUFJLFdBK0JmLFdBQVcsR0FBQSx1QkFBRztBQUVaLFdBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDckUsV0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7O0FBR2pDLGNBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDOztBQUk3QixXQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDN0MsY0FBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQzs7QUFHbEMsV0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDN0I7O3FCQTlDVSxJQUFJOztpQkFLQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7Ozs7ZUFMckIsSUFBSTs7O3NCQUFKLElBQUkiLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=