Rails.application.routes.draw do
  root 'staticpages#home'
  post 'supportmailer', to: 'mail#support_email'
  resources :users
  resources :tickets
  resource :session
end
