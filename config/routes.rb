Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create] do
      resources :tracks, only: [:index, :show, :create]
    end
    resource :session, only: [:create, :destroy]
  end

  root "static_pages#root"
end
