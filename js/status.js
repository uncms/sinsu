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
    nftInfo[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    await contractStatus.methods
      .getAllData(nftList[i])
      .call({
        from: account,
      })
      .then(function (res) {
        nftInfo[i][0] = parseInt(res[0]);
        nftInfo[i][1] = parseInt(res[1]);
        nftInfo[i][2] = parseInt(res[2]);
        nftInfo[i][3] = parseInt(res[3]);
        nftInfo[i][4] = parseInt(res[4]);
        if (parseInt(res[5]) == 1) {
          nftInfo[i][5] = true;
        } else {
          nftInfo[i][5] = false;
        }
        nftInfo[i][6] = parseInt(res[6]);
        if (parseInt(res[7]) == 1) {
          nftInfo[i][7] = true;
        } else {
          nftInfo[i][7] = false;
        }
        nftInfo[i][8] = parseInt(res[8]);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  arr = nftInfo;
}

//Countdown 이벤트

const open = new Date(2023, 01, 04, 23, 59, 59);
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

  if (selectedRadio == 0) {
    document.querySelector(".rewardChecked-btn").style.display = "block";
    document.querySelector(".upgradeChecked-btn").style.display = "none";
  } else {
    document.querySelector(".rewardChecked-btn").style.display = "none";
    document.querySelector(".upgradeChecked-btn").style.display = "block";
  }

  changeInventoryTitle();
  changeItemsbyUpgradable();
}

function changeInventoryTitle() {
  switch (selectedRadio) {
    case 0:
      inventoryTitle.innerHTML =
        "나의 신수 : " +
        arr.length +
        " <span>(" +
        upgradableCount[0] +
        " 마리 신수가 리워드 수령 가능)</span>";
      break;
    case 1:
      inventoryTitle.innerHTML =
        "나의 신수 : " +
        arr.length +
        " <span>(" +
        upgradableCount[1] +
        " 마리 신수의 포인트 분배 가능)</span>";
      break;
    case 2:
      inventoryTitle.innerHTML =
        "나의 신수 : " +
        arr.length +
        " <span>(" +
        upgradableCount[2] +
        " 마리 신수의 포인트 분배됨)</span>";
      break;
  }
}

let items = [];

function changeItemsbyUpgradable() {
  items = document.querySelectorAll(".item");

  switch (selectedRadio) {
    case 0:
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][7]) {
          items[i].style.display = "block";
        } else {
          items[i].style.display = "none";
        }
      }
      break;
    case 1:
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][5]) {
          items[i].style.display = "block";
        } else {
          items[i].style.display = "none";
        }

        if (arr[i][7]) {
          items[i].style.display = "none";
        }
      }
      break;
    case 2:
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i][5]) {
          items[i].style.display = "block";
        } else {
          items[i].style.display = "none";
        }

        if (arr[i][7]) {
          items[i].style.display = "none";
        }
      }
      break;
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
  document.querySelector(".rewardChecked-btn").style.display = "none";
  document.querySelector(".upgradeChecked-btn").style.display = "none";
  document.querySelector(".inventory-content").style.display = "none";
  document.querySelector(".preloader").style.display = "flex";
}

function endLoading() {
  document.querySelector(".preloader").style.display = "none";
  document.querySelector(".inventory-radio").style.display = "flex";

  if (selectedRadio == 0) {
    document.querySelector(".rewardChecked-btn").style.display = "block";
  } else {
    document.querySelector(".upgradeChecked-btn").style.display = "block";
  }

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

  calcUpgradableCount();
  changeInventoryTitle();
  changeItemsbyUpgradable();
}

