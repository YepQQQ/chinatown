const ownerClassByColor = {
  red: "owner-red",
  cyan: "owner-cyan",
  gold: "owner-gold",
  green: "owner-green",
};

const playerPresets = [
  { name: "你", color: "red", stats: "3 地块 · 2 商铺", you: true },
  { name: "阿明", color: "cyan", stats: "3 地块 · 2 商铺" },
  { name: "小林", color: "gold", stats: "3 地块 · 2 商铺" },
  { name: "阿青", color: "green", stats: "0 地块 · 0 商铺" },
];

const MAP_WIDTH = 2028;
const MAP_HEIGHT = 1404;

function lot(id, x, y, w, h) {
  return {
    id,
    x,
    y,
    w,
    h,
    cx: x + w / 2,
    cy: y + h / 2,
  };
}

const lotLayout = [
  lot(1, 310, 245, 78, 78),
  lot(2, 420, 245, 78, 78),
  lot(3, 310, 355, 78, 78),
  lot(4, 420, 355, 78, 78),
  lot(5, 530, 355, 78, 78),
  lot(6, 200, 465, 78, 78),
  lot(7, 310, 465, 78, 78),
  lot(8, 420, 465, 78, 78),
  lot(9, 530, 465, 78, 78),
  lot(10, 200, 575, 78, 78),
  lot(11, 310, 575, 78, 78),
  lot(12, 420, 575, 78, 78),
  lot(13, 200, 685, 78, 78),
  lot(14, 310, 685, 78, 78),
  lot(15, 420, 685, 78, 78),
  lot(16, 688, 245, 78, 78),
  lot(17, 798, 245, 78, 78),
  lot(18, 908, 245, 78, 78),
  lot(19, 688, 355, 78, 78),
  lot(20, 798, 355, 78, 78),
  lot(21, 908, 355, 78, 78),
  lot(22, 688, 465, 78, 78),
  lot(23, 798, 465, 78, 78),
  lot(24, 688, 575, 78, 78),
  lot(25, 798, 575, 78, 78),
  lot(26, 688, 685, 78, 78),
  lot(27, 798, 685, 78, 78),
  lot(28, 1081, 245, 78, 78),
  lot(29, 1191, 245, 78, 78),
  lot(30, 1301, 245, 78, 78),
  lot(31, 1081, 355, 78, 78),
  lot(32, 1191, 355, 78, 78),
  lot(33, 1301, 355, 78, 78),
  lot(34, 1081, 465, 78, 78),
  lot(35, 1191, 465, 78, 78),
  lot(36, 1301, 465, 78, 78),
  lot(37, 1191, 575, 78, 78),
  lot(38, 1301, 575, 78, 78),
  lot(39, 1411, 575, 78, 78),
  lot(40, 1191, 685, 78, 78),
  lot(41, 1301, 685, 78, 78),
  lot(42, 1411, 685, 78, 78),
  lot(43, 1564, 247, 78, 78),
  lot(44, 1666, 247, 78, 78),
  lot(45, 1774, 247, 78, 78),
  lot(46, 1876, 247, 78, 78),
  lot(47, 1564, 357, 78, 78),
  lot(48, 1666, 357, 78, 78),
  lot(49, 1774, 357, 78, 78),
  lot(50, 1876, 357, 78, 78),
  lot(51, 1564, 467, 78, 78),
  lot(52, 1666, 467, 78, 78),
  lot(53, 1774, 467, 78, 78),
  lot(54, 1876, 467, 78, 78),
  lot(55, 1774, 579, 78, 78),
  lot(56, 1876, 579, 78, 78),
  lot(57, 1774, 685, 78, 78),
  lot(58, 1876, 685, 78, 78),
  lot(59, 794, 836, 78, 78),
  lot(60, 904, 836, 78, 78),
  lot(61, 794, 932, 78, 78),
  lot(62, 904, 932, 78, 78),
  lot(63, 794, 1026, 78, 78),
  lot(64, 904, 1026, 78, 78),
  lot(65, 1016, 1026, 78, 78),
  lot(66, 794, 1122, 78, 78),
  lot(67, 904, 1122, 78, 78),
  lot(68, 1016, 1122, 78, 78),
  lot(69, 904, 1216, 78, 78),
  lot(70, 1016, 1216, 78, 78),
  lot(71, 1327, 836, 78, 78),
  lot(72, 1437, 836, 78, 78),
  lot(73, 1549, 836, 78, 78),
  lot(74, 1659, 836, 78, 78),
  lot(75, 1327, 932, 78, 78),
  lot(76, 1437, 932, 78, 78),
  lot(77, 1549, 932, 78, 78),
  lot(78, 1659, 932, 78, 78),
  lot(79, 1327, 1026, 78, 78),
  lot(80, 1437, 1026, 78, 78),
  lot(81, 1549, 1026, 78, 78),
  lot(82, 1659, 1026, 78, 78),
  lot(83, 1327, 1122, 78, 78),
  lot(84, 1437, 1122, 78, 78),
  lot(85, 1549, 1122, 78, 78),
];

