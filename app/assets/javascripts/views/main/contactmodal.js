FitsApp.Views.ContactModal = Backbone.View.extend({
  template: JST['main/contactmodal'],

  successTemplate: JST['main/contactmodalsuccess'],

  events: {
    "click .close": "remove",
    "click .m-background": "remove",
    "click .submit-button":"handleSubmit",
    "click .close-button":"remove"
  },

  className: 'modalview-container',

  initialize: function (options) {
    var options = options || {};
    $(document).on('keydown', this.handleKey.bind(this));
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  handleKey: function (event) {
    if (event.keyCode === 27) {
      $(document).off('keydown');
      this.remove();
    } else if (event.keyCode === 13) {
      this.handleSubmit(event);
    }
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var errors = [];
    var $errors = this.$el.find('ul.errors');
    $errors.empty();
    var name = this.$el.find('#name-field').val();
    if (!name) {errors.push("Name can't be blank.")}

    var contactAddress = this.$el.find('#contact-value').val();
    var phoneRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
    if (this.$el.find('#phone-contact').is(':checked') && !phoneRegex.test(contactAddress)) {
      errors.push("Enter a valid phone number.")
    } else if (this.$el.find('#email-contact').is(':checked') && !emailRegex.test(contactAddress)) {
      errors.push("Enter a valid email address.")
    }

    var message = this.$el.find('#message-text').val();
    if (!message) {errors.push("Message can't be blank.")}

    if (errors.length) {
      errors.forEach(function(error){$errors.append("<li>" + error + "</li>")});
      return;
    }

    $.ajax({
      type: "POST",
      url: "/supportmailer",
      data: {message_attrs:
                {message: message,
                 contactAddress: contactAddress,
                 name: name}
            },
      dataType: "text"
    }).done(function(data, textStatus, jqXHR) {
               var $contact = this.$el.find('.contact-content');
               $contact.empty();
               $contact.html(this.successTemplate());
             }.bind(this));
  }
});
