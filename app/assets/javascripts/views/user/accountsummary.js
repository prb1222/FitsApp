FitsApp.Views.AccountSummary = Backbone.View.extend({
  template: JST['user/accountsummary'],

  className: "account-summary-view",

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
})
