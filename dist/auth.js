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
        _createClass(Auth, null, [{
          key: 'inject',
          value: [Router, WebAPI],
          enumerable: true
        }]);

        function Auth(router, api) {
          _classCallCheck(this, Auth);

          this.isRegister = false;
          this.headerText = "Registered User";
          this.actionButtonText = "Log in";

          this.router = router;
          this.api = api;

          this.username = "";
          this.email = "";
          this.password = "";
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
          $(".signup-field").removeClass("hidden").addClass("appear-vertical");
          $(".signup-field input").focus();

          this.headerText = "New User";

          $(".action-button").removeClass("secondary");
          this.actionButtonText = "Sign up";

          $(".signup-message").hide();
        };

        return Auth;
      })();

      _export('Auth', Auth);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dEQVdhLElBQUk7Ozs7Ozs7O2lDQVBULE1BQU07dUNBSU4sWUFBWTs7OEJBSFosTUFBTTs7dUJBQ04sTUFBTTs7c0NBQ04sVUFBVTs7O0FBSUwsVUFBSTtxQkFBSixJQUFJOztpQkFLQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7Ozs7QUFDckIsaUJBTkEsSUFBSSxDQU1ILE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0NBTmQsSUFBSTs7ZUFDZixVQUFVLEdBQUcsS0FBSztlQUNsQixVQUFVLEdBQUcsaUJBQWlCO2VBQzlCLGdCQUFnQixHQUFHLFFBQVE7O0FBSXpCLGNBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLGNBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDOztBQUVmLGNBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ25CLGNBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLGNBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1NBQ3BCOztBQWJVLFlBQUksV0FlZixVQUFVLEdBQUEsc0JBQUc7QUFFWCxjQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFFcEIsTUFDSTtBQUNILGdCQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7V0FDZDtTQUNGOztBQXZCVSxZQUFJLFdBeUJmLEtBQUssR0FBQSxpQkFBRzs7O0FBQ04sY0FBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQzdELGtCQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7V0FDakMsQ0FBQyxDQUFDO1NBQ0o7O0FBN0JVLFlBQUksV0ErQmYsV0FBVyxHQUFBLHVCQUFHO0FBRVosV0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNyRSxXQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7QUFHakMsY0FBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7O0FBSTdCLFdBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM3QyxjQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDOztBQUdsQyxXQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUM3Qjs7ZUE5Q1UsSUFBSSIsImZpbGUiOiJhdXRoLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
