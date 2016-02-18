FitsApp.Views.Tickets = Backbone.CompositeView.extend({
  template: JST['user/tickets'],

  ticketFormTemplate: JST['user/ticket_form'],

  className: "tickets-view",

  events: {
    "click .add-ticket":"addTicketForm",
    "click .close":"closeTicketForm",
    "submit #ticket-form":"submitTicket"
  },

  initialize: function () {
    if (FitsApp.TicketsCollection) {
      this.ticketsCollection = FitsApp.TicketsCollection;
    } else {
      this.ticketsCollection = FitsApp.TicketsCollection = new FitsApp.Collections.Tickets();
    }

    this.ticketForm = false;
    this.sending = false;

    this.listenTo(this.ticketsCollection, "sync add", this.render);
    this.addSubview("div#tickets-index", new FitsApp.Views.TicketsIndex({collection: this.ticketsCollection}))
    this.ticketsCollection.fetch({
      data: {
        flag: FitsApp.SessionModel.get("email")
      }
    });
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    if (this.ticketForm) {
      var $formEl = this.$el.find("div#ticket-form-container");
      $formEl.html(this.ticketFormTemplate());
    }
    return this;
  },

  addTicketForm: function (event) {
    event.preventDefault();
    if (this.ticketForm) {return;}
    this.ticketForm = true;
    this.render();
  },

  closeTicketForm: function (event) {
    if (event) {
      event.preventDefault();
    }
    if (!this.ticketForm) {return;}
    this.ticketForm = false;
    this.render();
  },

  submitTicket: function (event) {
    event.preventDefault();
    if (this.sending) {return;}
    this.sending =  true;
    var subject = this.$el.find("#subject").val()
    var text = this.$el.find("#text").val()
    var $errors = this.$el.find("ul.errors");
    var errors = [];
    $errors.empty();
    var email = FitsApp.SessionModel.get("email");
    var ticket = new FitsApp.Models.Ticket({subject: subject, text: text});
    var data = {
      subject: subject,
      text: text,
      email: email
    }
    this.$el.find("form#ticket-form").append('<i class="fa fa-cog fa-spin fa-4x col-md-offset-5 col-xs-offset-5"></i>');

    $.ajax({
      type: "POST",
      url: "/tickets",
      data: {ticket: data},
      dataType: "json"
    })
    .success(function(data, textStatus, jqXHR) {
        ticket.set({id: data.id});
        this.ticketsCollection.add(ticket);
        this.sending = false;
        this.closeTicketForm();
      }.bind(this))
    .error(function(errorsObjs, error, errorType) {
        this.sending = false;
        var parsedArray = errorsObjs.responseJSON;
        this.$el.find("i.fa").remove();
        parsedArray.forEach(function(error){$errors.append("<li>" + error + "</li>")});
      }.bind(this));
  }
})