function createItem(_arr) {
  let tier = calcTier(_arr[1], _arr[2], _arr[3], _arr[4]);
  let dna = generateDNA(_arr[0]);

  let el_item = document.createElement("div");

  if (_arr[5] == true) {
    el_item.setAttribute("class", "item " + tier + " upgradable");
  } else {
    el_item.setAttribute("class", "item " + tier);
  }

  if (_arr[7] == true) {
    el_item.setAttribute("class", "item " + tier + " upgradable");
  }

  let el_itemHeader = document.createElement("div");
  el_itemHeader.setAttribute("class", "item-header");

  let el_label = document.createElement("label");

  let el_input = document.createElement("input");
  el_input.setAttribute("type", "checkbox");
  el_input.setAttribute("name", "tokenID");
  el_input.setAttribute("value", _arr[0]);

  if (_arr[5] == false) {
    el_input.disabled = true;
  }

  if (_arr[7] == true) {
    el_input.disabled = false;
  }

  let el_p = document.createElement("p");
  el_p.setAttribute("class", "item-id");
  el_p.innerHTML = "SINSU #" + _arr[0] + " <span>[" + _arr[6] + "P]</span>";

  let el_span = document.createElement("span");

  el_label.appendChild(el_input);
  el_label.appendChild(el_p);
  el_label.appendChild(el_span);

  let el_button = document.createElement("button");
  el_button.setAttribute("class", "upgrade-btn");
  el_button.setAttribute("data-id", _arr[0]);
  el_button.innerHTML = "육성하기";
  el_button.onclick = rewardOrUpgrade;

  if (_arr[5] == false) {
    el_button.disabled = true;
    el_button.innerHTML = "육성됨";
  }

  if (_arr[7] == true) {
    el_button.disabled = false;
    el_button.innerHTML = "리워드";
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
  el_tier.setAttribute("class", "img-tier");
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
  el_hpStat.setAttribute("class", "hp-stat");
  el_hpStat.innerHTML = _arr[1];

  el_hpWrapper.appendChild(el_hpImage);
  el_hpWrapper.appendChild(el_hpStat);

  let el_atkWrapper = document.createElement("div");

  let el_atkImage = document.createElement("img");
  el_atkImage.setAttribute("src", "img/attack.png");
  el_atkImage.setAttribute("alt", "Attack");

  let el_atkStat = document.createElement("div");
  el_atkStat.setAttribute("class", "atk-stat");
  el_atkStat.innerHTML = _arr[2];

  el_atkWrapper.appendChild(el_atkImage);
  el_atkWrapper.appendChild(el_atkStat);

  let el_defWrapper = document.createElement("div");

  let el_defImage = document.createElement("img");
  el_defImage.setAttribute("src", "img/defense.png");
  el_defImage.setAttribute("alt", "Defense");

  let el_defStat = document.createElement("div");
  el_defStat.setAttribute("class", "def-stat");
  el_defStat.innerHTML = _arr[3];

  el_defWrapper.appendChild(el_defImage);
  el_defWrapper.appendChild(el_defStat);

  let el_spdWrapper = document.createElement("div");

  let el_spdImage = document.createElement("img");
  el_spdImage.setAttribute("src", "img/speed.png");
  el_spdImage.setAttribute("alt", "Speed");

  let el_spdStat = document.createElement("div");
  el_spdStat.setAttribute("class", "spd-stat");
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

// 분배여부 카운트

let upgradableCount = [0, 0, 0];

function calcUpgradableCount() {
  upgradableCount = [0, 0, 0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][7]) {
      upgradableCount[0]++;
    } else if (!arr[i][7] && arr[i][5]) {
      upgradableCount[1]++;
    } else if (!arr[i][7] && !arr[i][5]) {
      upgradableCount[2]++;
    }
  }

  if (upgradableCount[0] == 0) {
    document.querySelector(".rewardChecked-btn").style.display = "none";
  }

  if (upgradableCount[1] == 0) {
    document.querySelector(".upgradeChecked-btn").style.display = "none";
  }
}

function rewardOrUpgrade() {
  let _index = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] == this.dataset.id) {
      _index = i;
      break;
    }
  }

  if (arr[_index][7]) {
    rewardItem(this);
  } else {
    upgradeItem(this);
  }
}

async function rewardItem(e) {
  let _index = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] == e.dataset.id) {
      _index = i;
      break;
    }
  }

  startLoading();

  try {
    const result = await contractStatus.methods.reward(arr[_index][0]).send({
      from: account,
      maxFeePerGas: 64000000000,
      maxPriorityFeePerGas: 32000000000,
    });

    if (result != null) {
      arr[_index][5] = true;
      arr[_index][6] += arr[_index][8];

      arr[_index][7] = false;
      arr[_index][8] = 0;

      document.getElementsByName("tokenID")[_index].checked = false;
      e.innerHTML = "육성하기";
      document.querySelectorAll(".item-id")[_index].innerHTML =
        "SINSU #" + arr[_index][0] + " <span>[" + arr[_index][6] + "P]</span>";

      alert("신수가 정상적으로 리워드를 획득하였습니다.");
    }
  } catch (err) {
    console.log(err);
    alert("신수가 리워드를 획득하지 못하였습니다.");
  }

  endLoading();

  calcUpgradableCount();
  changeInventoryTitle();
  changeItemsbyUpgradable();
}

