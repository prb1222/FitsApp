FitsApp.Views.Transactions = Backbone.View.extend({
  template: JST['user/transactions'],

  className: "transactions-view",

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
})
