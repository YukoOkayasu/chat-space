Rails.application.routes.draw do
<<<<<<< HEAD
  devise_for :users
  root 'groups#index'
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
=======
  get 'chatspace' => 'chats#index'
>>>>>>> master
end
