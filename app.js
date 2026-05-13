const owners = {
  7: { name: "你", className: "owner-red", shop: "茶" },
  12: { name: "你", className: "owner-red" },
  18: { name: "你", className: "owner-red", shop: "药" },
  24: { name: "阿明", className: "owner-cyan", shop: "饭" },
  31: { name: "阿明", className: "owner-cyan" },
  43: { name: "阿明", className: "owner-cyan", shop: "鱼" },
  51: { name: "小林", className: "owner-gold" },
  62: { name: "小林", className: "owner-gold", shop: "洗" },
  78: { name: "小林", className: "owner-gold" },
};

const playerPresets = [
  { name: "你", color: "red", stats: "3 地块 · 2 商铺", you: true },
  { name: "阿明", color: "cyan", stats: "3 地块 · 2 商铺" },
  { name: "小林", color: "gold", stats: "3 地块 · 2 商铺" },
  { name: "阿青", color: "green", stats: "0 地块 · 0 商铺" },
];

function makeLotBlock(xs, ys, rows) {
  return rows.flatMap((row, rowIndex) => row
    .map((id, colIndex) => (id ? { id, cx: xs[colIndex], cy: ys[rowIndex] } : null))
    .filter(Boolean));
}

const lotLayout = [
  ...makeLotBlock([96, 129, 162, 195], [35, 69, 106, 142, 178], [
    [null, 1, 2, null],
    [null, 3, 4, 5],
    [6, 7, 8, 9],
    [10, 11, 12, null],
    [13, 14, 15, null],
  ]),
  ...makeLotBlock([250, 284, 319], [35, 70, 106, 142, 178], [
    [16, 17, 18],
    [19, 20, 21],
    [22, 23, null],
    [26, 27, null],
    [24, 25, null],
  ]),
  ...makeLotBlock([359, 404, 449, 490], [35, 70, 106, 142, 178], [
    [28, 29, 30, null],
    [31, 32, 33, null],
    [34, 35, 36, null],
    [null, 37, 38, 39],
    [null, 40, 41, 42],
  ]),
  ...makeLotBlock([526, 561, 596, 631], [35, 70, 106, 142, 178], [
    [43, 44, 45, 46],
    [47, 48, 49, 50],
    [51, 52, 53, 54],
    [null, null, 55, 56],
    [null, null, 57, 58],
  ]),
  ...makeLotBlock([278, 317, 356], [230, 265, 300, 335, 370], [
    [59, 60, null],
    [61, 62, null],
    [63, 64, 65],
    [66, 67, 68],
    [null, 69, 70],
  ]),
  ...makeLotBlock([449, 484, 519, 554], [230, 265, 300, 335], [
    [71, 72, 73, 74],
    [75, 76, 77, 78],
    [79, 80, 81, 82],
    [83, 84, 85, null],
  ]),
];

const handCards = [7, 12, 18];
const shops = [
  ["茶馆", "茶", 1],
  ["药铺", "药", 1],
  ["饭馆", "饭", 0],
  ["鱼行", "鱼", 0],
  ["洗衣", "洗", 0],
  ["钱庄", "钱", 0],
];

const board = document.querySelector("#board");
const homeScreen = document.querySelector("#homeScreen");
const waitingScreen = document.querySelector("#waitingScreen");
const starterScreen = document.querySelector("#starterScreen");
const moneyScreen = document.querySelector("#moneyScreen");
const gameScreen = document.querySelector("#gameScreen");
const nicknameInput = document.querySelector("#nicknameInput");
const roomCodeInput = document.querySelector("#roomCodeInput");
const waitingRoomCode = document.querySelector("#waitingRoomCode");
const waitingRoomSize = document.querySelector("#waitingRoomSize");
const waitingPlayers = document.querySelector("#waitingPlayers");
const waitingStatus = document.querySelector("#waitingStatus");
const startGameButton = document.querySelector("#startGameButton");
const starterWheel = document.querySelector("#starterWheel");
const starterResult = document.querySelector("#starterResult");
const moneyList = document.querySelector("#moneyList");
const homeError = document.querySelector("#homeError");
const lanUrlText = document.querySelector("#lanUrlText");
const roomPhasePill = document.querySelector("#roomPhasePill");
const selectedSummary = document.querySelector("#selectedSummary");
const cardRow = document.querySelector("#cardRow");
const shopGrid = document.querySelector("#shopGrid");
const playersList = document.querySelector("#playersList");
const playerCountLabel = document.querySelector("#playerCountLabel");
const hintModal = document.querySelector("#hintModal");
const socket = typeof io === "function" ? io() : null;
const params = new URLSearchParams(window.location.search);
const isDevMode = params.get("dev") === "1";
const isCoordMode = params.get("coords") === "1";
let selectedCell = null;
let selectedRoomSize = 3;
let room = null;
let currentGame = null;
let currentPlayerId = null;
let lots = [];
let lotsById = new Map();
let lotsByPosition = new Map();

