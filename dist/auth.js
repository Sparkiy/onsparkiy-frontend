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
          this.setEnabledSubmitCommand(false);

          if (this.isRegister) {
            this.register();
          } else {
            this.login();
          }
        };

        Auth.prototype.setEnabledSubmitCommand = function setEnabledSubmitCommand(isEnabled) {
          if (isEnabled) $("#submit-form-signin").removeAttr("disabled");else $("#submit-form-signin").attr("disabled", "disabled");
        };

        Auth.prototype.register = function register() {
          var _this = this;

          this.api.checkUsername(this.username).then(function (isValid) {
            if (isValid) {
              _this.api.register(_this.username, _this.password, _this.email).then(function (result) {
                if (result) _this.login();else console.error("Failed to register");

                _this.setEnabledSubmitCommand(true);
              });
            } else {}

            _this.setEnabledSubmitCommand(true);
          });
        };

        Auth.prototype.login = function login() {
          var _this2 = this;

          this.api.getToken(this.username, this.password).then(function (result) {
            _this2.router.navigate('profile');
          });
        };

        Auth.prototype.signUpClick = function signUpClick() {
          this.isRegister = true;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dEQVdhLElBQUk7Ozs7Ozs7O2lDQVBULE1BQU07dUNBSU4sWUFBWTs7OEJBSFosTUFBTTs7dUJBQ04sTUFBTTs7c0NBQ04sVUFBVTs7O0FBSUwsVUFBSTtxQkFBSixJQUFJOztpQkFLQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7Ozs7QUFDckIsaUJBTkEsSUFBSSxDQU1ILE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0NBTmQsSUFBSTs7ZUFDZixVQUFVLEdBQUcsS0FBSztlQUNsQixVQUFVLEdBQUcsaUJBQWlCO2VBQzlCLGdCQUFnQixHQUFHLFFBQVE7O0FBSXpCLGNBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLGNBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDOztBQUVmLGNBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ25CLGNBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLGNBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1NBQ3BCOztBQWJVLFlBQUksV0FlZixVQUFVLEdBQUEsc0JBQUc7QUFDWCxjQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBR3BDLGNBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNuQixnQkFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1dBQ2pCLE1BQ0k7QUFDSCxnQkFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1dBQ2Q7U0FDRjs7QUF6QlUsWUFBSSxXQTJCZix1QkFBdUIsR0FBQSxpQ0FBQyxTQUFTLEVBQUU7QUFDakMsY0FBSSxTQUFTLEVBRVgsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBR2hELENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDekQ7O0FBbENVLFlBQUksV0FvQ2YsUUFBUSxHQUFBLG9CQUFHOzs7QUFFVCxjQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTyxFQUFJO0FBRXBELGdCQUFJLE9BQU8sRUFBRTtBQUNYLG9CQUFLLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBSyxRQUFRLEVBQUUsTUFBSyxRQUFRLEVBQUUsTUFBSyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDekUsb0JBQUksTUFBTSxFQUNSLE1BQUssS0FBSyxFQUFFLENBQUMsS0FDVixPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7O0FBRXpDLHNCQUFLLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO2VBQ3BDLENBQUMsQ0FBQzthQUNKLE1BQ0ksRUFFSjs7QUFFRCxrQkFBSyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztXQUNwQyxDQUFDLENBQUM7U0FDSjs7QUF2RFUsWUFBSSxXQXlEZixLQUFLLEdBQUEsaUJBQUc7OztBQUNOLGNBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUM3RCxtQkFBSyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1dBQ2pDLENBQUMsQ0FBQztTQUNKOztBQTdEVSxZQUFJLFdBK0RmLFdBQVcsR0FBQSx1QkFBRztBQUNaLGNBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDOztBQUd2QixXQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3JFLFdBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOztBQUdqQyxjQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7QUFJN0IsV0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzdDLGNBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7O0FBR2xDLFdBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzdCOztlQWhGVSxJQUFJIiwiZmlsZSI6ImF1dGguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
