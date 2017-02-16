Deface::Override.new(:virtual_path  => "spree/shared/_nav_bar",
                     :remove       => "li#link-to-cart",
                     :original     => "5141cd7e3b48a23b86a9fb33b545e05e44bbce78",
                     :name          => "remove_cart_link_from_first_position")

Deface::Override.new(:virtual_path => "spree/shared/_nav_bar", 
                     :name => "move_cart_link",
                     :insert_after => "li#search-bar", 
                     :original     => "cffbc4624b8c70d8a36b2ce8b915c4b011d1995a",
                     :text => "<li id='link-to-cart' data-hook><%= render partial: 'spree/shared/link_to_cart' %></li>")