const handCards = [7, 12, 18];
const shopCatalog = [
  { id: "antique", name: "古董店", mark: "古", size: 5, image: "assets/shop-icons/古董店.png" },
  { id: "photo", name: "照相馆", mark: "照", size: 3, image: "assets/shop-icons/照相馆.png" },
  { id: "factory", name: "工厂", mark: "工", size: 6, image: "assets/shop-icons/工厂.png" },
  { id: "clothing", name: "服装店", mark: "服", size: 5, image: "assets/shop-icons/服装店.png" },
  { id: "laundry", name: "洗衣店", mark: "洗", size: 4, image: "assets/shop-icons/洗衣店.png" },
  { id: "tea", name: "茶馆", mark: "茶", size: 3, image: "assets/shop-icons/茶馆.png" },
  { id: "restaurant", name: "饭店", mark: "饭", size: 4, image: "assets/shop-icons/饭店.png" },
  { id: "pawn", name: "当铺", mark: "当", size: 5, image: "assets/shop-icons/当铺.png" },
  { id: "florist", name: "花店", mark: "花", size: 4, image: "assets/shop-icons/花店.png" },
  { id: "dimsum", name: "点心店", mark: "点", size: 3, image: "assets/shop-icons/点心店.png" },
  { id: "jewelry", name: "珠宝店", mark: "宝", size: 6, image: "assets/shop-icons/珠宝店.png" },
  { id: "seafood", name: "海鲜店", mark: "鲜", size: 3, image: "assets/shop-icons/海鲜店.png" },
];

const board = document.querySelector("#board");
const boardWrap = document.querySelector("#boardWrap");
const mapMeasure = document.querySelector("#mapMeasure");
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
const roundLabel = document.querySelector("#roundLabel");
const cashLabel = document.querySelector("#cashLabel");
const selectedSummary = document.querySelector("#selectedSummary");
const cardRow = document.querySelector("#cardRow");
const draftAction = document.querySelector("#draftAction");
const shopGrid = document.querySelector("#shopGrid");
const playersList = document.querySelector("#playersList");
const playerCountLabel = document.querySelector("#playerCountLabel");
const playersButton = document.querySelector("#playersButton");
const playersModal = document.querySelector("#playersModal");
const playersTitle = document.querySelector("#playersTitle");
const playerModalList = document.querySelector("#playerModalList");
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
let lotOwners = {};
let selectedBuildingKeeps = new Set();
let buildingDraftConfirmed = false;
let selectedShopCardId = null;

function showScreen(screen) {
  [homeScreen, waitingScreen, starterScreen, moneyScreen, gameScreen].forEach((item) => {
    item.classList.toggle("is-active", item === screen);
  });
  document.body.classList.toggle("game-active", screen === gameScreen);

  if (screen === gameScreen) {
    requestAnimationFrame(resizeBoardToContain);
  }
}

