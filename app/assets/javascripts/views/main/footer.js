FitsApp.Views.Footer = Backbone.View.extend({
  template: JST['main/footer'],

  className: "footer-container",

  events: {
    "click #contact-link": "renderContactModal"
  },

  initialize: function (options) {
    var options = options || {};
    this.currentUser = options.currentUser;
  },

  render: function() {
    var content = this.template({currentUser: 'Peter'})
    this.$el.html(content);
    return this;
  },

  renderContactModal: function (event) {
    event.preventDefault();
    var modalView = new FitsApp.Views.ContactModal();
    $('body').append(modalView.render().$el);
    $('html, body').animate({
        scrollTop: 0,
    }, 500);
  }


});
