$(document).on('turbolinks:load', function() {

var searchList = $("#user-search-result");
function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
              </div>`
  searchList.append(html);
}

var memberList = $("#chat-group-users")
function removeUser(id, name) {
  var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
              <input name='group[user_ids][]' type='hidden' value=${id}>
              <p class='chat-group-user__name'>${name}</p>
              <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
            </div>`
  memberList.append(html);
}

  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      var self = $()
      $("#user-search-result").empty();
      $(self).hide();
        users.forEach(function(user) {
          appendUser(user);
        });
    })
    .fail(function() {
      alert('名前検索に失敗しました');
    });
  });

  $(document).on("click", ".chat-group-user__btn--add", function() {
    $(this).parent().remove();
      var id = $(this).data('user-id')
      var name = $(this).data('user-name')
        removeUser(id, name)
  });

  $(document).on("click", ".js-remove-btn", function() {
    $(this).parent().remove();
  });
});
