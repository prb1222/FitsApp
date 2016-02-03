FitsApp.Views.NavBar = Backbone.View.extend({
  template: JST['main/navbar'],

  className: "navigation-container",

  events: {
    "click #how-it-works-link":"scrollToSection",
    "click #why-fits-link":"scrollToSection",
    "click #sign-in":"navigateToLogin",
    "click #sign-out":"signOut",
    "click #greeting":"navigateToDashboard"
  },

  initialize: function (options) {
    this.currentUser = options.currentUser;
  },

  render: function() {
    var content = this.template()
    this.$el.html(content);
    if (FitsApp.SessionModel.get("session_token")) {
      this.$el.find('#greeting').removeClass("hidden");
      this.$el.find('#sign-out').removeClass("hidden");
    } else {
      this.$el.find('#sign-in').removeClass("hidden");
    }
    return this;
  },

  scrollToSection: function (event) {
    event.preventDefault();
    var targetId = event.currentTarget.id
    var $target = $("." + targetId.slice(0, targetId.length - 5));
    if (!$target.text().length) {
      Backbone.history.navigate("/", {trigger: true});
    }
    $target = $("." + targetId.slice(0, targetId.length - 5));
    $('html, body').animate({
        scrollTop: $target.offset().top - 130
    }, 500);
  },

  navigateToLogin: function (event) {
    event.preventDefault();
    Backbone.history.navigate("login", {trigger: true});
  },

  navigateToDashboard: function (event) {
    event.preventDefault();
    Backbone.history.navigate("dashboard", {trigger: true});
  },

  signOut: function (event) {
    if (this.signingOut) {return;}
    this.signingOut = true;
    event.preventDefault();
    $.ajax({
      type: "DELETE",
      url: "session",
      dataType: "text"
    })
    .success(function(data, textStatus, jqXHR){
      this.signingOut = false;
      FitsApp.SessionModel.clear();
      this.render();
      Backbone.history.navigate("logout", {trigger: true});
    }.bind(this))
    .error(function(jqXHR, textStatus, errorThrown){
      this.signingOut = false;
    }.bind(this));
  },
});
