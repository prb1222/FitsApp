FitsApp.Views.PricingList = Backbone.View.extend({
  template: JST['user/pricinglist'],

  className: "pricing-list-view",

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
})
