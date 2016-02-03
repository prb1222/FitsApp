FitsApp.Views.LoginView = Backbone.CompositeView.extend({
  template: JST['session/login'],

  className: "login-view",

  namefields: JST['session/namefields'],

  events: {
    "change #sign-in-button, #sign-up-button":"changeFields",
    "submit #user-auth-form":"submitForm"
  },

  initialize: function () {
    this.footer = new FitsApp.Views.Footer();
    this.addSubview('#footer-view', this.footer);
  },

  render: function () {
      var content = this.template();
      this.$el.html(content);
      this.attachSubviews();
      return this;
  },

  changeFields: function (event) {
    if (event.currentTarget.id === "sign-in-button") {
      this.$el.find('#name-fields').empty();
    } else {
      this.$el.find('#name-fields').html(this.namefields());
    }
  },

  submitForm: function (event) {
    event.preventDefault();
    if (this.$el.find("#sign-up-button").is(":checked")) {
      var url = "users";
      var fname = this.$el.find("#fname").val();
      var lname = this.$el.find("#lname").val();
    } else  {
      var url = "session"
    }
    var $errors = this.$el.find(".errors");
    $errors.empty();
    var email = this.$el.find("#email").val();
    var password = this.$el.find("#pwd").val();
    var data = {
      fname: fname || null,
      lname: lname || null,
      email: email,
      password: password
    };

    $.ajax({
      type: "POST",
      url: url,
      data: {user: data},
      dataType: "json"
    })
    .success(function(data, textStatus, jqXHR) {
        FitsApp.SessionModel.set(data);
        Backbone.history.navigate("dashboard", {trigger: true});
      }.bind(this))
    .error(function(errorsObjs, error, errorType) {
        var parsedArray = this.parseErrorText(errorsObjs.responseJSON);
        parsedArray.forEach(function(error){$errors.append("<li>" + error + "</li>")});
      }.bind(this));
  },

  parseErrorText: function(errorsArray) {
    var parsedArray = [];
    var fregex = /Fname/;
    var lregex = /Lname/;

    errorsArray.forEach(function(error){
      if (fregex.test(error)) {
        parsedArray.push("First " + error.slice(1));
      } else if (lregex.test(error)) {
        parsedArray.push("Last " + error.slice(1));
      } else {
        parsedArray.push(error);
      }
    })

    return parsedArray
  }
})
