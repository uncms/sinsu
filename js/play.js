let web3;
let account;
let currentRound = 1;
let nftList = [];
let nftInfo = [];

let contractNFT;
let contractStatus;
let contractPlay;

window.onload = async function () {
  web3 = new Web3(window.ethereum);

  contractNFT = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);
  contractStatus = new web3.eth.Contract(STATUS_ABI, STATUS_ADDRESS);
  contractPlay = new web3.eth.Contract(PLAY_ABI, PLAY_ADDRESS);
};

async function connectWallet() {
  if (window.ethereum) {
    await window.ethereum.request({ method: "net_version" }).then((res) => {
      console.log(res);
    });

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    account = accounts[0];

    await searchNFTList();
  } else {
    alert("메타마스크 설치가 필요합니다! MetaMask is not installed!");
    return;
  }
}

async function searchNFTList() {
  await contractNFT.methods
    .tokensOfOwner(account)
    .call()
    .then(async function (res) {
      nftList = res;
      await serachNFTInfo();
    })
    .catch(function (err) {
      console.log(err);
    });
}

async function serachNFTInfo() {
  for (let i = 0; i < nftList.length; i++) {
    nftInfo[i] = [0, 0, 0, 0, 0, 0];

    nftInfo[i][0] = parseInt(nftList[i]);

    await contractStatus.methods
      .getStats(nftList[i])
      .call({
        from: account,
      })
      .then(function (res) {
        nftInfo[i][1] = parseInt(res[0]);
        nftInfo[i][2] = parseInt(res[1]);
        nftInfo[i][3] = parseInt(res[2]);
        nftInfo[i][4] = parseInt(res[3]);
      })
      .catch(function (err) {
        console.log(err);
      });

    await contractPlay.methods
      .getDeployed(currentRound, nftList[i])
      .call({
        from: account,
      })
      .then(function (res) {
        nftInfo[i][5] = parseInt(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  arr = nftInfo;
}

//intro-btn 클릭 이벤트

let direction = 0;
const introBtns = document.querySelectorAll(".intro-btn");

for (const introBtn of introBtns) {
  introBtn.addEventListener("click", function () {
    introBtns[0].classList.remove("selected");
    introBtns[1].classList.remove("selected");
    introBtns[2].classList.remove("selected");
    introBtns[3].classList.remove("selected");
    introBtn.classList.add("selected");

    direction = parseInt(introBtn.dataset.direction);
  });
}

//Countdown 이벤트

const open = new Date(2023, 01, 11, 23, 59, 59);
const countdownText = document.querySelector(".countdown-text");

setInterval(() => {
  countdown();
}, 1000);

function countdown() {
  const cur = new Date();
  const utc = cur.getTime() + cur.getTimezoneOffset() * 60 * 1000;
  const kst = new Date(utc + 9 * 60 * 60 * 1000);

  let gap = Math.floor((open.getTime() - kst.getTime()) / 1000);

  let hour =
    parseInt(gap / 3600) < 10
      ? "0" + parseInt(gap / 3600)
      : parseInt(gap / 3600);
  let min =
    parseInt((gap % 3600) / 60) < 10
      ? "0" + parseInt((gap % 3600) / 60)
      : parseInt((gap % 3600) / 60);
  let sec = gap % 60 < 10 ? "0" + (gap % 60) : gap % 60;
  countdownText.innerHTML = hour + " : " + min + " : " + sec;
}

//Radio Button 클릭 이벤트

let selectedRadio = 0;
const inventoryTitle = document.querySelector(".inventory-title");

function getSelectedRadio(e) {
  selectedRadio = parseInt(e.target.value);

  changeInventoryTitle();
  changeItemsbyDirection();
}

function changeInventoryTitle() {
  switch (selectedRadio) {
    case 0:
      inventoryTitle.innerHTML =
        "나의 신수 : " +
        arr.length +
        " <span>(" +
        deployedCount[0] +
        " 마리의 신수가 배치되지 않음)</span>";
      break;
    case 1:
      inventoryTitle.innerHTML =
        "나의 신수 : " +
        arr.length +
        " <span>(" +
        deployedCount[1] +
        " 마리의 신수가 동쪽에 배치됨)</span>";
      break;
    case 2:
      inventoryTitle.innerHTML =
        "나의 신수 : " +
        arr.length +
        " <span>(" +
        deployedCount[2] +
        " 마리의 신수가 서쪽에 배치됨)</span>";
      break;
    case 3:
      inventoryTitle.innerHTML =
        "나의 신수 : " +
        arr.length +
        " <span>(" +
        deployedCount[3] +
        " 마리의 신수가 남쪽에 배치됨)</span>";
      break;
    case 4:
      inventoryTitle.innerHTML =
        "나의 신수 : " +
        arr.length +
        " <span>(" +
        deployedCount[4] +
        " 마리의 신수가 북쪽에 배치됨)</span>";
      break;
  }
}

let items = [];

function changeItemsbyDirection() {
  items = document.querySelectorAll(".item");

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][5] == selectedRadio) {
      items[i].style.display = "block";
    } else {
      items[i].style.display = "none";
    }
  }
}

// Item 생성 이벤트

const legendaryLevel = 1000;
const epicLevel = 500;
const rareLevel = 200;
const uncommonLevel = 50;

const namesKR = [
  "구미호",
  "해태",
  "인면조",
  "삼족오",
  "옥토끼",
  "강철이",
  "불가사리",
  "장산범",
  "오공",
  "츠치구모",
  "누에",
  "야마타노오로치",
  "텐구",
  "나가",
  "가루다",
  "스핑크스",
  "인어",
  "유니콘",
  "드래곤",
  "웨어울프",
  "뱀파이어",
  "미노타우로스",
  "그리핀",
  "사티로스",
  "네메아의 사자",
  "하피",
  "펜리르",
  "크라켄",
  "요르문간드",
  "케찰코아틀",
  "빅풋",
  "천둥새",
];

const namesEN = [
  "Nine-Tailed Fox",
  "Haetae",
  "Human-Faced Bird",
  "Three-Legged Crow",
  "Moon Rabbit",
  "Gangcheori",
  "Bulgasari",
  "Jangsanbeom",
  "Monkey King",
  "Tsuchigumo",
  "Nue",
  "Yamata no Orochi",
  "Tengu",
  "Naga",
  "Garuda",
  "Sphinx",
  "Mermaid",
  "Unicorn",
  "Dragon",
  "Werewolf",
  "Vampire",
  "Minotauros",
  "Griffin",
  "Satyr",
  "Nemean Lion",
  "Harpy",
  "Fenrir",
  "Kraken",
  "Jormungandr",
  "Quetzalcoatl",
  "Bigfoot",
  "Thunderbird",
];

let arr = [];

const wait = (timeToDelay) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay));

