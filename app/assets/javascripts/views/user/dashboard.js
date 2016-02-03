FitsApp.Views.Dashboard = Backbone.CompositeView.extend({
  template: JST['user/dashboard'],

  events: {
    "click div.link":"changeMainPane"
  },

  initialize: function () {
    var footer = new FitsApp.Views.Footer();
    var sidebar = new FitsApp.Views.Sidebar();
    var account = new FitsApp.Views.AccountSummary();
    this.addSubview("#display-pane", account);
    this.addSubview(".sidebar", sidebar);
    this.addSubview("#footer-view", footer);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  changeMainPane: function (event) {
    var $target = $(event.currentTarget);
    this.removeSubviews("#display-pane");
    var text = $target.text().trim();
    var view;
    if (text === "Account Summary") {
      view = new FitsApp.Views.AccountSummary();
    } else if (text === "Pricing List") {
      view = new FitsApp.Views.PricingList();
    } else if (text === "Transaction History") {
      view = new FitsApp.Views.Transactions();
    } else {
      view = new FitsApp.Views.Tickets();
    }
    this.addSubview("#display-pane", view);
    this.render();
  }


});