function showScreen(screen) {
  [homeScreen, waitingScreen, starterScreen, moneyScreen, gameScreen].forEach((item) => {
    item.classList.toggle("is-active", item === screen);
  });
  document.body.classList.toggle("game-active", screen === gameScreen);
}

function requestImmersiveMode() {
  const root = document.documentElement;

  if (!document.fullscreenElement && root.requestFullscreen) {
    root.requestFullscreen({ navigationUI: "hide" }).catch(() => {});
  }

  if (screen.orientation?.lock) {
    screen.orientation.lock("landscape").catch(() => {});
  }

  window.setTimeout(() => window.scrollTo(0, 1), 120);
}

function makeRoomCode() {
  return Math.random().toString(36).slice(2, 6).toUpperCase();
}

function makeRoom(playerCount, code = makeRoomCode()) {
  const hostName = nicknameInput.value.trim() || "你";
  const players = playerPresets.slice(0, playerCount).map((player, index) => ({
    ...player,
    name: index === 0 ? hostName : player.name,
    ready: true,
  }));

  return {
    code,
    playerCount,
    phase: "waiting",
    hostId: "local-host",
    starterId: null,
    players,
    hostName,
  };
}

function makeLocalGame() {
  const rules = {
    3: { deal: 7, keep: 5, shops: 6 },
    4: { deal: 6, keep: 4, shops: 4 },
  };
  const rule = rules[room.playerCount];
  return {
    round: 1,
    phase: "starter",
    buildingCards: Array.from({ length: rule.deal }, (_, index) => index + 1),
    buildingKeepCount: rule.keep,
    buildingDealCount: rule.deal,
    shopTileDrawCount: rule.shops,
    deckRemaining: 85 - rule.deal * room.playerCount,
  };
}

function makeDevGame() {
  return {
    round: 1,
    phase: "building-draft",
    buildingCards: [7, 12, 18, 24, 31, 43, 51],
    buildingKeepCount: 5,
    buildingDealCount: 7,
    shopTileDrawCount: 6,
    deckRemaining: 64,
  };
}

function setHomeError(message = "") {
  homeError.textContent = message;
}

function isHost() {
  return room && (room.hostId === currentPlayerId || !socket);
}

async function renderNetworkInfo() {
  try {
    const response = await fetch("/api/network-info");
    if (!response.ok) throw new Error("network info failed");
    const info = await response.json();
    lanUrlText.textContent = info.lan?.[0] || info.local || window.location.href;
  } catch (error) {
    lanUrlText.textContent = window.location.href;
  }
}

function buildLots() {
  return lotLayout;
}

function getNeighbors(lot) {
  const tolerance = 9;

  return lots.filter((candidate) => {
    if (candidate.id === lot.id) return false;

    const horizontalTouch = Math.abs(candidate.cx - lot.cx) <= 38 + tolerance
      && Math.abs(candidate.cy - lot.cy) <= tolerance;
    const verticalTouch = Math.abs(candidate.cy - lot.cy) <= 35 + tolerance
      && Math.abs(candidate.cx - lot.cx) <= tolerance;

    return horizontalTouch || verticalTouch;
  });
}

function renderBoard() {
  board.innerHTML = "";
  lots = buildLots();
  lotsById = new Map(lots.map((lot) => [lot.id, lot]));
  lotsByPosition = new Map(lots.map((lot) => [`${lot.x},${lot.y}`, lot]));

  lots.forEach((lot) => {
    const cell = document.createElement("button");
    const owner = owners[lot.id];

    cell.type = "button";
    cell.className = "cell";
    cell.textContent = lot.id;
    cell.dataset.id = String(lot.id);
    cell.style.setProperty("--x", `${(lot.cx / 720) * 100}%`);
    cell.style.setProperty("--y", `${(lot.cy / 440) * 100}%`);

    if (owner) {
      cell.classList.add(owner.className);
    }

    if (owner?.shop) {
      cell.classList.add("has-shop");
      cell.dataset.shop = owner.shop;
    }

    cell.addEventListener("click", () => selectCell(lot.id, cell));
    board.appendChild(cell);
  });
}