async function startLoading() {
  document.querySelector(".inventory-radio").style.display = "none";
  document.querySelector(".deployChecked-btn").style.display = "none";
  document.querySelector(".selectAll-wrapper").style.display = "none";
  document.querySelector(".inventory-content").style.display = "none";
  document.querySelector(".preloader").style.display = "flex";
}

function endLoading() {
  document.querySelector(".preloader").style.display = "none";
  document.querySelector(".inventory-radio").style.display = "flex";
  document.querySelector(".deployChecked-btn").style.display = "block";
  document.querySelector(".selectAll-wrapper").style.display = "flex";
  document.querySelector(".inventory-content").style.display = "grid";
}

async function createItems() {
  document.querySelector(".connect-wallet").style.display = "none";

  startLoading();

  await connectWallet();

  for (let i = 0; i < arr.length; i++) {
    createItem(arr[i]);
  }

  endLoading();

  calcDeployedCount();
  changeInventoryTitle();
  changeItemsbyDirection();
}

function createItem(_arr) {
  let tier = calcTier(_arr[1], _arr[2], _arr[3], _arr[4]);
  let dna = generateDNA(_arr[0]);

  let el_item = document.createElement("div");

  if (_arr[5] == 0) {
    el_item.setAttribute("class", "item " + tier);
  } else {
    el_item.setAttribute("class", "item " + tier + " deployed");
  }

  let el_itemHeader = document.createElement("div");
  el_itemHeader.setAttribute("class", "item-header");

  let el_label = document.createElement("label");

  let el_input = document.createElement("input");
  el_input.setAttribute("type", "checkbox");
  el_input.setAttribute("name", "tokenID");
  el_input.setAttribute("value", _arr[0]);

  if (_arr[5] != 0) {
    el_input.disabled = true;
  }

  let el_p = document.createElement("p");
  el_p.innerHTML = "SINSU #" + _arr[0];

  let el_span = document.createElement("span");

  el_label.appendChild(el_input);
  el_label.appendChild(el_p);
  el_label.appendChild(el_span);

  let el_button = document.createElement("button");
  el_button.setAttribute("class", "deploy-btn");
  el_button.setAttribute("data-id", _arr[0]);
  el_button.innerHTML = "배치하기";
  el_button.onclick = deployItem;

  if (_arr[5] != 0) {
    el_button.disabled = true;
    el_button.innerHTML = "배치됨";
  }

  el_itemHeader.appendChild(el_label);
  el_itemHeader.appendChild(el_button);

  let el_itemMain = document.createElement("div");
  el_itemMain.setAttribute("class", "item-main");

  let el_itemImage = document.createElement("div");
  el_itemImage.setAttribute("class", "item-image");

  let el_img = document.createElement("img");
  el_img.setAttribute("src", "img/profile_" + dna + ".png");
  el_img.setAttribute("alt", "NFT");

  let el_div = document.createElement("div");

  el_itemImage.appendChild(el_img);
  el_itemImage.appendChild(el_div);

  let el_itemDesc = document.createElement("div");
  el_itemDesc.setAttribute("class", "item-desc");

  let el_itemName = document.createElement("div");
  el_itemName.setAttribute("class", "item-name");

  let el_name = document.createElement("div");
  el_name.innerHTML = namesKR[dna] + " <span>| " + namesEN[dna] + "</span>";

  let el_tier = document.createElement("img");
  el_tier.setAttribute("src", "img/" + tier + ".png");
  el_tier.setAttribute(
    "alt",
    tier.replace(/^[a-z]/, (char) => char.toUpperCase())
  );

  el_itemName.appendChild(el_name);
  el_itemName.appendChild(el_tier);

  let el_itemStatus = document.createElement("div");
  el_itemStatus.setAttribute("class", "item-status");

  let el_hpWrapper = document.createElement("div");

  let el_hpImage = document.createElement("img");
  el_hpImage.setAttribute("src", "img/health.png");
  el_hpImage.setAttribute("alt", "Health");

  let el_hpStat = document.createElement("div");
  el_hpStat.innerHTML = _arr[1];

  el_hpWrapper.appendChild(el_hpImage);
  el_hpWrapper.appendChild(el_hpStat);

  let el_atkWrapper = document.createElement("div");

  let el_atkImage = document.createElement("img");
  el_atkImage.setAttribute("src", "img/attack.png");
  el_atkImage.setAttribute("alt", "Attack");

  let el_atkStat = document.createElement("div");
  el_atkStat.innerHTML = _arr[2];

  el_atkWrapper.appendChild(el_atkImage);
  el_atkWrapper.appendChild(el_atkStat);

  let el_defWrapper = document.createElement("div");

  let el_defImage = document.createElement("img");
  el_defImage.setAttribute("src", "img/defense.png");
  el_defImage.setAttribute("alt", "Defense");

  let el_defStat = document.createElement("div");
  el_defStat.innerHTML = _arr[3];

  el_defWrapper.appendChild(el_defImage);
  el_defWrapper.appendChild(el_defStat);

  let el_spdWrapper = document.createElement("div");

  let el_spdImage = document.createElement("img");
  el_spdImage.setAttribute("src", "img/speed.png");
  el_spdImage.setAttribute("alt", "Speed");

  let el_spdStat = document.createElement("div");
  el_spdStat.innerHTML = _arr[4];

  el_spdWrapper.appendChild(el_spdImage);
  el_spdWrapper.appendChild(el_spdStat);

  el_itemStatus.appendChild(el_hpWrapper);
  el_itemStatus.appendChild(el_atkWrapper);
  el_itemStatus.appendChild(el_defWrapper);
  el_itemStatus.appendChild(el_spdWrapper);

  el_itemDesc.appendChild(el_itemName);
  el_itemDesc.appendChild(el_itemStatus);

  el_itemMain.appendChild(el_itemImage);
  el_itemMain.appendChild(el_itemDesc);

  el_item.appendChild(el_itemHeader);
  el_item.appendChild(el_itemMain);

  document.querySelector(".inventory-content").appendChild(el_item);
}

