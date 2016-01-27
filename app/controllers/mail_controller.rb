class MailController < ApplicationController
  def support_email
    SupportMailer.support_email(params[:message_attrs]).deliver_now
    render json: "Success!", status: 200
  end
end
