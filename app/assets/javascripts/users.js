$(function() {
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();

        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
  $(document).on("click", ".chat-group-user__btn--add", function() {
    console.log
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
  });
});

// $(function(){
//   function appendUser (user) {
//     const html = `<div class="chat-group-user clearfix">
//                   <p class="chat-group-user__name">${user.name}</p>
//                   <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
//                 </div>`
//     user_list.append(html);
//   }
// ​
//   function appendMessage (message) {
//     const html = `<div class="chat-group-user clearfix">
//                   <p class="chat-group-user__name">${message}</p>
//                 </div>`
//     user_list.append(html);
//   }
// ​
//   function addUser (name, id) {
//     const html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
//                   <input name='group[user_ids][]' type='hidden' value='${id}'>
//                   <p class='chat-group-user__name'>${name}</p>
//                   <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
//                 </div>`
//     $('.js-add-user').append(html);
//   }
//   const user_list = $('#user-search-result');
// ​
//   window.onload = function(){
//   // ブラウザの読み込みが完了した段階で処理が開始します。このイベントはいらないけどかっこいいからつけてみた。
//   let userIds = []; 
//   // 空の配列を作成
//   $('.js-chat-member').each(function(index, element) {
//     //('.js-chat-member')クラスの要素から
//     ids = $(element).attr('id');
//     userIds.push(ids);
//     // 空の配列のuserIdsに所得したuserのidをいれてます。
// ​
//     // ※一行で書くなら、userIds.push(elemnt.getAtrrbute('id'))でも大丈夫ですよ〜
//   });
// ​
//   $('#user-search-field').on('input', function(e) {
//     e.preventDefault();
//     // 入力内容を取得
//     const input = $('#user-search-field').val();
//     if (input.length == 0) {
//       user_list.empty();
//       return
//     };
//     // ajaxでuserIdsをdata:に持たせてあげる
//     // コントローラに送ってあげる！
//     $.ajax({
//       type: 'GET',
//       url: '/users',
//       dataType: 'json',
//       data: { keyword: input,
//               user_ids: userIds },
//     })
//     .done(function(users) {
//       user_list.empty();
//       if (users.length !== 0) {
//         users.forEach(function(user) {
//           appendUser(user);
//         })
//       } else {
//         appendMessage('一致するユーザーが見つかりません');
//       }
//     })
//     .fail(function() {
//       alert("ユーザー検索に失敗しました");
//     })
//   });
// ​
//     user_list.on('click', '.chat-group-user__btn--add', function() {
//     const userName = $(this).attr('data-user-name');
//     const userId   = $(this).attr('data-user-id');
// ​
//     userIds.push(userId);
//     // 追加したuserのidを配列userIdsに追加してあげる。
//     $(this).parent().remove();
//     addUser(userName, userId);
//   })
// ​
//   $('.js-add-user').on('click', '.js-remove-btn', function() {
// 	// siblingsメソッドで並列の要素のvalueを全て取得してます。
//     const removeId = $(this).siblings('input').val();
//     // 削除したuserのidをfilterメソッドを使用して配列を作り直してる。今回は削除したユーザーのidを配列userIdsから弾いてます。
//     // 削除したユーザーを検索結果で表示させるためです！
//     userIds = userIds.filter(id => id != removeId);
//     $(this).parent().remove();
//   })
//  }
// })
