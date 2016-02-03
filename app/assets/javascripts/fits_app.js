window.FitsApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(user) {
    FitsApp.SessionModel = new FitsApp.Models.SessionModel(user);
    var router = new FitsApp.Routers.Router({$rootEl: $('div#content')});
    Backbone.history.start();
  }
};
