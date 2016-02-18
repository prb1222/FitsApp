class TicketsController < ApplicationController
  def index
    user = User.find_by_email(params[:flag])
    render json: user.tickets
  end

  def create
    user = User.find_by_email(params[:ticket][:email])
    subject = params[:ticket][:subject]
    text = params[:ticket][:text]
    ticket = Ticket.new(user_id: user.id,
                        subject: subject,
                        text: text)
    if ticket.save
      SupportMailer.ticket_email({
          name: user.fname + " " + user.lname,
          subject: subject,
          text: text
        }).deliver_now

      render json: ticket, status: 200
    else
      render json: ticket.errors.full_messages, status: 422
    end
  end
end
