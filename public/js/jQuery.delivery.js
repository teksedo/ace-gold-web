$(function() {
    var add_to_cart = function(butId){
        $("#checkout-loader").show();
        var pId = butId.split("_");
        
        $.ajax({
            url: DELIVERY_URL,
            type: "POST",
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                'product_id': pId["1"],
                'qty': $("#qty_"+pId["1"]).val()
            },
            dataType: "json",
            success: function (response) {
                setTimeout(function(){ $("#checkout-loader").hide(); }, 800);
                if( response.code == 1 ){
                    $(".cart-count").text(response.data.products.length);
                    Swal.fire("Success!", response.alert, "success");
                } else {
                    Swal.fire("Error!", response.alert, "error");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if( typeof xhr.responseJSON.alert !== "undefined" ){
                    Swal.fire("Error!", xhr.responseJSON.alert, "error");
                } else {
                    Swal.fire("Error!", "Error occurs while perform the operation.", "error");
                }
            }
        });
    };

    $(document).on("click", ".btn-place-order", function(e){
        /*gtag('event', 'Payment Success', {
            'event_category': 'Event',
            'event_label': 'URL',
            'value': '1'
        });*/
        if( uId ){
            e.stopPropagation();
            add_to_cart($(this).attr("id"));
        }else{
            $("div.sucessful").hide();
        }
    });

});