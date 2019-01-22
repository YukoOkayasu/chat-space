Rails.application.routes.draw do
  root 'chatspace'
  get 'chatspace' => 'chats#index'
end
