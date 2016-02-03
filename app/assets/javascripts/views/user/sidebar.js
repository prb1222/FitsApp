FitsApp.Views.Sidebar = Backbone.View.extend({
  template: JST['user/sidebar'],

  events: {
    "click div.link":"highlightDiv"
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  highlightDiv: function (event) {
    this.$el.find('.active').removeClass("active");
    $(event.currentTarget).addClass("active");
  }
})
