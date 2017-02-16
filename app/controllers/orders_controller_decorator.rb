module Spree
  OrdersController.class_eval do
    before_action :apply_coupon_code
    respond_to :js, :only => [:populate, :update]
  end
end
