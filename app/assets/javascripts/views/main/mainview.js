FitsApp.Views.MainView = Backbone.CompositeView.extend({
  template: JST['main/mainview'],

  className: "main-view",

  render: function () {
      var content = this.template();
      this.$el.html(content);
      this.attachSubviews();
      return this;
  }
})
