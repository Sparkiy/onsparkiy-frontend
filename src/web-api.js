/**
 * Created by Aleksandar Toplek on 22.6.2015..
 */

export class WebAPI {
  isRequesting = false;

  loginData = null;

  // Data
  SparkiyTokenCookieKey = "sparkiyToken";

  // API calls
  apiUrl = "https://api.onsparkiy.com/";
  apiToken = "token";
  apiProfile = "Profile";
  apiCheckUsername = "UserName/IsTaken";
  apiRegister = "Account/Register"

  checkUsername(username) {
    this.isRequesting = true;
    return new Promise(resolve => {

      // Request token POST call
      $.ajax({
        method: "GET",
        url: this.apiUrl + this.apiCheckUsername + "?username=" + username
      }).done(result => {
        resolve(result === false);

        this.isRequesting = false;
      });
    });
  }

  register(username, password, email) {
    this.isRequesting = true;
    return new Promise(resolve => {

      // Create request content
      let content = {
        username: username,
        password: password,
        email: email
      };

      // Request token POST call
      $.ajax({
        method: "POST",
        url: this.apiUrl + this.apiRegister,
        data: content
      }).done(result => {
        if (!result)
          resolve(true);
        resolve(false);

        this.isRequesting = false;
      });

    });
  }

  getToken(username, password) {
    this.isRequesting = true;
    return new Promise(resolve => {

      // Create request content
      let content = {
        grant_type: "password",
        username: username,
        password: password
      };

      // Request token POST call
      $.ajax({
        method: "POST",
        url: this.apiUrl + this.apiToken,
        data: content
      }).done(result => {
        let token = result.access_token;

        // Create login data
        this.loginData = this.createLoginData(token);

        // Save retrieved login data
        this.saveLoginData();

        resolve(this.loginData);
        this.isRequesting = false;
      });

    });
  }

  getProfile() {
    this.isRequesting = true;
    return new Promise(resolve => {
      // User must be logged in before this request
      if (!this.isLoggedIn()){
        resolve(null);
        this.isRequesting = false;
      }

      // Request profile GET call
      $.ajax({
        method: "GET",
        url: this.apiUrl + this.apiProfile,
        headers: {
          Authorization: this.loginData.Authorization
        }
      }).done(result => {
        // TODO Check result content

        // Resolve with retrieved result
        resolve(result);

        this.isRequesting = false;
      });

    });
  }

  isLoggedIn() {
    // Check if login data is available
    if (this.loginData == null)
    {
      // Try retrieve login data from cookies
      let token = this.loadToken();

      // Check if token exists
      if (!token || token == "") {
        return false;
      }
      else {
        // Create login data from token
        this.loginData = this.createLoginData(token);
      }
    }
    return true;
  }

  createLoginData(token) {
    return { Authorization: "Bearer " + token };
  }

  saveLoginData() {
    // Retrieve token from login data
    let token = this.loginData.Authorization.split(" ")[1];

    // Save token if exists
    if (token && token != "")
      this.saveToken(token);
  }

  getCookie(cname) {
    // Source: http://www.w3schools.com/js/js_cookies.asp
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
  }

  loadToken() {
    return this.getCookie(this.SparkiyTokenCookieKey);
  }

  saveToken(token) {
    // Create new token cookie that expires in 1 (one) day
    this.setCookie(this.SparkiyTokenCookieKey, token, 1);
  }

  setCookie(cname, cvalue, exdays) {
    // Source: http://www.w3schools.com/js/js_cookies.asp
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }
}
