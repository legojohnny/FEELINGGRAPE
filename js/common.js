$(document).ready(function () {
  var isMobile = false; //initiate as false

  // device detection
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  ) {
    isMobile = true;
  }

  const $slides = $(".visual .slides");
  const $pn_btns = $(".visual .pagination button.pages");
  const $btn_prev = $(".visual buton.prev");
  const $btn_next = $(".visual buton.next");

  let cnt = 0; //
  let si_01 = 0; // interval

  (function init() {
    $slides
      .removeClass("cur prev next")
      .css("transition", "none")
      .css("opacity", "1")
      .fadeOut(0);
    $slides.first().css("opacity", "1").fadeIn(0);
  })();

  $pn_btns.on("click", function () {
    var cur_num = $pn_btns.index(this);
    if (cur_num == cnt) return;
    cnt = cur_num;
    fade_img(cnt);
    pagination_change(cnt);
  });

  function count_plus() {
    cnt = cnt == $slides.length - 1 ? 0 : cnt + 1;
    fade_img(cnt);
    slide_img(cnt, "transform 0.5s");
    pagination_change(cnt);
    if (cnt == $slides.length - 1) cnt = 0;
    else {
      cnt++;
    }
  }

  function count_minus() {
    cnt = cnt == 0 ? $slides.length - 1 : cnt - 1;
    fade_img(cnt);
    slide_img(cnt, "transform 0.5s");
    pagination_change(cnt);
    if (cnt == 0) cnt = $slides.length - 1;
    else {
      cnt--;
    }
  }

  function fade_img(num) {
    stop_si();
    $slides.fadeOut(500);
    $slides.eq(num).fadeIn(500, function () {
      start_si();
    });
  }

  function slide_img(num, transition_val) {
    stop_si();
    var next_num = num == $slides.length - 1 ? 0 : num + 1;
    var prev_num = num == 0 ? $slides.length - 1 : num - 1;
    $slides.removeClass("cur prev next").css("transition", "none");
    if ($slides.length == 2) {
      $slides.eq(num).addClass("cur").css("transition", transition_val);
      if (num == 0) {
        $slides.eq(next_num).addClass("next").css("transition", transition_val);
      } else if (num == 1) {
        $slides.eq(prev_num).addClass("prev").css("transition", transition_val);
      }
    } else if ($slides.length >= 3) {
      $slides.eq(num).addClass("cur").css("transition", transition_val);
      $slides.eq(prev_num).addClass("prev").css("transition", transition_val);
      $slides.eq(next_num).addClass("next").css("transition", transition_val);
    }
    start_si();
  }

  function pagination_change(num) {
    $pn_btns.removeClass("active");
    $pn_btns.eq(num).addClass("active");
  }

  function start_si() {
    if (si_01 != 0) {
      clearInterval(si_01);
    }
    si_01 = setInterval(count_plus, 3000);
  }

  function stop_si() {
    if (si_01 != 0) {
      clearInterval(si_01);
    }
    si_01 = 0;
  }

  start_si();

  if (!isMobile) {
  } else {
    var $tabs_btns = $(".collection .tabs_wrap button");
    var $lists = $(".collection .change_wraps li");
    var $move_bar = $(".collection .tabs_wrap span.bar");
    var cnt_num = 0;

    (function lists_init() {
      $lists.fadeOut(0);
      $lists.first().fadeIn(0);
    })();

    $tabs_btns.on("click", function () {
      var cur_num = $(this).index();
      if (cur_num == cnt_num) return;
      cnt_num = cur_num;
      lists_change(cnt_num);
      pagination_change(cnt_num);
    });

    function lists_change(num) {
      $lists.fadeOut(500);
      $lists.eq(num).fadeIn(500);
    }

    function tabs_btns_change(num) {
      $tabs_btns.removeClass("active");
      $tabs_btns.eq(num).addClass("active");
      $move_bar.animate(
        { left: $tab_btns.eq(num).position().left + "px" },
        200
      );
    }

    if (screen.width >= 768) {
    } else {
    }
  }

  // MONTH prev next 버튼 기능 구현
  let infoCount = $(".month .info").length;
  let info = $(".month .info");
  let img = $(".month ul");
  let month = $(".month_wrap .month");

  let infoNum = 1;
  // 다음 버튼 클릭 구현
  $(".month .next").click(function () {
    if (infoNum < infoCount) {
      info.hide();
      info.eq(infoNum).show();
      month.hide();
      month.eq(infoNum).show();
      img.css("transform", "translateX(-" + 33.3333 * infoNum + "%)");
      infoNum++;
    } else {
      infoNum = 0;
      info.hide();
      info.eq(infoNum).show();
      month.hide();
      month.eq(infoNum).show();
      console.log(info);
      img.css("transform", "translateX(0px)");
      infoNum++;
    }
  });
  // 이전 버튼 클릭 구현
  $(".month .prev").click(function () {
    console.log(infoNum);
    if (infoNum > 1) {
      infoNum--;
      img.css("transform", "translateX(-" + 33.3333 * (infoNum - 1) + "%)");
      info.hide();
      info.eq(infoNum - 1).show();
      month.hide();
      month.eq(infoNum - 1).show();
    } else {
      infoNum = 3;
      img.css("transform", "translateX(-1332px)");
      info.hide();
      info.eq(infoNum - 1).show();
      month.hide();
      month.eq(infoNum - 1).show();
    }
  });

  // TOOLS prev next 버튼 기능 구현
  let li = $(".tools ul");
  let liCount = $(".tools li").length;
  let liNum = 1;

  // 다음 버튼 클릭 구현
  $(".tools .next").click(function () {
    if (liNum < 3) {
      li.css("transform", "translateX(-" + 16.6666 * liNum + "%)");
      liNum++;
    } else {
      liNum = 0;
      li.css("transform", "translateX(0px)");
      liNum++;
    }
  });
  // 이전 버튼 클릭 구현
  $(".tools .prev").click(function () {
    if (liNum > 1) {
      liNum--;
      li.css("transform", "translateX(-" + 16.6666 * (liNum - 1) + "%)");
    } else {
      liNum = 3;
      li.css("transform", "translateX(-33.3332%)");
    }
  });

  // NEWS prev next 버튼 기능 구현
  let news = $(".news ul");
  let newsCount = $(".news li").length;
  let newsNum = 1;

  // 다음 버튼 클릭 구현
  $(".news .next").click(function () {
    if (newsNum < 3) {
      news.css("transform", "translateX(-" + 16.6666 * newsNum + "%)");
      newsNum++;
    } else {
      newsNum = 0;
      info.hide();
      news.css("transform", "translateX(0px)");
      newsNum++;
    }
  });
  // 이전 버튼 클릭 구현
  $(".news .prev").click(function () {
    if (newsNum > 1) {
      newsNum--;
      news.css("transform", "translateX(-" + 16.6666 * (newsNum - 1) + "%)");
    } else {
      newsNum = 3;
      news.css("transform", "translateX(-33.3332%)");
    }
  });

  // tabs 바 이동 구현
  let button = $(".tabs_wrap button");

  button.click(function (e) {
    console.log($(e.target).offset());
    let move = $(e.target).offset().left;
    let barMove = move - 7;
    $(".bar").offset({ left: barMove });
    console.log($(".bar").offset());
  });
});
