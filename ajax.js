$(document).ready(function(){
  cards_style();
  
  $("#form_button").on('click', function (){
 
    let name = $("#form_name").val().trim();
    let email = $("#form_email").val().trim();
    let message = $("#form_message").val().trim();
    const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
     
 
    if( name == ""){
      alert("Не заполнено поле Имя");
      return false;
    } else if (email == ""){
      alert("Не заполнено поле email");
      return false;
    } else if(reg.test(email) == false){
        alert("Неверно заполнено поле email");
        return false;
    } else if (message == ""){
        alert("Не заполнено поле Сообщение");
        return false;
    } 
    
  let request =  $.ajax({
      method: "POST",
      url: "ajax.php",
      cache: false,
      data: {name: name, email: email, message: message},
      dataType: "json",
      beforeSend: function(){
       $("#form_button").prop("disabled", true);
        $('form')[0].reset();
      },
      success:       
        function(data) {
          if (data){
            $('.row div').remove();
            
            $('.row').append(function(){
              let res = '';
              for(let i = 0; i < data.cards.id.length; i++){
                res += '<div class="col-md-12 col-lg-6 col-xl-4 main_block_grid"><div class="card h-100 text-center"><div class="card-body h-100"><div class="id">' + data.cards.id[i] + '</div><h5 class="card-title text-truncate h-25 card-header">' + data.cards.name[i] + '</h5><p class="card-text main_block_email h-25 text-truncate">' + data.cards.email[i] + '</p><p class="card-text main_block_p h-50 overflow-auto">' + data.cards.message[i] + '</p></div></div></div>';
              }
              console.log(data.cards);
              return res;
             });
            } else{
              alert("Данные не поступили: " + data);
            }
           cards_style();
      },
      complete: function(data){
        console.log(data);
      }

    });

    request.fail(function(jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    });


  });
/*-----стили для карточек------*/
  function cards_style() {
    $(".card-body:odd").css({"background-color": "#DEEBDE"});
    $(".card-body:odd .card-title").css({"background-color": "#58ad52"});
    $(".card-body:odd .main_block_email").css({"color": "#58ad52"});
    $(".card-body:odd .main_block_p").css({"color": "#768275"});
  $(".card-body:even").css({"background-color": "#E9EEF3"});
    $(".card-body:even .card-title").css({"background-color": "#4b596c"});
    $(".card-body:even .main_block_email").css({"color": "#6d737b"});
    $(".card-body:even .main_block_p").css({"color": "#767582"});

  };



});