function renderPlayers() {
  playersList.innerHTML = "";
  const activePlayers = room?.players || playerPresets.slice(0, selectedRoomSize);
  playersList.className = `player-list count-${activePlayers.length}`;
  playerCountLabel.textContent = `${activePlayers.length}人局`;

  activePlayers.forEach((player) => {
    const playerEl = document.createElement("article");
    playerEl.className = player.you || player.id === currentPlayerId ? "player is-you" : "player";
    playerEl.innerHTML = `
      <span class="avatar ${player.color}"></span>
      <div>
        <strong>${player.name}</strong>
        <small>${player.stats}</small>
      </div>
    `;
    playersList.appendChild(playerEl);
  });
}

function renderWaitingRoom() {
  waitingRoomCode.textContent = `房间 ${room.code}`;
  waitingRoomSize.textContent = `${room.playerCount}人局`;
  waitingPlayers.innerHTML = "";

  room.players.forEach((player, index) => {
    const item = document.createElement("article");
    item.className = "waiting-player";
    item.innerHTML = `
      <span><i class="avatar ${player.color}"></i><strong>${player.name}</strong></span>
      <small>${index === 0 ? "房主" : "已加入"}</small>
    `;
    waitingPlayers.appendChild(item);
  });

  const currentCount = room.players.length;
  const isFull = currentCount === room.playerCount;
  startGameButton.hidden = !isHost();
  startGameButton.disabled = !isFull;

  if (!isHost()) {
    waitingStatus.textContent = `已加入 ${currentCount}/${room.playerCount}，等待房主开始。`;
  } else if (!isFull) {
    waitingStatus.textContent = `已加入 ${currentCount}/${room.playerCount}，人数满后可以开始。`;
  } else {
    waitingStatus.textContent = "人数已满，可以开始游戏。";
  }
}

function getStarterPlayer() {
  return room?.players.find((player) => player.id === room.starterId) || room?.players[0];
}

function renderStarterWheel() {
  const starter = getStarterPlayer();
  starterWheel.innerHTML = `<span class="starter-name">${starter?.name || "..."}</span>`;
  starterResult.textContent = "转盘转动中...";
  starterWheel.classList.remove("is-spinning");

  requestAnimationFrame(() => {
    starterWheel.classList.add("is-spinning");
  });

  window.setTimeout(() => {
    starterResult.textContent = `${starter.name} 成为本局起始玩家`;
    window.setTimeout(showMoneyIntro, 650);
  }, 1850);
}

function showMoneyIntro() {
  moneyList.innerHTML = "";

  room.players.forEach((player, index) => {
    const row = document.createElement("article");
    row.className = "money-row";
    row.style.animationDelay = `${index * 180}ms`;
    row.innerHTML = `<strong>${player.name}</strong><b>+$50,000</b>`;
    moneyList.appendChild(row);
  });

  showScreen(moneyScreen);
  window.setTimeout(showBuildingDraft, 1500 + room.players.length * 180);
}

function showBuildingDraft() {
  if (currentGame) {
    currentGame.phase = "building-draft";
  }

  renderPlayers();
  renderHand();
  renderShops();
  roomPhasePill.textContent = `${room.code} · 第${currentGame.round}轮选地块`;
  selectedSummary.textContent = `从 ${currentGame.buildingDealCount} 张候选地块中保留 ${currentGame.buildingKeepCount} 张`;
  showScreen(gameScreen);
}

function renderHand() {
  cardRow.innerHTML = "";
  const cards = currentGame?.buildingCards || handCards;
  const keepCount = currentGame?.buildingKeepCount;

  cards.forEach((id) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "deed-card";
    card.innerHTML = `<small>${keepCount ? "候选地块" : "地块"}</small><strong>${id}</strong><small>点击定位</small>`;
    card.addEventListener("click", () => {
      const target = document.querySelector(`.cell[data-id="${id}"]`);
      target?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      target?.click();
    });
    cardRow.appendChild(card);
  });
}

function renderShops() {
  shopGrid.innerHTML = "";

  if (currentGame?.phase === "building-draft") {
    const chip = document.createElement("div");
    chip.className = "shop-chip wide";
    chip.innerHTML = `<span>本轮稍后抽取商铺砖</span><strong>x${currentGame.shopTileDrawCount}</strong>`;
    shopGrid.appendChild(chip);
    return;
  }

  shops.forEach(([name, icon, count]) => {
    const chip = document.createElement("div");
    chip.className = "shop-chip";
    chip.innerHTML = `<span>${icon} ${name}</span><strong>x${count}</strong>`;
    shopGrid.appendChild(chip);
  });
}