// 아이템 분배 이벤트
async function upgradeItem(e) {
  let _index = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] == e.dataset.id) {
      _index = i;
      break;
    }
  }

  startLoading();

  try {
    const result = await contractStatus.methods.upgrade(arr[_index][0]).send({
      from: account,
      maxFeePerGas: 64000000000,
      maxPriorityFeePerGas: 32000000000,
    });

    if (result != null) {
      arr[_index][5] = false;
      arr[_index][6] = 0;

      items[_index].classList.remove("upgradable");

      document.getElementsByName("tokenID")[_index].disabled = true;
      document.getElementsByName("tokenID")[_index].checked = false;
      e.disabled = true;
      e.innerHTML = "육성됨";
      document.querySelectorAll(".item-id")[_index].innerHTML =
        "SINSU #" + arr[_index][0] + " <span>[0P]</span>";

      let curTier = calcTier(
        arr[_index][1],
        arr[_index][2],
        arr[_index][3],
        arr[_index][4]
      );

      let newData = [0, 0, 0, 0];

      await contractStatus.methods
        .getStats(arr[_index][0])
        .call({
          from: account,
        })
        .then(function (res) {
          newData[0] = parseInt(res[0]);
          newData[1] = parseInt(res[1]);
          newData[2] = parseInt(res[2]);
          newData[3] = parseInt(res[3]);
        })
        .catch(function (err) {
          console.log(err);
        });

      let newTier = calcTier(newData[0], newData[1], newData[2], newData[3]);

      arr[_index][1] = newData[0];
      arr[_index][2] = newData[1];
      arr[_index][3] = newData[2];
      arr[_index][4] = newData[3];

      document.querySelectorAll(".hp-stat")[_index].innerHTML = newData[0];
      document.querySelectorAll(".atk-stat")[_index].innerHTML = newData[1];
      document.querySelectorAll(".def-stat")[_index].innerHTML = newData[2];
      document.querySelectorAll(".spd-stat")[_index].innerHTML = newData[3];

      document
        .querySelectorAll(".item")
        [_index].classList.replace(curTier, newTier);

      document.querySelectorAll(".img-tier")[_index].src =
        "img/" + newTier + ".png";

      document.querySelectorAll(".img-tier")[_index].alt = newTier.replace(
        /^[a-z]/,
        (char) => char.toUpperCase()
      );

      alert("신수가 정상적으로 성장하였습니다.");
    }
  } catch (err) {
    console.log(err);
    alert("신수가 성장하지 못하였습니다.");
  }

  endLoading();

  calcUpgradableCount();
  changeInventoryTitle();
  changeItemsbyUpgradable();
}

async function rewardItems() {
  let checkboxList = document.getElementsByName("tokenID");

  for (let i = 0; i < arr.length; i++) {
    if (checkboxList[i].checked && arr[i][7]) {
      break;
    }

    if (i == arr.length - 1) {
      return;
    }
  }

  startLoading();

  let checkedItems = [];
  let checkedTokenIDs = [];
  let checkedPoints = [];

  for (let i = 0; i < arr.length; i++) {
    if (checkboxList[i].checked && arr[i][7]) {
      checkedItems.push(i);
      checkedTokenIDs.push(arr[i][0]);
      checkedPoints.push(arr[i][8]);
    }
  }

  if (checkedTokenIDs.length == 0) {
    return;
  }

  try {
    const result = await contractStatus.methods
      .batchReward(checkedTokenIDs)
      .send({
        from: account,
        maxFeePerGas: 64000000000,
        maxPriorityFeePerGas: 32000000000,
      });

    if (result != null) {
      for (let i = 0; i < checkedItems.length; i++) {
        arr[checkedItems[i]][5] = true;
        arr[checkedItems[i]][6] += arr[checkedItems[i]][8];

        arr[checkedItems[i]][7] = false;
        arr[checkedItems[i]][8] = 0;
        checkboxList[checkedItems[i]].checked = false;

        document.querySelectorAll(".upgrade-btn")[checkedItems[i]].innerHTML =
          "육성하기";
        document.querySelectorAll(".item-id")[checkedItems[i]].innerHTML =
          "SINSU #" +
          arr[checkedItems[i]][0] +
          " <span>[" +
          arr[checkedItems[i]][6] +
          "P]</span>";
      }

      alert("신수가 정상적으로 리워드를 획득하였습니다.");
    }
  } catch (err) {
    console.log(err);
    alert("신수가 리워드를 획득하지 못하였습니다.");
  }

  endLoading();

  calcUpgradableCount();
  changeInventoryTitle();
  changeItemsbyUpgradable();
}

