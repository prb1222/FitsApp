FitsApp.Views.TicketItem = Backbone.View.extend({
  template: JST['user/ticket_item'],

  className: "ticket-item",

  tagName: "li",

  render: function () {
    var content = this.template({ticket: this.model});
    this.$el.html(content);
    return this;
  }
});