// 개별 아이템의 Tier 생성

function calcTier(_hp, _atk, _def, _spd) {
  let sum = _hp + _atk + _def + _spd;

  if (sum >= legendaryLevel) {
    return "legendary";
  } else if (sum >= epicLevel) {
    return "epic";
  } else if (sum >= rareLevel) {
    return "rare";
  } else if (sum >= uncommonLevel) {
    return "uncommon";
  } else {
    return "common";
  }
}

// 토큰 아이디에 따른 신수 할당

function generateDNA(_id) {
  return parseInt(
    BigInt(ethers.utils.solidityKeccak256(["uint256"], [_id])) % BigInt(32)
  );
}

// 배치여부 및 배치방위 카운트

let deployedCount = [0, 0, 0, 0, 0];

function calcDeployedCount() {
  deployedCount = [0, 0, 0, 0, 0];

  for (let i = 0; i < arr.length; i++) {
    switch (arr[i][5]) {
      case 0:
        deployedCount[0]++;
        break;
      case 1:
        deployedCount[1]++;
        break;
      case 2:
        deployedCount[2]++;
        break;
      case 3:
        deployedCount[3]++;
        break;
      case 4:
        deployedCount[4]++;
        break;
    }
  }

  if (deployedCount[0] == 0) {
    document.querySelector(".deployChecked-btn").style.display = "none";
  }
}

