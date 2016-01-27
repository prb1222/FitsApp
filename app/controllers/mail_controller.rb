class MailController < ApplicationController
  def support_email
    SupportMailer.support_email.deliver_now
    render json: "Success!", status: 200
  end
end
