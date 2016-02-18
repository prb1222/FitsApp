FitsApp.Views.TicketsIndex = Backbone.CompositeView.extend({
  template: JST['user/tickets_index'],

  className: "tickets-list",

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTicketSubview);
    this.collection.forEach(function(ticket) {
      this.addTicketSubview(ticket);
    }.bind(this));
  },

  render: function () {
    var content = this.template({tickets: this.collection});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addTicketSubview: function (ticket) {
    var subView = new FitsApp.Views.TicketItem({model: ticket});
    this.addSubview('ul.tickets-list', subView);
    this.render();
  },
});