// 아이템 배치 이벤트

async function deployItem() {
  if (direction == 0) {
    return;
  }

  let _index = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] == this.dataset.id) {
      _index = i;
      break;
    }
  }

  startLoading();

  let canDeploy = true;

  await contractPlay.methods
    .checkBeforeDeploy(direction, 1)
    .call()
    .then(async function (res) {
      if (res == false) {
        canDeploy = false;
      }
    })
    .catch(function (err) {
      console.log(err);
    });

  if (canDeploy) {
    try {
      const result = await contractPlay.methods
        .deploy(arr[_index][0], direction)
        .send({
          from: account,
          maxFeePerGas: 64000000000,
          maxPriorityFeePerGas: 32000000000,
        });

      if (result != null) {
        arr[_index][5] = direction;

        items[_index].classList.add("deployed");

        document.getElementsByName("tokenID")[_index].disabled = true;
        document.getElementsByName("tokenID")[_index].checked = false;
        this.disabled = true;
        this.innerHTML = "배치됨";

        alert("신수가 정상적으로 배치되었습니다.");
      }
    } catch (err) {
      console.log(err);
      alert("신수를 배치하지 못하였습니다.");
    }
  } else {
    alert("해당 방위에는 더 이상 신수를 배치할 수 없습니다.");
  }

  endLoading();

  calcDeployedCount();
  changeInventoryTitle();
  changeItemsbyDirection();
}

async function deployItems() {
  if (direction == 0) {
    return;
  }

  let checkboxList = document.getElementsByName("tokenID");

  for (let i = 0; i < arr.length; i++) {
    if (checkboxList[i].checked) {
      break;
    }

    if (i == arr.length - 1) {
      return;
    }
  }

  startLoading();

  let checkedItems = [];
  let checkedTokenIDs = [];

  for (let i = 0; i < arr.length; i++) {
    if (checkboxList[i].checked) {
      checkedItems.push(i);
      checkedTokenIDs.push(arr[i][0]);
    }
  }

  let canDeploy = true;

  await contractPlay.methods
    .checkBeforeDeploy(direction, checkedTokenIDs.length)
    .call()
    .then(async function (res) {
      if (res == false) {
        canDeploy = false;
      }
    })
    .catch(function (err) {
      console.log(err);
    });

  if (canDeploy) {
    try {
      const result = await contractPlay.methods
        .batchDeploy(checkedTokenIDs, direction)
        .send({
          from: account,
          maxFeePerGas: 64000000000,
          maxPriorityFeePerGas: 32000000000,
        });

      if (result != null) {
        for (let i = 0; i < checkedItems.length; i++) {
          arr[checkedItems[i]][5] = direction;
          items[checkedItems[i]].classList.add("deployed");

          checkboxList[checkedItems[i]].disabled = true;
          checkboxList[checkedItems[i]].checked = false;

          document.querySelectorAll(".deploy-btn")[
            checkedItems[i]
          ].disabled = true;
          document.querySelectorAll(".deploy-btn")[checkedItems[i]].innerHTML =
            "배치됨";
        }

        alert("신수가 정상적으로 배치되었습니다.");
      }
    } catch (err) {
      console.log(err);
      alert("신수를 배치하지 못하였습니다.");
    }
  } else {
    alert("해당 방위에는 더 이상 신수를 배치할 수 없습니다.");
  }

  endLoading();

  calcDeployedCount();
  changeInventoryTitle();
  changeItemsbyDirection();
}


function selectAllChecked(){

  let checkboxSelectAll = document.querySelector(".selectAll");
  let checkboxList = document.getElementsByName("tokenID");

  if(checkboxSelectAll.checked){
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][5] == 0) {
        checkboxList[i].checked = true;
      }
    }
  }else{
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][5] == 0) {
        checkboxList[i].checked = false;
      }
    }
  }
}