System.register([], function (_export) {
  "use strict";

  var WebAPI;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      WebAPI = (function () {
        function WebAPI() {
          _classCallCheck(this, WebAPI);

          this.isRequesting = false;
          this.loginData = null;
          this.SparkiyTokenCookieKey = "sparkiyToken";
          this.apiUrl = "https://api.onsparkiy.com/";
          this.apiToken = "token";
          this.apiProfile = "Profile";
          this.apiCheckUsername = "UserName/IsTaken";
          this.apiRegister = "Account/Register";
        }

        WebAPI.prototype.checkUsername = function checkUsername(username) {
          var _this = this;

          this.isRequesting = true;
          return new Promise(function (resolve) {
            $.ajax({
              method: "GET",
              url: _this.apiUrl + _this.apiCheckUsername + "?username=" + username
            }).done(function (result) {
              resolve(result === false);

              _this.isRequesting = false;
            });
          });
        };

        WebAPI.prototype.register = function register(username, password, email) {
          var _this2 = this;

          this.isRequesting = true;
          return new Promise(function (resolve) {
            var content = {
              username: username,
              password: password,
              email: email
            };

            $.ajax({
              method: "POST",
              url: _this2.apiUrl + _this2.apiRegister,
              data: content
            }).done(function (result) {
              if (!result) resolve(true);
              resolve(false);

              _this2.isRequesting = false;
            });
          });
        };

        WebAPI.prototype.getToken = function getToken(username, password) {
          var _this3 = this;

          this.isRequesting = true;
          return new Promise(function (resolve) {
            var content = {
              grant_type: "password",
              username: username,
              password: password
            };

            $.ajax({
              method: "POST",
              url: _this3.apiUrl + _this3.apiToken,
              data: content
            }).done(function (result) {
              var token = result.access_token;

              _this3.loginData = _this3.createLoginData(token);

              _this3.saveLoginData();

              resolve(_this3.loginData);
              _this3.isRequesting = false;
            });
          });
        };

        WebAPI.prototype.getProfile = function getProfile() {
          var _this4 = this;

          this.isRequesting = true;
          return new Promise(function (resolve) {
            if (!_this4.isLoggedIn()) {
              resolve(null);
              _this4.isRequesting = false;
            }

            $.ajax({
              method: "GET",
              url: _this4.apiUrl + _this4.apiProfile,
              headers: {
                Authorization: _this4.loginData.Authorization
              }
            }).done(function (result) {
              resolve(result);

              _this4.isRequesting = false;
            });
          });
        };

        WebAPI.prototype.isLoggedIn = function isLoggedIn() {
          if (this.loginData == null) {
            var token = this.loadToken();

            if (!token || token == "") {
              return false;
            } else {
              this.loginData = this.createLoginData(token);
            }
          }
          return true;
        };

        WebAPI.prototype.createLoginData = function createLoginData(token) {
          return { Authorization: "Bearer " + token };
        };

        WebAPI.prototype.saveLoginData = function saveLoginData() {
          var token = this.loginData.Authorization.split(" ")[1];

          if (token && token != "") this.saveToken(token);
        };

        WebAPI.prototype.getCookie = function getCookie(cname) {
          var name = cname + "=";
          var ca = document.cookie.split(';');
          for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
          }
          return "";
        };

        WebAPI.prototype.loadToken = function loadToken() {
          return this.getCookie(this.SparkiyTokenCookieKey);
        };

        WebAPI.prototype.saveToken = function saveToken(token) {
          this.setCookie(this.SparkiyTokenCookieKey, token, 1);
        };

        WebAPI.prototype.setCookie = function setCookie(cname, cvalue, exdays) {
          var d = new Date();
          d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
          var expires = "expires=" + d.toUTCString();
          document.cookie = cname + "=" + cvalue + "; " + expires;
        };

        return WebAPI;
      })();

      _export("WebAPI", WebAPI);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFNLFdBc0tqQixTQUFTLEdBQUEsbUJBQUMsS0FBSyxFQUFFO0FBRWYsY0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3REOztBQXpLVSxjQUFNLFdBMktqQixTQUFTLEdBQUEsbUJBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFFL0IsY0FBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUNuQixXQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBSSxNQUFNLEdBQUMsRUFBRSxHQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsSUFBSSxBQUFDLENBQUMsQ0FBQztBQUNoRCxjQUFJLE9BQU8sR0FBRyxVQUFVLEdBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ3pDLGtCQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsTUFBTSxHQUFHLElBQUksR0FBRyxPQUFPLENBQUM7U0FDekQ7O2VBakxVLE1BQU0iLCJmaWxlIjoid2ViLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
