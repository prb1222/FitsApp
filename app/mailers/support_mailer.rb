class SupportMailer < ApplicationMailer
  default from: 'notifications@example.com'
  def support_email
    mail(to: "peter.r.benavides@gmail.com",subject: "test")
  end
end
