$(document).on('click', '#anchor', function(event){
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 1000);
});
var count =0;
$(document).ready(function(){
        $('input[type="checkbox"]').click(function(){
            if($(this).is(":checked")){
                if($(this).attr('id') == 'bf'){
                	$('#bfclass').show();
                	count++;
                }
                if($(this).attr('id') == 'lun'){
                	$('#lunclass').show();
                	count++;
                }
                if($(this).attr('id') == 'din'){
                	$('#dinclass').show();
                	count++;
                }
                if($(this).attr('id') == 'io'){
                	$('#ioclass').show();
                	count++;
                }
                if(count >= 2){
                	$('#cp').show();
                }
                if($(this).attr('id') == 'copy'){
                	$('textarea:visible').val($('textarea:visible').val());
                }


            }
            else if($(this).is(":not(:checked)")){
                if($(this).attr('id') == 'bf'){
                	$('#bfclass').hide();
                	count--;
                }
                if($(this).attr('id') == 'lun'){
                	$('#lunclass').hide();
                	count--;
                }
                if($(this).attr('id') == 'din'){
                	$('#dinclass').hide();
                	count--;
                }
                if($(this).attr('id') == 'io'){
                	$('#ioclass').hide();
                	count--;
                }
                if(count < 2){
                	$('#cp').hide();
                }
            }
        });
    });

$(document).ready(function(){
    $('#selectPaymentOption').change(function(){
        var payment =   $(this).val();
        if(payment == 'cod'){
            $('.neft_details')[0].style.display = 'none';
            $('.chq_details')[0].style.display = 'none';
            $('#cod_details')[0].style.display = 'block';
            $('.wallet_details')[0].style.display = 'none';
            $('.payonline_details')[0].style.display = 'none';
        }
        if(payment == 'neft'){
            $('.chq_details')[0].style.display = 'none';
            $('#cod_details')[0].style.display = 'none';
            $('.wallet_details')[0].style.display = 'none';
            $('.payonline_details')[0].style.display = 'none';
            $('.neft_details')[0].style.display = 'block';
        }
        if(payment == 'cheque'){
            $('.neft_details')[0].style.display = 'none';
            $('#cod_details')[0].style.display = 'none';
            $('.wallet_details')[0].style.display = 'none';
            $('.payonline_details')[0].style.display = 'none';
            $('.chq_details')[0].style.display = 'block';
        }
        if(payment == 'online'){
            $('.neft_details')[0].style.display = 'none';
            $('.chq_details')[0].style.display = 'none';
            $('#cod_details')[0].style.display = 'none';
            $('.wallet_details')[0].style.display = 'none';
            $('.payonline_details')[0].style.display = 'block';
        }
        if(payment == 'wallet'){
            $('.neft_details')[0].style.display = 'none';
            $('.chq_details')[0].style.display = 'none';
            $('#cod_details')[0].style.display = 'none';
            $('.payonline_details')[0].style.display = 'none';
            $('.wallet_details')[0].style.display = 'block';
        }
    });
});
$( function() {
    $( ".datepicker" ).datepicker({
        minDate: 0
    });
  });