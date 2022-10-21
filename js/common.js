$(document).ready(function () {
  // 네비게이션
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

  // 네비게이션 모바일 디자인
  $(".btn_sub").click(function (e) {
    $(".btn_sub").removeClass("active");
    $(e.target).parent().addClass("active");
  });

  // 네비게이션 모바일 반응형 디자인
  let mobile = window.matchMedia("(max-width: 767px)");
  if (mobile.matches) {
    $(".btn_sub").click(function (e) {
      $(".btn_sub").removeClass("active");
      $(e.target).parent().addClass("active");
    });
  }

  // utility 언어 버튼 열고 닫기 디자인
  let langBtn = document.querySelector(".btn_expand");
  let langList = document.querySelector(".lang_wrap");
  langBtn.addEventListener("click", function () {
    langList.classList.toggle("active");
  });

  // 로그인
  // 로그인 모달창 열고 닫기
  $(".btn_login").click(function () {
    $(".login_bg").addClass("show_modal");
  });
  $(".login_modal .btn_close").click(function () {
    $(".login_bg").removeClass("show_modal");
    $("#email").val("");
    $("#pw").val("");
  });

  // 로그인 모달창 검은 배경 클릭시 모달창 닫힘 기능
  $(".login_bg").on("click", function (e) {
    // e.target; //유저가 실제로 누른거
    // e.currentTarget; //이벤트리스너 달린 곳
    // this;
    // e.preventDefault(); //이벤트 기본동작 막아줌
    // e.stopPropagation(); //내 상위요소로 이벤트 버블링 막아줌
    if (e.target == e.currentTarget) {
      $(".login_bg").removeClass("show_modal");
      $("#email").val("");
      $("#pw").val("");
    }
  });

  // 로그인 input 공백 및 정규식으로 형식 확인
  $(".login_bg form").on("submit", function (e) {
    let email = $("#email").val();
    let pw = $("#pw").val();
    let reg_email =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    // 6~12자, 하나 이상의 숫자, 하나 이상의 대소문자, 하나 이상의 특수기호 포함
    let reg_password =
      /^.*(?=.{6,12})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[#?!@$ %^&*-]).*$/;

    if (email == "") {
      e.preventDefault();
      alert("이메일을 입력해주세요");
    } else if (!reg_email.test(email)) {
      e.preventDefault();
      alert("이메일 형식이 아닙니다");
    }
    if (pw == "") {
      e.preventDefault();
      alert("비밀번호를 입력해주세요");
    } else if (pw.length < 6 || pw.length > 12) {
      alert("비밀번호는 6 ~ 12자리여야 합니다");
      e.preventDefault();
    } else if (!reg_password.test(pw)) {
      e.preventDefault();
      alert(
        "비밀번호는 최소 하나 이상의 숫자, 대문자 영문 그리고 특수문자를 포함해야 합니다"
      );
    } else {
      e.preventDefault();
      alert(`${email}님 방문을 환영합니다.`);
      $(".login_bg").removeClass("show_modal");
      $(".btn_login").hide();
    }
  });

  // 장바구니

  // 장바구니 모달창 검은 배경 클릭시 모달창 닫힘 기능
  $(".cart_bg").on("click", function (e) {
    if (e.target == e.currentTarget) {
      $(".cart_bg").removeClass("show_modal");
    }
  });

  // 장바구니 구매 막기
  $(".cart_bg form").on("submit", function (e) {
    e.preventDefault();
    alert("아직 구매하실 수 없습니다.");
  });

  // 장바구니에 추가 버튼 누르면 상품 정보 localStorage에 저장하기
  $(".btn_add span").click(function (e) {
    var title = $(e.target).parent().siblings("p.title").text();
    var count = 1;
    var arr = { name: title, num: count };

    if (localStorage.getItem("cart") != null) {
      var value = JSON.parse(localStorage.getItem("cart"));
      var findProduct = value.find((product) => product.name == arr.name);
      var findIndex = value.findIndex((product) => product.name == arr.name);

      if (findProduct) {
        findProduct.num = findProduct.num + 1;
        localStorage.setItem("cart", JSON.stringify(value));
      } else {
        value.push(arr);
        localStorage.setItem("cart", JSON.stringify(value));
      }
    } else {
      localStorage.setItem("cart", JSON.stringify([arr]));
    }
  });

  // 장바구니에 열고 담긴 상품 정보 localStorage에서 가져오기
  $(".btn_cart").click(function () {
    $(".cart_bg").addClass("show_modal");
    localStorage.getItem("cart");
    var templets = "<p>상품명: </p><p>개수: </p>";
    var cartInfo = 0;

    if (localStorage.getItem("cart") != null) {
      cartInfo = JSON.parse(localStorage.cart);
    }

    for (let i = 0; i < cartInfo.length; i++) {
      $(".cart_modal form div").html("");

      $(".cart_modal form div").append(
        `<div class="cart_list"><p>상품명: ${cartInfo[i].name}</p><p>개수: ${cartInfo[i].num}</p></div>`
      );
    }
  });

  //장바구니 모달창 닫기, 장바구니 목록(localStorage) 리셋
  $(".cart_modal .btn_close").click(function () {
    $(".cart_bg").removeClass("show_modal");
  });
  $(".btn_reset").click(function () {
    $(".cart_modal form div").html("");
    window.localStorage.clear();
  });

  // VISUAL
  // 슬라이드 디자인
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
  // 탭버튼 디자인
  var tabs_btns = $(".collection .tabs_wrap button");
  var lists = $(".collection .change_wraps li");
  var move_bar = $(".collection .tabs_wrap span.bar");
  var cnt_num = 0;
  // 탭버튼 태블릿 반응형 디자인
  let tabletMobile = window.matchMedia("(max-width: 1024px)");
  if (tabletMobile.matches) {
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

  // 반복 SLIDE 디자인
  function infiniteSlide(targetWrap) {
    const wrap = targetWrap; // 슬라이드 영역
    const mask = $(wrap + " div.view_mask"); // 슬라이드 mask
    let innerUl = $(wrap + " div.view_mask > ul"); // 슬라이드 ul
    let innerList = $(wrap + " div.view_mask > ul > li"); // 슬라이드 list
    const btnPrev = $(wrap + " button.prev"); // 이전 버튼
    const btnNext = $(wrap + " button.next"); // 다음 버튼
    const listWidth = innerList.outerWidth(); // list border 포함한 넓이
    const moveCnt = 1; // 클릭
    const duration = 300; // 슬라이드 지연 시간
    let clickEvent = true; // 클릭 이벤트 발생여부
    let setTime = 0; // 슬라이드 setInterval, clearInterval 확인

    // 슬라이드 기본 함수
    (function init() {
      for (var i = 1; i <= moveCnt; i++) {
        innerList.last().prependTo(innerUl); // 마지막 list 를 ul의 맨처음에 넣기
      }
      innerUl.css("margin-left", -(listWidth * moveCnt) + "px"); // list 넓이에 클릭 횟수를 곱한 만큼 ul 왼쪽으로 옮기기 그래야 첫번째 li로 ul 시작되는 것처럼 보임
    })();

    // 이전 버튼 클릭 함수
    btnPrev.click(function test() {
      if (clickEvent) {
        // 클릭 이벤트가 true면
        clickEvent = false; // 클릭 이벤트 값에 false를 넣음
        movement(1); // 이동 함수 (1) 실행
      } else {
        // 클릭 이벤트가 false면
        return; // 함수 종료
      }
    });

    // 다음 버튼 클릭 함수
    btnNext.click(function () {
      if (clickEvent) {
        // 클릭 이벤트가 true면
        clickEvent = false; // 클릭 이벤트 값에 false를 넣음
        movement(-1); // 이동 함수 (-1) 실행
      } else {
        // 클릭 이벤트가 false면
        return; // 함수 종료
      }
    });

    // 이동 함수
    function movement(direction) {
      //direction 값 들어오면
      stopTime(); // 반복 정지 함수
      innerUl.animate(
        { left: listWidth * direction * moveCnt + "px" }, // 최종 변화 화면이 왼쪽에서 list 넓이에 이동 방향 곱해진 값만큼 이동(ul의 display가 block 이여서 property 설정에 따른 변경은 반영되지 않지만, position이 relative, fixed, absolute인 경우에는 반영됨. 참고: https://www.w3schools.com/jquery/jquery_animate.asp)
        duration, // 지연 시간: display block 에서도 반영됨
        function () {
          // 콜백함수: display block 에서도 반영됨
          for (var i = 1; i <= moveCnt; i++) {
            innerList = $(wrap + " div.view_mask > ul > li"); // 슬라이드 li 재할당
            if (direction == 1) {
              // 이전 버튼 클릭되면
              innerList.last().prependTo(innerUl); // 마지막 list 를 ul의 처음에 넣기
            } else if (direction == -1) {
              //다음 버튼 클릭되면
              innerList.first().appendTo(innerUl); // 첫번째 list 를 ul의 마지막에 넣기
            }
          }
          innerUl.css("left", "0px"); // display block 인 경우 반영안됨.
          clickEvent = true; // 클릭 이벤트 값에 true 넣기
          startTime(); // 반복 함수 실행
        }
      );
    }

    // 시작 함수
    function startTime() {
      if (setTime != 0) {
        //타이머가 0이 아니면
        clearInterval(setTime); // 타이머 종료
      }
      setTime = setInterval(function () {
        // 반복 실행
        btnNext.click(); // 다음 버튼 클릭 함수
      }, 3000); // 3초간 반복
    }
    // 반복 정지 함수
    function stopTime() {
      if (setTime != 0) clearInterval(setTime); // 타이머가 0이 아니면 타이머 종료
      setTime = 0; // 타이머 값으로 0
    }
    // 반복 SLIDE 디자인 실행 시 시작함수 자동 실행
    startTime();
  }

  // TOOLS
  // TOOLS 영역 슬라이드 실행
  infiniteSlide(".tools");

  // NEWS
  // NEWS 영역 슬라이드 실행
  infiniteSlide(".news");
});
