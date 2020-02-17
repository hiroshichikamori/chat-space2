$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="chat_main_messages_message" data-message-id=${message.id}>
         <div class="chat_main_messages_message_box">
           <div class="chat_main_messages_message_box_username">
             ${message.user_name}
           </div>
           <div class="chat_main_messages_message_box_datetime">
             ${message.created_at}
           </div>
         </div>
         <div class="chat_main_messages_message_text">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
     `<div class="chat_main_messages_message" data-message-id=${message.id}>
        <div class="chat_main_messages_message_box">
          <div class="chat_main_messages_message_box_username">
            ${message.user_name}
          </div>
          <div class="chat_main_messages_message_box_datetime">
            ${message.created_at}
          </div>
        </div>
        <div class="chat_main_messages_message_text">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
   };
  }
  $('#new_message').on('submit', function(e){
    console.log("発火");
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log(data);
      var html = buildHTML(data);
      $('.chat_main_messages').append(html);
      $('.new_message')[0].reset();
      $('.chat_main_form_message_btn').prop('disabled', false); 
      $('.chat_main_messages').animate({ scrollTop: $('.chat_main_messages')[0].scrollHeight});
    });
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});