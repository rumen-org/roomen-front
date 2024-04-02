document.addEventListener('DOMContentLoaded', function () {
  const winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const mobile = 1008;

  // 기본 스크롤 막기
  const scrollPosition = [
    window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
    window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  ];

  const html = document.documentElement;
  const body = document.body;

  html.setAttribute('data-scroll-position', JSON.stringify(scrollPosition));
  html.setAttribute('data-previous-overflow', html.style.overflow);
  html.style.overflow = 'hidden';
  window.scrollTo(scrollPosition[0], scrollPosition[1]);

  document.addEventListener('mousedown', function (e) {
    if (e.button === 1) return false;
  });

  document.addEventListener('touchmove', function (e) {
    e.preventDefault();
  });



  function responsiveResize() {
    // 창의 높이를 가져옵니다.
    const deviceHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // 일반 컨텐츠 디바이스 중심으로 정렬
    const basicInners = document.querySelectorAll(".__basicInner");
    basicInners.forEach(function (element) {
      const contentHeight = element.clientHeight;
      const paddingTop = Math.round((deviceHeight - contentHeight) / 2);
      element.style.paddingTop = paddingTop + 'px';
      element.style.paddingBottom = paddingTop + 'px';
    });

    // 긴 컨텐츠 처리
    const longInners = document.querySelectorAll(".__longInner");
    longInners.forEach(function (element) {
      const contentHeight = element.clientHeight;
      if (winWidth < mobile) {
        element.style.height = deviceHeight + 'px';
        element.style.paddingTop = '110px';
        element.style.paddingBottom = '30px';
      } else {
        const paddingTop = Math.round((deviceHeight - contentHeight) / 2);
        element.style.paddingTop = paddingTop + 'px';
        element.style.paddingBottom = paddingTop + 'px';
      }
    });
  }

  // 초기 로드시 동작
  window.addEventListener('load', function () {
    responsiveResize();
    // 페이지 로드 - reset
    document.querySelector('.scroll_wrap').scrollTop = 0;
  }, false);

  // 리사이즈 감지
  window.addEventListener('resize', function () {
    responsiveResize();
  }, false);

  // 디바이스 방향전환 계산
  function orientationChangeHandler() {
    setTimeout(function () {
      responsiveResize();
    }, 100);
  }

  if (window.addEventListener) {
    window.addEventListener("orientationchange", orientationChangeHandler, false);
  } else {
    window.attachEvent("orientationchange", orientationChangeHandler);
  }

  // 디바이스 방향전환 감지
  if (window.addEventListener) {
    window.addEventListener("orientationchange", function () {
      responsiveResize();
    }, false);
  } else if (window.attachEvent) {
    window.attachEvent("orientationchange", function () {
      responsiveResize();
    });
  }


  // 메인스크롤 - 글로벌 변수
  // 메인스크롤 - 글로벌 변수
  let stop = false;
  const contentNumber = document.querySelectorAll('._innerContent').length;
  let currentContent = 0;
  let swiped = false;
  let swipedUp = false;
  let swipedDown = false;
  let scrollDistance = 0;

  // 메인스크롤 기능
  function mainScroll(e) {
    let delta;

    if (swiped === true) {
      if (swipedUp === true) {
        delta = -1;
      } else if (swipedDown === true) {
        delta = 1;
      }
    } else {
      console.log('e.originalEvent', e)
      if (!(window.mozInnerScreenX == null)) {
        delta = -(e.detail);
      } else {
        delta = e.wheelDeltaY;
        console.log(e.wheelDeltaY)
      }
    }
    if (delta < 0 && !stop && currentContent >= 0 && currentContent < contentNumber) {
      stop = true;

      if (currentContent === 0) {
       const sections =  document.querySelectorAll('.__section');
        sections.forEach(section => section.classList.remove('active'));
        currentContent++;
        document.querySelectorAll('.__section')[currentContent - 1].classList.add('active');

        // 푸터-Active시 헤더 비노출
        const foot = document.getElementById('footer');
        if (foot && !foot.classList.contains('active')) {
          document.querySelector('.footer_blind').style.display = 'block';
          // 헤더 (푸터 이동시 안 뜨게 추가하기!!)
        } else if (foot && foot.classList.contains('active')) {
          document.querySelector('.footer_blind').style.display = 'none';
        }

        scrollDistance = document.querySelector('.__main' + currentContent).offsetTop;
        window.scrollTo({
          top: scrollDistance,
          behavior: 'smooth'
        });

        setTimeout(function () {
          stop = false;
        }, 800);
      } else {
        document.querySelectorAll('.__section').forEach(section => section.classList.remove('active'));
        currentContent++;
        document.querySelectorAll('.__section')[currentContent - 1].classList.add('active');

        // 푸터-Active시 헤더 비노출
        const foot = document.getElementById('footer');
        if (foot && !foot.classList.contains('active')) {
          document.querySelector('.footer_blind').style.display = 'block';
          // 헤더 (푸터 이동시 안 뜨게 추가하기!!)
        } else if (foot && foot.classList.contains('active')) {
          document.querySelector('.footer_blind').style.display = 'none';
        }

        scrollDistance = document.querySelector('.__main' + currentContent).offsetTop;
        window.scrollTo({
          top: scrollDistance,
          behavior: 'smooth'
        });

        setTimeout(function () {
          stop = false;
        }, 800);
      }
    } else if (delta > 0 && !stop && currentContent > 1 && currentContent <= contentNumber) {
      stop = true;

      if (currentContent === 0) {
        document.querySelectorAll('.__section').forEach(section => section.classList.remove('active'));
        currentContent--;
        const sections = document.querySelectorAll('.__section');
        sections[currentContent - 1].classList.add('active');


        // 푸터-Active시 헤더 비노출
        const foot = document.getElementById('footer');
        if (foot && !foot.classList.contains('active')) {
          document.querySelector('.footer_blind').style.display = 'block';
          // 헤더 (푸터 이동시 안 뜨게 추가하기!!)
        } else if (foot && foot.classList.contains('active')) {
          document.querySelector('.footer_blind').style.display = 'none';
        }

        scrollDistance = document.querySelector('.__main' + currentContent).offsetTop;
        window.scrollTo({
          top: scrollDistance,
          behavior: 'smooth'
        });

        setTimeout(function () {
          stop = false;
        }, 800);
      } else {
        currentContent--;
        const sections = document.querySelectorAll('.__section');
        sections.forEach(section => section.classList.remove('active'));
        sections[currentContent - 1].classList.add('active');

        // 푸터-Active시 헤더 비노출
        const foot = document.getElementById('footer');
        if (foot && !foot.classList.contains('active')) {
          document.querySelector('.footer_blind').style.display = 'block';
          // 헤더 (푸터 이동시 안 뜨게 추가하기!!)
        } else if (foot && foot.classList.contains('active')) {
          document.querySelector('.footer_blind').style.display = 'none';
        }

        scrollDistance = document.querySelector('.__main' + currentContent).offsetTop;

        window.scrollTo({
          top: scrollDistance,
          behavior: 'smooth'
        });

        setTimeout(function () {
          stop = false;
        }, 800);
      }
    }

    swiped = false;
    swipedUp = false;
    swipedDown = false;
  }
  // 크롬, 익스, 오페라 - 마우스 휠 이벤트
  document.querySelector('html').addEventListener('wheel', function (e) {
    mainScroll(e);
  });

  // 파이어폭스 - 마우스 휠 이벤트
  document.querySelector('html').addEventListener('DOMMouseScroll', function (e) {
    mainScroll(e);
  });

  let touchstartY = 0;
  let touchendY = 0;

  document.body.addEventListener('touchstart', function (event) {
    touchstartY = event.touches[0].clientY;
  }, false);

  document.body.addEventListener('touchend', function (event) {
    touchendY = event.changedTouches[0].clientY;
    handleSwipe();
  }, false);

  function handleSwipe() {
    const MIN_SWIPE_DISTANCE = 30; // 최소 스와이프 거리

    const deltaY = touchendY - touchstartY;

    if (Math.abs(deltaY) >= MIN_SWIPE_DISTANCE) {
      if (deltaY < 0) {
        // Swipe Up
        swiped = true;
        swipedUp = true;
        swipedDown = false;
        mainScroll();
      } else {
        // Swipe Down
        swiped = true;
        swipedUp = false;
        swipedDown = true;
        mainScroll();
      }
    }
  }

  // 키보드 화살표 - 상,하
  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 38) {
      // up
      swiped = true;
      swipedUp = false;
      swipedDown = true;
      mainScroll();
    } else if (e.keyCode === 40) {
      // down
      swiped = true;
      swipedUp = true;
      swipedDown = false;
      mainScroll();
    }
    e.preventDefault();
  });

  // 아래로 이동 버튼 클릭
  document.querySelectorAll('.arrow').forEach(function (element) {
    element.addEventListener('click', function (event) {
      if (stop === false) {
        stop = true;
        var arrowScroll = this.id.replace('arrow', '');

        document.querySelectorAll('.__section').forEach(section => section.classList.remove('active'));
        arrowScroll++;
        document.querySelectorAll('.__section')[arrowScroll - 1].classList.add('active');

        // 푸터-Active시 헤더 비노출
        var foot = document.getElementById('footer');
        if (foot && !foot.classList.contains('active')) {
          document.querySelector('.footer_blind').style.display = 'block';
          // 헤더 (푸터 이동시 안 뜨게 추가하기!!)
        } else if (foot && foot.classList.contains('active')) {
          document.querySelector('.footer_blind').style.display = 'none';
        }

        currentContent = arrowScroll;
        scrollDistance = document.querySelector('.__main' + arrowScroll).offsetTop;
        window.scrollTo({
          top: scrollDistance,
          behavior: 'smooth'
        });

        setTimeout(function () {
          stop = false;
        }, 800);
      }
    });

    // 터치 이벤트에 대한 클릭 처리 추가
    element.addEventListener('touchstart', function (event) {
      this.click();
    });
  });
});