FitsApp.Views.NavBar = Backbone.View.extend({
  template: JST['main/navbar'],

  className: "navigation-container",

  events: {
    "click #how-it-works-link":"scrollToSection",
    "click #why-fits-link":"scrollToSection"
  },

  initialize: function (options) {
    this.currentUser = options.currentUser;
  },

  render: function() {
    var content = this.template({currentUser: 'Peter'})
    this.$el.html(content);
    return this;
  },

  scrollToSection: function (event) {
    event.preventDefault();
    var targetId = event.currentTarget.id
    $('html, body').animate({
        scrollTop: $("." + targetId.slice(0, targetId.length - 5)).offset().top - 130
    }, 500);
  }
});
