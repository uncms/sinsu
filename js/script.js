const btnReadMore = document.querySelector(".btn-readmore");
const readmoreToggle = document.querySelector(".readmore-toggle");
const btnLoadMore = document.querySelector(".btn-loadmore");
const faqDetails = document.querySelectorAll(".faq-detail");
const nftCharacters = document.querySelectorAll(".nft-character-wrapper");
let currentItem = 0;
let loadCount = 0;

window.onload = function () {
  if (window.innerWidth <= 652) {
    currentItem = 6;
    loadCount = 3;
  } else {
    currentItem = 8;
    loadCount = 4;
  }

  for (let i = 0; i < currentItem; i++) {
    if (i < nftCharacters.length) {
      nftCharacters[i].style.display = "block";
    }
  }
};

btnReadMore.addEventListener("click", function () {
  readmoreToggle.classList.remove("readmore-close");
  btnReadMore.style.display = "none";
});

btnLoadMore.addEventListener("click", function () {
  for (let i = currentItem; i < currentItem + loadCount; i++) {
    if (i < nftCharacters.length) {
      nftCharacters[i].style.display = "block";
    }
  }

  currentItem += loadCount;

  if (currentItem >= nftCharacters.length) {
    btnLoadMore.style.display = "none";
  }
});

for (let i = 0; i < faqDetails.length; i++) {
  faqDetails[i].addEventListener("click", function () {
    this.classList.toggle("active");
  });
}
