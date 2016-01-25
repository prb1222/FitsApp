FitsApp.Views.Footer = Backbone.View.extend({
  template: JST['main/footer'],

  className: "footer-container",

  initialize: function (options) {
    this.currentUser = options.currentUser;
  },

  render: function() {
    var content = this.template({currentUser: 'Peter'})
    this.$el.html(content);
    return this;
  }
});