function selectCell(id, element) {
  if (selectedCell === element) {
    clearSelection();
    return;
  }

  selectedCell?.classList.remove("is-selected");
  selectedCell = element;
  selectedCell.classList.add("is-selected");

  const owner = owners[id];
  const lot = lotsById.get(id);
  const neighborIds = getNeighbors(lot).map((neighbor) => neighbor.id).join("、") || "无";
  const ownerText = owner ? `${owner.name}${owner.shop ? ` · ${owner.shop}` : ""}` : "无主";
  selectedSummary.textContent = `${id}号地块 · ${ownerText} · 邻 ${neighborIds}`;
}

function clearSelection() {
  selectedCell?.classList.remove("is-selected");
  selectedCell = null;
  selectedSummary.textContent = "未选择地块";
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("is-active"));
    document.querySelectorAll(".tab-panel").forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    document.querySelector(`#${tab.dataset.tab}`).classList.add("is-active");
  });
});

document.querySelectorAll(".room-size-option").forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelectorAll(".room-size-option").forEach((item) => item.classList.remove("is-active"));
    option.classList.add("is-active");
    selectedRoomSize = Number(option.dataset.size);
  });
});

document.querySelector("#createRoomButton").addEventListener("click", () => {
  setHomeError();

  if (!socket) {
    room = makeRoom(selectedRoomSize);
    currentPlayerId = "local-host";
    renderWaitingRoom();
    showScreen(waitingScreen);
    return;
  }

  socket.emit("createRoom", {
    nickname: nicknameInput.value.trim(),
    playerCount: selectedRoomSize,
  }, (reply) => {
    if (!reply?.ok) {
      setHomeError(reply?.error || "创建房间失败。");
      return;
    }

    currentPlayerId = reply.selfId;
    room = reply.room;
    renderWaitingRoom();
    showScreen(waitingScreen);
  });
});

document.querySelector("#joinRoomButton").addEventListener("click", () => {
  setHomeError();
  const code = roomCodeInput.value.trim().toUpperCase();

  if (!code) {
    setHomeError("请先输入房间码。");
    return;
  }

  if (!socket) {
    room = makeRoom(3, code);
    currentPlayerId = "local-host";
    renderWaitingRoom();
    showScreen(waitingScreen);
    return;
  }

  socket.emit("joinRoom", {
    nickname: nicknameInput.value.trim(),
    code,
  }, (reply) => {
    if (!reply?.ok) {
      setHomeError(reply?.error || "加入房间失败。");
      return;
    }

    currentPlayerId = reply.selfId;
    room = reply.room;
    renderWaitingRoom();
    showScreen(waitingScreen);
  });
});

document.querySelector("#backHomeButton").addEventListener("click", () => {
  room = null;
  showScreen(homeScreen);
});

document.querySelector("#startGameButton").addEventListener("click", () => {
  requestImmersiveMode();

  if (!socket) {
    room.phase = "playing";
    room.starterId = room.players[Math.floor(Math.random() * room.players.length)].id;
    currentGame = makeLocalGame();
    renderStarterWheel();
    showScreen(starterScreen);
    return;
  }

  socket.emit("startGame", { code: room.code }, (reply) => {
    if (!reply?.ok) {
      waitingStatus.textContent = reply?.error || "暂时不能开始游戏。";
    }
  });
});

document.querySelector("#hintButton").addEventListener("click", () => {
  hintModal.setAttribute("aria-hidden", "false");
});

document.querySelector("#startTradeButton").addEventListener("click", () => {
  selectedSummary.textContent = "交易功能下一步接入：选择对象、地块、商铺和现金。";
});

document.querySelector("#closeHint").addEventListener("click", () => {
  hintModal.setAttribute("aria-hidden", "true");
});

hintModal.addEventListener("click", (event) => {
  if (event.target === hintModal) {
    hintModal.setAttribute("aria-hidden", "true");
  }
});

if (socket) {
  socket.on("connect", () => {
    currentPlayerId ||= socket.id;
  });

  socket.on("roomState", (nextRoom) => {
    room = nextRoom;

    if (waitingScreen.classList.contains("is-active")) {
      renderWaitingRoom();
    }

    if (gameScreen.classList.contains("is-active")) {
      renderPlayers();
    }
  });

  socket.on("gameStarted", (payload) => {
    room = payload.room;
    currentGame = payload.game;
    renderStarterWheel();
    showScreen(starterScreen);
  });
}

renderBoard();
renderPlayers();
renderHand();
renderShops();
renderNetworkInfo();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}

if (isCoordMode) {
  document.body.classList.add("coord-mode");
}

if (isDevMode) {
  room = makeRoom(3, "DEV1");
  room.phase = "playing";
  room.starterId = room.players[0].id;
  currentPlayerId = "local-host";
  currentGame = makeDevGame();
  renderStarterWheel();
  showScreen(starterScreen);
} else {
  showScreen(homeScreen);
}