function resizeBoardToContain() {
  const wrapWidth = boardWrap.clientWidth;
  const wrapHeight = boardWrap.clientHeight;
  if (!wrapWidth || !wrapHeight) return;

  const mapRatio = MAP_WIDTH / MAP_HEIGHT;
  const wrapRatio = wrapWidth / wrapHeight;
  const boardWidth = wrapRatio > mapRatio ? wrapHeight * mapRatio : wrapWidth;
  const boardHeight = wrapRatio > mapRatio ? wrapHeight : wrapWidth / mapRatio;

  board.style.width = `${boardWidth}px`;
  board.style.height = `${boardHeight}px`;
  const frameRatio = wrapWidth / wrapHeight;
  const renderedRatio = boardWidth / boardHeight;
  const measureText = `框 ${Math.round(wrapWidth)}x${Math.round(wrapHeight)} ${frameRatio.toFixed(3)} | 图 ${Math.round(boardWidth)}x${Math.round(boardHeight)} ${renderedRatio.toFixed(3)}`;
  board.dataset.measure = measureText;
  mapMeasure.textContent = measureText;
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
    phase: "building-draft",
    buildingCards: Array.from({ length: rule.deal }, (_, index) => index + 1),
    keptBuildingIds: [],
    publicLots: [],
    buildingConfirmed: false,
    buildingReadyCount: 0,
    buildingKeepCount: rule.keep,
    buildingDealCount: rule.deal,
    shopCards: [],
    shopTileDrawCount: rule.shops,
    deckRemaining: 85 - rule.deal * room.playerCount,
  };
}

