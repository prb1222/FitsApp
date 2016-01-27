Rails.application.routes.draw do
  root 'staticpages#home'
  get 'supportmailer', to: 'mail#support_email'
end
