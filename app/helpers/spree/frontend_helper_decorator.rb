module Spree
  FrontendHelper.module_eval do

    # removed current_page? check because link_to_cart is called everywhere by spree_minicart
  def link_to_cart(text = nil)
    text = text ? h(text) : Spree.t('cart')
    css_class = nil

    if current_order.nil? or current_order.item_count.zero?
      text = "<span class='glyphicon glyphicon-shopping-cart'></span> #{text}: (#{Spree.t('empty')})"
      css_class = 'empty'
    else
      text = "<span class='glyphicon glyphicon-shopping-cart'></span> #{text}: (#{current_order.item_count})  <span class='amount'>#{current_order.display_total.to_html}</span>"
      css_class = 'full'
    end

    link_to text.html_safe, spree.cart_path, :class => "cart-info #{css_class}"
  end

  end
end

