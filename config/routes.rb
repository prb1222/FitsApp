Rails.application.routes.draw do
  root 'staticpages#home'
  post 'supportmailer', to: 'mail#support_email'
  resources :users
  resource :session
end
