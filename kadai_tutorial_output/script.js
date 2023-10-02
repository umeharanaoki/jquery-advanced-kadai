$(function () {
  $('.button-more').on('mouseover', function () {
    $(this).animate({
      opacity: 0.5,
      marginLeft: 20,
    }, 100);
  });

  $('.button-more').on('mouseout', function () {
    $(this).animate({
      opacity: 1,
      marginLeft: 0,
    }, 100);
  });

  // カルーセル
  $('.carousel').slick({
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    arrows: false
  });

  $('#submit').on('click', function(event) {
    // formタグによる送信を拒否（cuz.正誤確認する時間の確保）
    event.preventDefault();

    // 入力checkをした結果、エラーがあるかないか判定
    let result = inputCheck();

    // エラー判定とメッセージを取得
    let error = result.error;
    let message = result.message;

    // エラーがなかったらフォームを送信する
    if (error == false) {
      // AJAXでフォームを送信する
      $.ajax({
        url: 'https://api.staticforms.xyz/submit',
        type: 'POST',
        dataType: 'json',
        data: $('#form').serialize(),
        success: function (result) {
          alert('お問い合わせを送信しました。')
        },
        error: function (xhr, resp, text) {
          alert('お問い合わせを送信できませんでした。')
        }
      })  
    } else {
      // エラーメッセージを表示する
      alert(message);
    }
  });

  // フォーカスが外れた時（blur）にフォームの入力Checkをする
  $('#name, #furigana, #email, #tel, #message').blur(function () {
    inputCheck();
  });
  $('#agree').click(function () {
    inputCheck();
  });
  // inputCheckが機能しているかの確認
  function inputCheck() {
    // エラーのチェック結果
    let result;

    // エラーメッセージのテキスト
    let message = '';

    // エラーがなければfalse、エラーがあればtrue
    let error = false;

    // お名前のチェック
    if ($('#name').val() == ''){
      // エラーあり
      $('#name').css('background-color', '#f79999');
      error = true;
      message += 'お名前を入力してください。\n';
    } else {
      // エラーなし
      $('#name').css('background-color', '#fafafa')
    }

    // フリガナのチェック
    if ($('#furigana').val() == '') {
      // エラーあり
      $('#furigana').css('background-color', '#f79999');
      error = true;
      message += 'フリガナを入力してください。\n';
    } else {
      // エラーなし
      $('#furigana').css('background-color', '#fafafa');
    }

    // お問い合わせのチェック
    if ($('#message').val() == '') {
      // エラーあり
      $('#message').css('background-color', '#f79999');
      error = true;
      message += 'お問い合わせ内容を入力してください。\n';
    } else {
      // エラーなし
      $('#message').css('background-color', '#fafafa');
    }

    // メールアドレスのチェック
    if ($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1) {
      // エラーあり
      $('#email').css('background-color', '#f79999');
      error = true;
      message = 'メールアドレスが未記入、または「@」「.」が含まれていません。\n'
    } else {
      // エラーなし
      $('#email').css('background-color', '#fafafa');
    }

    // 電話番号のチェック
    if ($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1) {
      // エラーあり
      $('#tel').css('background-color', '#f79999');
      error = true;
      message += '電話番号に「-」が含まれていません。\n';
    } else {
      // エラーなし
      $('#tel').css('background-color', '#fafafa');
    }

    // 個人情報のチェックボックスのチェック
    if ($('#agree').prop('checked') == false) {
      error = true;
      message = '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
    }

    // エラーの有無で送信ボタンを切り替え
    if (error == true) {
      $('#submit').attr('src', 'images/button-submit.png');
    } else {
      $('#submit').attr('src', 'images/button-submit-blue.png');
    }

    // オブジェクトでエラー判定とメッセージを返す
    result = {
      error: error,
      message: message
    }

    // 戻り値としてエラーがあるかどうかを返す
    return result;
  }
});