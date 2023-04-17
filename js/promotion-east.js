let urlSearch = null;
let questionDatas = null;
let resultDatas = null;
let resultShare = 0;

let typeA = 0;
let typeB = 0;
let typeC = 0;
let typeD = 0;
let questionNum = 0;

const mainSection = document.querySelector(".main");
const testSection = document.querySelector(".test");
const loadingSection = document.querySelector(".loading");
const resultSection = document.querySelector(".result");

function startTest() {
  questionDatas = JSON.parse(JSON.stringify(questionList));
  resultDatas = JSON.parse(JSON.stringify(resultList));

  mainSection.style.display = "none";
  testSection.style.display = "flex";

  questionNum = 1;

  changeQuestion();
}

function changeQuestion() {
  document.querySelector(".question-number").innerHTML = "Q" + questionNum;

  document.querySelector(".question-count").innerHTML = questionNum + "/12";

  document.querySelector(".question-title").innerHTML =
    questionDatas[questionNum - 1].title;

  document.querySelector(".answer-1").innerHTML =
    questionDatas[questionNum - 1].answer1;

  document.querySelector(".answer-2").innerHTML =
    questionDatas[questionNum - 1].answer2;
}

function moveQuestion(num) {
  switch (num) {
    case 0:
      switch (questionNum % 4) {
        case 0:
          typeA++;
          break;
        case 1:
          typeB++;
          break;
        case 2:
          typeC++;
          break;
        case 3:
          typeD++;
          break;
      }
      break;
    case 1:
      switch (questionNum % 4) {
        case 0:
          typeA--;
          break;
        case 1:
          typeB--;
          break;
        case 2:
          typeC--;
          break;
        case 3:
          typeD--;
          break;
      }
      break;
  }

  if (questionNum == 12) {
    testSection.style.display = "none";
    loadingSection.style.display = "block";

    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 2,
      spaceBetween: -64,
      slidesPerGroup: 2,
      loop: true,
      centeredSlides: true,
      allowTouchMove: false,
      autoplay: {
        delay: 500,
        disableOnInteraction: false,
      },
      observer: true,
      observeParents: true,
    });

    swiper.update();

    setTimeout(function () {
      loadingSection.style.display = "none";
      resultSection.style.display = "flex";

      let resultNum = checkType();
      resultShare = resultNum;

      urlSearch = new URLSearchParams(location.search);
      urlSearch.set("result", resultNum);
      history.pushState(null, null, "?" + urlSearch.toString());

      document.querySelector(".result-sub").innerHTML =
        resultDatas[resultNum].subTitle;
      document.querySelector(".result-main-text").innerHTML =
        resultDatas[resultNum].mainTitle;
      document.querySelector(".result-img").src =
        "/img/result_" + (resultNum + 1) + ".jpg";
      document.querySelector(".result-type").innerHTML =
        resultDatas[resultNum].type;
      document.querySelector(".result-desc-1").innerHTML =
        resultDatas[resultNum].desc1;
      document.querySelector(".result-desc-2").innerHTML =
        resultDatas[resultNum].desc2;
      document.querySelector(".result-desc-3").innerHTML =
        resultDatas[resultNum].desc3;
      document.querySelector(".result-desc-4").innerHTML =
        resultDatas[resultNum].desc4;
    }, 3000);
  } else {
    questionNum++;

    changeQuestion();
  }
}

window.onload = function () {
  questionDatas = JSON.parse(JSON.stringify(questionList));
  resultDatas = JSON.parse(JSON.stringify(resultList));

  urlSearch = new URLSearchParams(location.search);

  if (urlSearch.get("result") != null) {
    mainSection.style.display = "none";
    testSection.style.display = "none";
    loadingSection.style.display = "none";
    resultSection.style.display = "flex";

    resultNum = urlSearch.get("result");
    resultShare = resultNum;

    document.querySelector(".result-sub").innerHTML =
      resultDatas[resultNum].subTitle;
    document.querySelector(".result-main-text").innerHTML =
      resultDatas[resultNum].mainTitle;
    document.querySelector(".result-img").src =
      "/img/result_" + (parseInt(resultNum) + 1) + ".jpg";
    document.querySelector(".result-type").innerHTML =
      resultDatas[resultNum].type;
    document.querySelector(".result-desc-1").innerHTML =
      resultDatas[resultNum].desc1;
    document.querySelector(".result-desc-2").innerHTML =
      resultDatas[resultNum].desc2;
    document.querySelector(".result-desc-3").innerHTML =
      resultDatas[resultNum].desc3;
    document.querySelector(".result-desc-4").innerHTML =
      resultDatas[resultNum].desc4;
  }
};

