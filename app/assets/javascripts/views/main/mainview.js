FitsApp.Views.MainView = Backbone.CompositeView.extend({
  template: JST['main/mainview'],

  className: "main-view",

  initialize: function () {
    this.footer = new FitsApp.Views.Footer();
    this.addSubview('#footer-view', this.footer);
  },

  render: function () {
      var content = this.template();
      this.$el.html(content);
      this.attachSubviews();
      return this;
  }
})
