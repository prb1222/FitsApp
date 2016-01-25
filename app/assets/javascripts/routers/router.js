FitsApp.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  addNavbar: function () {
    this.navBar = this.navBar || new FitsApp.Views.NavBar({});
    this.$rootEl.prepend(this.navBar.render().$el);
  },

  addFooter: function () {
    this.footer = this.footer || new FitsApp.Views.Footer({});
    this.$rootEl.append(this.footer.render().$el);
  },

  routes: {
    "": "root",
  },

  root: function () {
    var view = new FitsApp.Views.MainView();
    this.swapView(view)
  },

  swapView: function(view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.$el);
    view.render();
    this.addNavbar();
    this.addFooter();
  }
})