window.onpopstate = function () {
  location.href = "/promotion-east";
  typeA = 0;
  typeB = 0;
  typeC = 0;
  typeD = 0;
  questionNum = 0;
};

function checkType() {
  if (typeA > 0 && typeB > 0 && typeC > 0 && typeD > 0) {
    return 0;
  } else if (typeA > 0 && typeB > 0 && typeC > 0 && typeD < 0) {
    return 1;
  } else if (typeA > 0 && typeB > 0 && typeC < 0 && typeD > 0) {
    return 2;
  } else if (typeA > 0 && typeB > 0 && typeC < 0 && typeD < 0) {
    return 3;
  } else if (typeA > 0 && typeB < 0 && typeC > 0 && typeD > 0) {
    return 4;
  } else if (typeA > 0 && typeB < 0 && typeC > 0 && typeD < 0) {
    return 5;
  } else if (typeA > 0 && typeB < 0 && typeC < 0 && typeD > 0) {
    return 6;
  } else if (typeA > 0 && typeB < 0 && typeC < 0 && typeD < 0) {
    return 7;
  } else if (typeA < 0 && typeB > 0 && typeC > 0 && typeD > 0) {
    return 8;
  } else if (typeA < 0 && typeB > 0 && typeC > 0 && typeD < 0) {
    return 9;
  } else if (typeA < 0 && typeB > 0 && typeC < 0 && typeD > 0) {
    return 10;
  } else if (typeA < 0 && typeB > 0 && typeC < 0 && typeD < 0) {
    return 11;
  } else if (typeA < 0 && typeB < 0 && typeC > 0 && typeD > 0) {
    return 12;
  } else if (typeA < 0 && typeB < 0 && typeC > 0 && typeD < 0) {
    return 13;
  } else if (typeA < 0 && typeB < 0 && typeC < 0 && typeD > 0) {
    return 14;
  } else if (typeA < 0 && typeB < 0 && typeC < 0 && typeD < 0) {
    return 15;
  }
}

const btnLinkShare = document.querySelector(".btn-link-share");
const btnTwitterShare = document.querySelector(".btn-twitter-share");
const btnFacebookShare = document.querySelector(".btn-facebook-share");

btnTwitterShare.addEventListener("click", () => {
  const sendText =
    "내가 만약 상상의 동물이었다면? " +
    resultDatas[resultShare].subTitle +
    " " +
    resultDatas[resultShare].mainTitle;
  const pageUrl = "https://sinsu.world/promotion-east?result=" + resultShare;
  window.open(
    `https://twitter.com/intent/tweet?text=${sendText}&url=${pageUrl}`
  );
});

btnFacebookShare.addEventListener("click", () => {
  const pageUrl = "https://sinsu.world/promotion-east?result=" + resultShare;
  window.open(`http://www.facebook.com/sharer/sharer.php?u=${pageUrl}`);
});

Kakao.init("cd804936d0e82ceaa52691c84337f848");

function shareKakao() {
  Kakao.Link.sendDefault({
    objectType: "feed",
    content: {
      title: "내가 만약 상상의 동물이었다면? 신수 테스트 [동양편]",

      description:
        resultDatas[resultShare].subTitle +
        " " +
        resultDatas[resultShare].mainTitle,
      imageUrl:
        "https://sinsu.world/img/result_" +
        (parseInt(resultShare) + 1) +
        ".jpg",
      link: {
        mobileWebUrl:
          "https://sinsu.world/promotion-east?result=" + resultShare,
        webUrl: "https://sinsu.world/promotion-east?result=" + resultShare,
      },
    },
  });
}

btnLinkShare.addEventListener("click", async () => {
  try {
    await navigator.share({
      title: "내가 만약 상상의 동물이었다면? 신수 테스트 [동양편]",
      text:
        resultDatas[resultShare].subTitle +
        " " +
        resultDatas[resultShare].mainTitle,
      url: "https://sinsu.world/promotion-east?result=" + resultShare,
    });
  } catch (e) {}
});
