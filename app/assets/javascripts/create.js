$(function() {
  function buildHTML(message){
    if (message.image !== null) {
      img = `<image src="${message.image}" class="lower-message__image" >`
    } else {
      img = ''
    }
    if (message.content !== null) {
      text = `<p class="lower-message__content">
                ${message.content}
              </p>`
    }
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    ${text}
                    ${img}
                  </div>
                </div>`
    return html;
  }
  $('#form__message').on('submit', function(e) {
    //HTMlでの送信をキャンセル
    e.preventDefault();
    //送信
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    //通信成功時の処理
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form__message').val('')
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    //通信失敗時の処理
    .fail(function() {
      alert('error');
    })
    //常にdisabledを消して送信ボタンを押せるようにする
    .always(function() {
      $('.form__submit').prop('disabled', false)
    })
  })
});
