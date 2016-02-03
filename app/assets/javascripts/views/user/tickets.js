FitsApp.Views.Tickets = Backbone.CompositeView.extend({
  template: JST['user/tickets'],

  className: "tickets-view",

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
})
