Rails.application.routes.draw do
  # Add your extension routes here
  get 'update_cart' => 'minicart#update_cart', as: :update_minicart
end
