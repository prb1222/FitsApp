window.FitsApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new FitsApp.Routers.Router({$rootEl: $('div#content')});
    Backbone.history.start();
  }
};