function makeDevGame() {
  return {
    round: 1,
    phase: "building-draft",
    buildingCards: [7, 12, 18, 24, 31, 43, 51],
    keptBuildingIds: [],
    publicLots: [],
    buildingConfirmed: false,
    buildingReadyCount: 0,
    buildingKeepCount: 5,
    buildingDealCount: 7,
    shopCards: [],
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
  const edgeTolerance = 36;

  const overlapLength = (startA, endA, startB, endB) => Math.min(endA, endB) - Math.max(startA, startB);

  return lots.filter((candidate) => {
    if (candidate.id === lot.id) return false;

    const horizontalGap = Math.min(
      Math.abs(candidate.x - (lot.x + lot.w)),
      Math.abs(lot.x - (candidate.x + candidate.w)),
    );
    const verticalGap = Math.min(
      Math.abs(candidate.y - (lot.y + lot.h)),
      Math.abs(lot.y - (candidate.y + candidate.h)),
    );
    const verticalOverlap = overlapLength(lot.y, lot.y + lot.h, candidate.y, candidate.y + candidate.h);
    const horizontalOverlap = overlapLength(lot.x, lot.x + lot.w, candidate.x, candidate.x + candidate.w);
    const horizontalTouch = horizontalGap <= edgeTolerance && verticalOverlap > lot.h * 0.6;
    const verticalTouch = verticalGap <= edgeTolerance && horizontalOverlap > lot.w * 0.6;

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
    const owner = lotOwners[lot.id];

    cell.type = "button";
    cell.className = "cell";
    cell.textContent = lot.id;
    cell.dataset.id = String(lot.id);
    cell.style.setProperty("--x", `${(lot.x / MAP_WIDTH) * 100}%`);
    cell.style.setProperty("--y", `${(lot.y / MAP_HEIGHT) * 100}%`);
    cell.style.setProperty("--w", `${(lot.w / MAP_WIDTH) * 100}%`);
    cell.style.setProperty("--h", `${(lot.h / MAP_HEIGHT) * 100}%`);

    if (owner) {
      cell.classList.add(owner.className);
      cell.dataset.owner = owner.name;
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
  playerModalList.innerHTML = "";
  const activePlayers = room?.players || playerPresets.slice(0, selectedRoomSize);
  playersList.className = `player-list count-${activePlayers.length}`;
  playerCountLabel.textContent = `${activePlayers.length}人局`;
  playersButton.textContent = "玩家";
  playersTitle.textContent = `${activePlayers.length}人局玩家`;

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

    const modalEl = document.createElement("article");
    modalEl.className = playerEl.className;
    modalEl.innerHTML = `
      <span class="avatar ${player.color}"></span>
      <div>
        <strong>${player.name}</strong>
        <small>${player.stats} · 现金 50万</small>
      </div>
    `;
    playerModalList.appendChild(modalEl);
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

  selectedBuildingKeeps = new Set(currentGame?.keptBuildingIds || []);
  buildingDraftConfirmed = Boolean(currentGame?.buildingConfirmed);
  renderPlayers();
  renderHand();
  renderShops();
  roundLabel.textContent = `${currentGame.round}/6轮`;
  cashLabel.textContent = "5万元";
  selectedSummary.textContent = `候选 ${currentGame.buildingDealCount} · 保留 ${currentGame.buildingKeepCount}`;
  showScreen(gameScreen);
}

function activateTab(tabName) {
  document.querySelectorAll(".tab").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.tab === tabName);
  });
  document.querySelectorAll(".tab-panel").forEach((item) => {
    item.classList.toggle("is-active", item.id === tabName);
  });
}

function locateLot(id) {
  const target = document.querySelector(`.cell[data-id="${id}"]`);
  target?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  target?.click();
}

function updateDraftSummary() {
  if (!currentGame) return;

  if (currentGame.phase === "building-draft") {
    const readyCount = currentGame.buildingReadyCount || (buildingDraftConfirmed ? 1 : 0);
    selectedSummary.textContent = buildingDraftConfirmed
      ? `已确认地块 · 等待 ${readyCount}/${room.playerCount}`
      : `保留地块 ${selectedBuildingKeeps.size}/${currentGame.buildingKeepCount}`;
    return;
  }

  if (currentGame.phase === "building-reveal") {
    selectedSummary.textContent = "地块公示中 · 即将发放店铺";
    return;
  }

  if (currentGame.phase === "shop-draft") {
    selectedSummary.textContent = `店铺 ${currentGame.shopCards?.length || currentGame.shopTileDrawCount} 张`;
  }
}

function renderHand() {
  cardRow.innerHTML = "";
  draftAction.innerHTML = "";
  const cards = currentGame?.buildingCards || handCards;
  const keepCount = currentGame?.buildingKeepCount;
  const isDrafting = currentGame?.phase === "building-draft";
  const isAfterDraft = ["building-reveal", "shop-dealing", "shop-draft"].includes(currentGame?.phase);
  const keptIds = isAfterDraft
    ? new Set(currentGame.keptBuildingIds || [...selectedBuildingKeeps])
    : selectedBuildingKeeps;
  const visibleCards = isAfterDraft ? [...keptIds].sort((a, b) => a - b) : cards;

  visibleCards.forEach((id) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "deed-card";
    card.classList.toggle("is-kept", keptIds.has(id));
    card.disabled = buildingDraftConfirmed && isDrafting;
    card.innerHTML = `
      <small>${keptIds.has(id) ? "已保留" : "候选地块"}</small>
      <strong>${id}</strong>
      <small>${isDrafting ? "点击保留/定位" : "点击定位"}</small>
    `;
    card.addEventListener("click", () => {
      if (isDrafting && !buildingDraftConfirmed) {
        if (selectedBuildingKeeps.has(id)) {
          selectedBuildingKeeps.delete(id);
        } else if (selectedBuildingKeeps.size < keepCount) {
          selectedBuildingKeeps.add(id);
        } else {
          selectedSummary.textContent = `最多保留 ${keepCount} 张地块`;
        }
        renderHand();
        updateDraftSummary();
      }

      locateLot(id);
    });
    cardRow.appendChild(card);
  });

  if (isDrafting) {
    const action = document.createElement("button");
    action.type = "button";
    action.className = "confirm-draft";
    action.disabled = buildingDraftConfirmed || selectedBuildingKeeps.size !== keepCount;
    action.textContent = buildingDraftConfirmed ? "已确认，等待其他玩家" : `确认保留 ${selectedBuildingKeeps.size}/${keepCount}`;
    action.addEventListener("click", confirmBuildingDraft);
    draftAction.appendChild(action);
  } else if (isAfterDraft) {
    const note = document.createElement("p");
    note.className = "draft-note";
    note.textContent = currentGame?.phase === "building-reveal"
      ? "本轮地块正在公示。"
      : "未保留的地块已弃回地块堆。";
    draftAction.appendChild(note);
  }
}

