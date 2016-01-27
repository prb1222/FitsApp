class SupportMailer < ApplicationMailer
  default from: 'support@forwarditsolution.com'
  def support_email(attributes)
    @attrs = attributes
    mail(to: "support@forwarditsolution.com", subject: "Website Email")
  end
end
