FitsApp.Collections.Tickets = Backbone.Collection.extend({
  url: "/tickets",

  model: FitsApp.Models.Ticket,
});
