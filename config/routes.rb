Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :tracks, only: [:index, :create]
    resources :users, only: [:create] do
      resources :tracks, only: [:show]
    end
    resource :session, only: [:create, :destroy]
  end

  root "static_pages#root"
end
