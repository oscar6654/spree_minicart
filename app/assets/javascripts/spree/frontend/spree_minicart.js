var DEBUG = false;
if (!DEBUG) {
    if (!window.console) window.console = {};
    var methods = ["log", "debug", "warn", "info"];
    for (var i = 0; i < methods.length; i++) {
        console[methods[i]] = function() {};
    }
}

SpreeMinicart = {
    bindLinkToCartClick: function() {
        $("#link-to-cart").on('click', function() {
            $('body').toggleClass('show-cart');
            return false;
        });
    },
    bindCloseButtonClick: function() {
        $(document).on('click', '#minicart .close-button, .overlay-cart', function() {
            $('body').removeClass('show-cart');
            return false;
        });
    },
    bindRemoveFromCartClick: function() {
        $(document).on('click', 'form#update-minicart a.minicart_remove', function(e) {
            $(this).parent().parent().siblings('div[data-hook="minicart_item_quantity"]').find("input.line_item_quantity").val(0);
            $(this).parents('form').first().submit();
            e.preventDefault();
        });
    },
    bindUpdateLineItemsClick: function() {

        var _updateCart = function(obj, operationType) {
            
            if(operationType == undefined){
                operationType = "-";
            }

            var currentLineItemQuantity = parseInt($(obj).siblings(".number").text());
            if (currentLineItemQuantity == 0) {
                return false;
            } else {
                currentLineItemQuantity = (operationType == "+") ? currentLineItemQuantity + 1 : currentLineItemQuantity - 1;
                $(obj).siblings("input.line_item_quantity").val(currentLineItemQuantity);
                $(obj).parents('form').first().submit();
            }
        };

        $(document).on('click', 'form#update-minicart .cart-items button.decrement', function(e) {
            _updateCart(this, "-");
        });

        $(document).on('click', 'form#update-minicart .cart-items button.increment', function(e) {
            _updateCart(this, "+");
        });
    },
    bindShowAjaxProgressBar: function() {
        $(document).on("ajax:beforeSend", "#update-minicart", function() {
            $("#progress").slideDown();
        });

        $(document).on("ajax:complete", "#update-minicart", function() {
            $("#progress").slideUp();
        });
    },
    bindApplyPromoCodeClick: function(){
        $(document).on("click", "#minicart .btn-coupon", function(e){
            var couponCodeInput = $("#minicart .coupon-input");
            var couponCode = couponCodeInput.val().trim();
            if(couponCode == undefined || couponCode == ''){
                e.preventDefault();
                couponCodeInput.fadeOut(100).attr("placeholder", "Enter a valid promo code").fadeIn(800);
                setTimeout(function(){
                    couponCodeInput.fadeOut(100).attr("placeholder", "Apply a promo code").fadeIn(500);;
                }, 1000);
            }
        });
    },
    documentOnReady: function() {
        this.bindLinkToCartClick();
        this.bindCloseButtonClick();
        this.bindRemoveFromCartClick();
        this.bindUpdateLineItemsClick();
        this.bindApplyPromoCodeClick();
        this.bindShowAjaxProgressBar();
        $.get('/update_cart');
    }

};

(function($) {
    $(document).ready(function() {
        SpreeMinicart.documentOnReady();
    });
})(jQuery);