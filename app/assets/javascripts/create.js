$(document).on('turbolinks:load', function() {

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
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.name}
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
  $('#new_message').on('submit', function(e) {
    //HTMlでの送信をキャンセル
    e.preventDefault();
    //送信
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      type: 'POST',
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
      $('#new_message')[0].reset()
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
    //自動更新
  $(function() {
    $(function() {
      if (location.pathname.match(/\/groups\/\d+\/messages/)) {
        setInterval(update, 5000);
      }
    });
    function update() {
      if ($('.messages')[0]){
        var message_id = $('.message').last().data('id');
      } else {
        return false
      }
      $.ajax ({
        url: location.href,
        type: 'GET',
        data: { id: message_id },
        dataType: 'json'
      })
      .done(function(data) {
        $.each(data, function(i, data){
          var html = buildHTML(data);
          $('.messages').append(html)
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      })
    }
  })
});