function renderShops() {
  shopGrid.innerHTML = "";

  if (currentGame?.phase === "building-draft") {
    const chip = document.createElement("div");
    chip.className = "shop-chip wide";
    chip.innerHTML = `<span>本轮稍后抽取店铺</span><strong>x${currentGame.shopTileDrawCount}</strong>`;
    shopGrid.appendChild(chip);
    return;
  }

  if (currentGame?.phase === "building-reveal") {
    const chip = document.createElement("div");
    chip.className = "shop-chip wide is-dealing";
    chip.innerHTML = `<span>地块公示中</span><strong>${currentGame.publicLots?.length || 0} 块</strong>`;
    shopGrid.appendChild(chip);
    return;
  }

  if (currentGame?.phase === "shop-dealing") {
    const chip = document.createElement("div");
    chip.className = "shop-chip wide is-dealing";
    chip.innerHTML = `<span>正在发放店铺</span><strong>x${currentGame.shopTileDrawCount}</strong>`;
    shopGrid.appendChild(chip);
    return;
  }

  const shopCards = currentGame?.shopCards?.length ? currentGame.shopCards : shopCatalog;
  const groupedShops = [...shopCards.reduce((groups, shop) => {
    const group = groups.get(shop.id) || { ...shop, count: 0 };
    group.count += 1;
    groups.set(shop.id, group);
    return groups;
  }, new Map()).values()];

  groupedShops.forEach((shop, index) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "shop-chip shop-card";
    chip.classList.toggle("is-selected", selectedShopCardId === shop.id);
    chip.style.animationDelay = `${index * 80}ms`;
    chip.innerHTML = `
      <img src="${shop.image}" alt="${shop.name}" loading="lazy" />
      <strong aria-label="${shop.name} 数量 ${shop.count}">${shop.count}</strong>
    `;
    chip.addEventListener("click", () => {
      const previousSelected = shopGrid.querySelector(".shop-card.is-selected");
      selectedShopCardId = selectedShopCardId === shop.id ? null : shop.id;
      selectedSummary.textContent = selectedShopCardId ? `已选店铺：${shop.name} · ${shop.count} 张` : "未选择店铺";
      previousSelected?.classList.remove("is-selected");
      chip.classList.toggle("is-selected", selectedShopCardId === shop.id);
    });
    shopGrid.appendChild(chip);
  });
}

function makeShopCandidates(count) {
  return shopCatalog.slice(0, count).map((shop, index) => ({
    ...shop,
    cardId: `${shop.id}-local-${index + 1}`,
  }));
}

function applyPublicLotsToBoard(publicLots = []) {
  lotOwners = {};
  publicLots.forEach((item) => {
    lotOwners[item.lotId] = {
      name: item.name,
      className: ownerClassByColor[item.color] || "owner-red",
    };
  });
  renderBoard();
}

function showShopDraft({ animate = true } = {}) {
  if (!currentGame) return;

  if (animate) {
    currentGame.phase = "shop-dealing";
    selectedSummary.textContent = "正在发放店铺...";
    activateTab("shops");
    renderHand();
    renderShops();

    window.setTimeout(() => {
      currentGame.phase = "shop-draft";
      currentGame.shopCards = currentGame.shopCards?.length
        ? currentGame.shopCards
        : makeShopCandidates(currentGame.shopTileDrawCount);
      selectedShopCardId = null;
      renderPlayers();
      renderHand();
      renderShops();
      updateDraftSummary();
    }, 850);
    return;
  }

  currentGame.phase = "shop-draft";
  currentGame.shopCards = currentGame.shopCards?.length
    ? currentGame.shopCards
    : makeShopCandidates(currentGame.shopTileDrawCount);
  activateTab("shops");
  renderPlayers();
  renderHand();
  renderShops();
  updateDraftSummary();
}

function finishLocalBuildingDraft(keptIds) {
  const discarded = currentGame.buildingCards.filter((id) => !keptIds.includes(id));
  const otherLots = room.players.slice(1).flatMap((player, playerIndex) => (
    discarded.slice(playerIndex * 2, playerIndex * 2 + 2).map((lotId) => ({
      lotId,
      name: player.name,
      color: player.color,
    }))
  ));
  const selfPlayer = room.players.find((player) => player.id === currentPlayerId || player.you) || room.players[0];

  currentGame.phase = "building-reveal";
  currentGame.buildingCards = keptIds;
  currentGame.keptBuildingIds = keptIds;
  currentGame.publicLots = [
    ...keptIds.map((lotId) => ({
      lotId,
      name: selfPlayer.name,
      color: selfPlayer.color,
    })),
    ...otherLots,
  ];
  currentGame.buildingConfirmed = true;
  currentGame.buildingReadyCount = room.playerCount;
  currentGame.shopCards = makeShopCandidates(currentGame.shopTileDrawCount);

  room.players.forEach((player) => {
    player.stats = `${currentGame.buildingKeepCount} 地块 · 0 商铺`;
  });

  applyPublicLotsToBoard(currentGame.publicLots);
  renderPlayers();
  renderHand();
  renderShops();
  updateDraftSummary();
  window.setTimeout(() => showShopDraft({ animate: true }), 1500);
}

