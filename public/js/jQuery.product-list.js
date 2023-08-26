$(function() {
    $(document).on("click", ".add-qty", function(e){
        e.preventDefault();
        
        var c = $(this).prev().val(),
            m = $(this).attr('data-max'),
            n = $(this).attr('data-min'),
            pi = $(this).attr('data-id'),
            pp = $(this).attr('data-price'),
            ci = parseInt(c),
            mi = parseInt(m),
            ni = parseInt(n),
            ppi = parseFloat(pp).toFixed(2),
            i = ci + 1;

        if( i <= mi && i <= 10 ){
            $(this).prev().val(i);
            var up = parseFloat(i * ppi).toFixed(2);
            $("#price_"+pi).text(up);
        }
       
    });

    $(document).on("click", ".sub-qty", function(e){
        e.preventDefault();

        var c = $(this).next().val(),
            m = $(this).attr('data-max'),
            n = $(this).attr('data-min'),
            pi = $(this).attr('data-id'),
            pp = $(this).attr('data-price'),
            ci = parseInt(c),
            mi = parseInt(m),
            ni = parseInt(n),
            ppi = parseFloat(pp).toFixed(2),
            d = ci - 1;

        if( d > 0 ){
            $(this).next().val(d);
            var up = parseFloat(d * ppi).toFixed(2);
            $("#price_"+pi).text(up);
        }
       
    });
});