FitsApp.Views.NavBar = Backbone.View.extend({
  template: JST['main/navbar'],

  className: "navigation-container",

  initialize: function (options) {
    this.currentUser = options.currentUser;
  },

  render: function() {
    var content = this.template({currentUser: 'Peter'})
    this.$el.html(content);
    return this;
  }
});