function confirmBuildingDraft() {
  const keepCount = currentGame?.buildingKeepCount || 0;
  const keptIds = [...selectedBuildingKeeps].sort((a, b) => a - b);

  if (keptIds.length !== keepCount) {
    selectedSummary.textContent = `需要保留 ${keepCount} 张地块`;
    return;
  }

  buildingDraftConfirmed = true;
  currentGame.keptBuildingIds = keptIds;
  currentGame.buildingConfirmed = true;
  renderHand();
  updateDraftSummary();

  if (socket && room?.code && currentPlayerId !== "local-host") {
    socket.emit("confirmBuildingDraft", { code: room.code, kept: keptIds }, (reply) => {
      if (!reply?.ok) {
        buildingDraftConfirmed = false;
        selectedSummary.textContent = reply?.error || "确认地块失败。";
        renderHand();
        return;
      }

      room = reply.room;
      currentGame = reply.game;
      selectedBuildingKeeps = new Set(currentGame.keptBuildingIds || keptIds);
      buildingDraftConfirmed = Boolean(currentGame.buildingConfirmed);
      if (currentGame.phase === "building-reveal") {
        applyPublicLotsToBoard(currentGame.publicLots || []);
        renderPlayers();
        renderHand();
        renderShops();
        updateDraftSummary();
        return;
      }
      if (currentGame.phase === "shop-draft") {
        applyPublicLotsToBoard(currentGame.publicLots || []);
        showShopDraft({ animate: true });
        return;
      }
      updateDraftSummary();
      renderHand();
    });
    return;
  }

  finishLocalBuildingDraft(keptIds);
}

function selectCell(id, element) {
  if (selectedCell === element) {
    clearSelection();
    return;
  }

  selectedCell?.classList.remove("is-selected");
  selectedCell = element;
  selectedCell.classList.add("is-selected");

  const owner = lotOwners[id];
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
    activateTab(tab.dataset.tab);
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

playersButton.addEventListener("click", () => {
  playersModal.setAttribute("aria-hidden", "false");
});

document.querySelector("#startTradeButton").addEventListener("click", () => {
  selectedSummary.textContent = "交易功能下一步接入：选择对象、地块、商铺和现金。";
});

document.querySelector("#closePlayers").addEventListener("click", () => {
  playersModal.setAttribute("aria-hidden", "true");
});

playersModal.addEventListener("click", (event) => {
  if (event.target === playersModal) {
    playersModal.setAttribute("aria-hidden", "true");
  }
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

  socket.on("gameState", (payload) => {
    const previousPhase = currentGame?.phase;
    room = payload.room;
    currentGame = payload.game;
    selectedBuildingKeeps = new Set(currentGame.keptBuildingIds || []);
    buildingDraftConfirmed = Boolean(currentGame.buildingConfirmed);

    if (currentGame.phase === "building-reveal") {
      applyPublicLotsToBoard(currentGame.publicLots || []);
      renderPlayers();
      renderHand();
      renderShops();
      updateDraftSummary();
      return;
    }

    if (!["shop-draft", "shop-dealing"].includes(previousPhase) && currentGame.phase === "shop-draft") {
      applyPublicLotsToBoard(currentGame.publicLots || []);
      showShopDraft({ animate: true });
      return;
    }

    renderPlayers();
    renderHand();
    renderShops();
    updateDraftSummary();
  });
}

renderBoard();
renderPlayers();
renderHand();
renderShops();
renderNetworkInfo();
resizeBoardToContain();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}

window.addEventListener("resize", resizeBoardToContain);
window.addEventListener("orientationchange", () => {
  window.setTimeout(resizeBoardToContain, 160);
});

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