async function upgradeItems() {
  let checkboxList = document.getElementsByName("tokenID");

  for (let i = 0; i < arr.length; i++) {
    if (checkboxList[i].checked && !arr[i][7]) {
      break;
    }

    if (i == arr.length - 1) {
      return;
    }
  }

  startLoading();

  let checkedItems = [];
  let checkedTokenIDs = [];
  let checkedPoints = [];

  for (let i = 0; i < arr.length; i++) {
    if (checkboxList[i].checked && !arr[i][7]) {
      checkedItems.push(i);
      checkedTokenIDs.push(arr[i][0]);
      checkedPoints.push(arr[i][6]);
    }
  }

  try {
    const result = await contractStatus.methods
      .batchUpgrade(checkedTokenIDs)
      .send({
        from: account,
        maxFeePerGas: 64000000000,
        maxPriorityFeePerGas: 32000000000,
      });

    if (result != null) {
      for (let i = 0; i < checkedItems.length; i++) {
        arr[checkedItems[i]][5] = false;
        arr[checkedItems[i]][6] = 0;
        items[checkedItems[i]].classList.remove("upgradable");

        checkboxList[checkedItems[i]].disabled = true;
        checkboxList[checkedItems[i]].checked = false;

        document.querySelectorAll(".upgrade-btn")[
          checkedItems[i]
        ].disabled = true;
        document.querySelectorAll(".upgrade-btn")[checkedItems[i]].innerHTML =
          "육성됨";
        document.querySelectorAll(".item-id")[checkedItems[i]].innerHTML =
          "SINSU #" + arr[checkedItems[i]][0] + " <span>[0P]</span>";

        let curTier = calcTier(
          arr[checkedItems[i]][1],
          arr[checkedItems[i]][2],
          arr[checkedItems[i]][3],
          arr[checkedItems[i]][4]
        );

        let newData = [0, 0, 0, 0];

        await contractStatus.methods
          .getStats(arr[checkedItems[i]][0])
          .call({
            from: account,
          })
          .then(function (res) {
            newData[0] = parseInt(res[0]);
            newData[1] = parseInt(res[1]);
            newData[2] = parseInt(res[2]);
            newData[3] = parseInt(res[3]);
          })
          .catch(function (err) {
            console.log(err);
          });

        let newTier = calcTier(newData[0], newData[1], newData[2], newData[3]);

        arr[checkedItems[i]][1] = newData[0];
        arr[checkedItems[i]][2] = newData[1];
        arr[checkedItems[i]][3] = newData[2];
        arr[checkedItems[i]][4] = newData[3];

        document.querySelectorAll(".hp-stat")[checkedItems[i]].innerHTML =
          newData[0];
        document.querySelectorAll(".atk-stat")[checkedItems[i]].innerHTML =
          newData[1];
        document.querySelectorAll(".def-stat")[checkedItems[i]].innerHTML =
          newData[2];
        document.querySelectorAll(".spd-stat")[checkedItems[i]].innerHTML =
          newData[3];

        document
          .querySelectorAll(".item")
          [checkedItems[i]].classList.replace(curTier, newTier);

        document.querySelectorAll(".img-tier")[checkedItems[i]].src =
          "img/" + newTier + ".png";

        document.querySelectorAll(".img-tier")[checkedItems[i]].alt =
          newTier.replace(/^[a-z]/, (char) => char.toUpperCase());
      }

      alert("신수가 정상적으로 성장하였습니다.");
    }
  } catch (err) {
    console.log(err);
    alert("신수가 성장하지 못하였습니다.");
  }

  endLoading();

  calcUpgradableCount();
  changeInventoryTitle();
  changeItemsbyUpgradable();
}
