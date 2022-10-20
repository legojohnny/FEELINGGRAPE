$(document).ready(function () {
  // 네이게이션
  // 네비게이션 메뉴버튼 열고 닫기 디자인
  var elm_header = document.querySelector("header");
  var btn_menu = document.querySelector(".btn_menu");

  btn_menu.addEventListener("click", function () {
    if (!elm_header.classList.contains("on")) {
      elm_header.classList.add("on");
    } else {
      elm_header.classList.remove("on");
      langList.classList.remove("active");
      $(".btn_sub").removeClass("active");
    }
  });

  // 네비게이션 반응형 디자인
  let mobile = window.matchMedia("(max-width: 767px)");
  if (mobile.matches) {
    $(".btn_sub").click(function (e) {
      $(".btn_sub").removeClass("active");
      $(e.target).parent().addClass("active");
    });
  }

  // 언어 버튼 열고 닫기 디자인
  let langBtn = document.querySelector(".btn_expand");
  let langList = document.querySelector(".lang_wrap");
  langBtn.addEventListener("click", function () {
    langList.classList.toggle("active");
  });

  // VISUAL
  // 슬라이드 디자인
  // const slides = $(".visual .slides");
  let slideCount = 0;
  // setInterval 로 3초마다 화면 바뀌게 설정
  let interval = setInterval(slides, 3000);
  let visual = $(".visual .slides");
  let visualpageBtn = $(".pages");
  // 슬라이드 인덱스 값에 따라서 opacity 조절로 화면 전환
  (function slide_init() {
    visual.css("opacity", 0);
    visual.eq(0).css("opacity", 1);
    visualpageBtn.removeClass("active");
    visualpageBtn.eq(0).addClass("active");
  })();

  function slides() {
    if (slideCount < 2) {
      visual.css("opacity", 0);
      visual.eq(slideCount + 1).css("opacity", 1);
      visualpageBtn.removeClass("active");
      visualpageBtn.eq(slideCount + 1).addClass("active");
      slideCount++;
    } else {
      slideCount = 0;
      visual.css("opacity", 0);
      visual.eq(0).css("opacity", 1);
      visualpageBtn.removeClass("active");
      visualpageBtn.eq(0).addClass("active");
      slideCount++;
    }
  }

  // pagintion bar 전환
  visualpageBtn.on("click", function (e) {
    let curBtn = $(e.target).index();
    visualpageBtn.removeClass("active");
    $(e.target).addClass("active");
    visual.css("opacity", 0);
    visual.eq(curBtn).css("opacity", 1);
  });

  // MONTH
  // MONTH prev next 버튼 디자인
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

  // COLLECTION
  // 탭버튼 반응형 디자인
  var tabs_btns = $(".collection .tabs_wrap button");
  var lists = $(".collection .change_wraps li");
  var move_bar = $(".collection .tabs_wrap span.bar");
  var cnt_num = 0;

  let tabletMobile = window.matchMedia("(max-width: 1024px)");
  if (tabletMobile) {
    // 탭 버튼 클릭시
    tabs_btns.on("click", function () {
      // 탭 버튼 인덱스 번호를 받아서 해당 인덱스 번호를 리스트와 탭에 전달
      var cur_num = $(this).index();
      if (cur_num == cnt_num) return;
      cnt_num = cur_num;
      lists_change(cnt_num);
      tabs_btns_change(cnt_num);
    });
    // 리스트 전체 fadeOut 하고, 받은 인덱스 번호 리스트만 fadeIn처리
    function lists_change(num) {
      lists.fadeOut(500);
      lists.eq(num).fadeIn(500);
    }
    // 탭 모든 버튼에서 active 클래스 제거하고, 받은 인덱스 번호 탭 버튼에만 active 클래스 추가
    function tabs_btns_change(num) {
      tabs_btns.removeClass("active");
      tabs_btns.eq(num).addClass("active");
      move_bar.animate({ left: tabs_btns.eq(num).position().left + "px" }, 200);
    }
  }

  // 데스크탑 사이즈 확인
  let desktop = window.matchMedia("(min-width: 1025px)");
  // 데스크탑 사이즈 에서 변화 발생할 때 체크
  desktop.addEventListener("change", function () {
    // 만약 태블릿, 모바일 사이즈라면
    if (desktop.matches) {
      // 모든 리스트 보이게 처리
      lists.css("display", "block");
    } else {
      // 태블릿, 모바일 사이즈
      lists.css("display", "none");
      // 일단, 기본 화면 설정하고
      (function lists_init() {
        lists.fadeOut(0).first().fadeIn(0);
        tabs_btns.removeClass("active").eq(0).addClass("active");
        move_bar.animate({ left: tabs_btns.eq(0).position().left + "px" }, 200);
      })();
      // 탭 버튼 클릭시
      tabs_btns.on("click", function () {
        // 탭 버튼 인덱스 번호를 받아서 해당 인덱스 번호를 리스트와 탭에 전달
        var cur_num = $(this).index();
        if (cur_num == cnt_num) return;
        cnt_num = cur_num;
        lists_change(cnt_num);
        tabs_btns_change(cnt_num);
      });
      // 리스트 전체 fadeOut 하고, 받은 인덱스 번호 리스트만 fadeIn처리
      function lists_change(num) {
        lists.fadeOut(500);
        lists.eq(num).fadeIn(500);
      }
      // 탭 모든 버튼에서 active 클래스 제거하고, 받은 인덱스 번호 탭 버튼에만 active 클래스 추가
      function tabs_btns_change(num) {
        tabs_btns.removeClass("active");
        tabs_btns.eq(num).addClass("active");
        move_bar.animate(
          { left: tabs_btns.eq(num).position().left + "px" },
          200
        );
      }
    }
  });

  // TOOLS
  // TOOLS prev next 버튼 디자인
  let li = $(".tools ul");
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

  // NEWS
  // NEWS prev next 버튼 기능 구현
  let news = $(".news ul");
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
});
