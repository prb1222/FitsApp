FitsApp.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  addNavbar: function () {
    var navbar = new FitsApp.Views.NavBar({});
    this.$rootEl.prepend(navbar.render().$el);
  },

  routes: {
    "": "root",
    "login": "login",
    "dashboard":"dashboard",
    "logout":"root"
  },

  root: function () {
    var view = new FitsApp.Views.MainView();
    this.swapView(view)
  },

  login: function () {
    if (FitsApp.SessionModel.get("session_token")) {
      Backbone.history.navigate("dashboard", {trigger: true});
      return;
    }
    var view = new FitsApp.Views.LoginView();
    this.swapView(view);
  },

  dashboard: function () {
    if (!FitsApp.SessionModel.get("session_token")) {
      Backbone.history.navigate("login", {trigger: true});
      return;
    }
    var view = new FitsApp.Views.Dashboard();
    this.swapView(view);
  },

  swapView: function(view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.$el);
    view.render();
    this.addNavbar();
  }
})
