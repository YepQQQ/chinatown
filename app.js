const ownerClassByColor = {
  red: "owner-red",
  blue: "owner-blue",
  cyan: "owner-cyan",
  gold: "owner-gold",
  green: "owner-green",
  purple: "owner-purple",
};

const playerPresets = [
  { name: "你", color: "red", stats: "3 地块 · 2 商铺", cash: 5, you: true },
  { name: "阿明", color: "cyan", stats: "3 地块 · 2 商铺", cash: 5 },
  { name: "小林", color: "blue", stats: "3 地块 · 2 商铺", cash: 5 },
  { name: "阿青", color: "purple", stats: "0 地块 · 0 商铺", cash: 5 },
];

const defaultNicknames = ["阿明", "小林", "阿青", "阿豪", "小唐", "阿珍", "老陈", "阿远"];

const playerRingColors = {
  red: "rgba(224, 64, 96, 0.84)",
  blue: "rgba(47, 115, 255, 0.78)",
  cyan: "rgba(16, 201, 193, 0.72)",
  gold: "rgba(47, 115, 255, 0.78)",
  green: "rgba(88, 192, 109, 0.72)",
  purple: "rgba(164, 112, 255, 0.78)",
};

const placementPalettes = {
  red: {
    fill: "rgba(224, 64, 96, 0.22)",
    stroke: "rgba(224, 64, 96, 0.98)",
    glow: "rgba(224, 64, 96, 0.32)",
  },
  blue: {
    fill: "rgba(47, 115, 255, 0.22)",
    stroke: "rgba(87, 148, 255, 0.98)",
    glow: "rgba(47, 115, 255, 0.34)",
  },
  cyan: {
    fill: "rgba(16, 201, 193, 0.2)",
    stroke: "rgba(30, 224, 214, 0.96)",
    glow: "rgba(16, 201, 193, 0.3)",
  },
  purple: {
    fill: "rgba(164, 112, 255, 0.22)",
    stroke: "rgba(188, 150, 255, 0.98)",
    glow: "rgba(164, 112, 255, 0.32)",
  },
  gold: {
    fill: "rgba(47, 115, 255, 0.22)",
    stroke: "rgba(87, 148, 255, 0.98)",
    glow: "rgba(47, 115, 255, 0.34)",
  },
};

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
  { id: "antique", name: "古董店", mark: "古", size: 6, image: "assets/shop-icons/古董店.png" },
  { id: "photo", name: "照相馆", mark: "照", size: 3, image: "assets/shop-icons/照相馆.png" },
  { id: "factory", name: "工厂", mark: "工", size: 6, image: "assets/shop-icons/工厂.png" },
  { id: "clothing", name: "服装店", mark: "服", size: 4, image: "assets/shop-icons/服装店.png" },
  { id: "laundry", name: "洗衣店", mark: "洗", size: 5, image: "assets/shop-icons/洗衣店.png" },
  { id: "tea", name: "茶馆", mark: "茶", size: 3, image: "assets/shop-icons/茶馆.png" },
  { id: "restaurant", name: "饭店", mark: "饭", size: 6, image: "assets/shop-icons/饭店.png" },
  { id: "pawn", name: "当铺", mark: "当", size: 5, image: "assets/shop-icons/当铺.png" },
  { id: "florist", name: "花店", mark: "花", size: 4, image: "assets/shop-icons/花店.png" },
  { id: "dimsum", name: "点心店", mark: "点", size: 5, image: "assets/shop-icons/点心店.png" },
  { id: "jewelry", name: "珠宝店", mark: "宝", size: 4, image: "assets/shop-icons/珠宝店.png" },
  { id: "seafood", name: "海鲜店", mark: "鲜", size: 3, image: "assets/shop-icons/海鲜店.png" },
];

const incomeTable = {
  incomplete: { 1: 1, 2: 2, 3: 4, 4: 6, 5: 8 },
  complete: { 3: 5, 4: 8, 5: 11, 6: 14 },
};
const tradeCashLimit = 50;

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
const hintTitle = document.querySelector("#hintTitle");
const hintContent = document.querySelector("#hintContent");
const tradeModal = document.querySelector("#tradeModal");
const tradeTitle = document.querySelector("#tradeTitle");
const tradeBody = document.querySelector("#tradeBody");
const submitTrade = document.querySelector("#submitTrade");
const closeTradeButton = document.querySelector("#closeTrade");
const socket = typeof io === "function" ? io() : null;
const params = new URLSearchParams(window.location.search);
const isDevMode = params.get("dev") === "1";
const isCoordMode = params.get("coords") === "1";
const devPlayerCount = [3, 4].includes(Number(params.get("players"))) ? Number(params.get("players")) : 3;
let selectedCell = null;
let selectedRoomSize = devPlayerCount;
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
let tradeDraft = makeEmptyTradeDraft();
let activeTradeProposal = null;
let locatedCellTimer = null;

const sessionStorageKey = "neonTangbuSession";

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function makeDefaultNickname(usedNames = []) {
  const used = new Set(usedNames.filter(Boolean));
  const available = defaultNicknames.filter((name) => !used.has(name));
  return randomItem(available.length ? available : defaultNicknames);
}

if (nicknameInput.value.trim() === "你") {
  nicknameInput.value = makeDefaultNickname();
}

function saveSession() {
  if (!room?.code || !currentPlayerId || isDevMode) return;

  sessionStorage.setItem(sessionStorageKey, JSON.stringify({
    code: room.code,
    playerId: currentPlayerId,
  }));
}

function readSession() {
  try {
    return JSON.parse(sessionStorage.getItem(sessionStorageKey) || "null");
  } catch (error) {
    return null;
  }
}

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
  const hostName = nicknameInput.value.trim() || makeDefaultNickname();
  const usedNames = [hostName];
  const players = playerPresets.slice(0, playerCount).map((player, index) => ({
    ...player,
    id: index === 0 ? "local-host" : `local-player-${index}`,
    name: index === 0 ? hostName : (() => {
      const name = makeDefaultNickname(usedNames);
      usedNames.push(name);
      return name;
    })(),
    cash: player.cash ?? 5,
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

function makeEmptyTradeDraft() {
  return {
    targetId: null,
    offerLots: new Set(),
    requestLots: new Set(),
    offerShops: new Map(),
    requestShops: new Map(),
    offerCash: 0,
    requestCash: 0,
  };
}

function makeLocalShopDeck() {
  const remaining = new Map(shopCatalog.map((shop) => [shop.id, shop.size + 3]));
  const deck = [];
  let previousShopId = null;
  const total = shopCatalog.reduce((sum, shop) => sum + shop.size + 3, 0);

  while (deck.length < total) {
    const availableShops = shopCatalog.filter((shop) => (remaining.get(shop.id) || 0) > 0);
    const repeatShop = availableShops.find((shop) => shop.id === previousShopId);
    const shouldRepeat = repeatShop && Math.random() < 0.34;
    const shop = shouldRepeat ? repeatShop : randomItem(availableShops);
    const nextCount = remaining.get(shop.id) - 1;
    const copyNumber = shop.size + 3 - nextCount;
    remaining.set(shop.id, nextCount);
    deck.push({ ...shop, cardId: `${shop.id}-local-${copyNumber}` });
    previousShopId = shop.id;
  }

  return deck;
}

function drawLocalShopTiles(count) {
  currentGame.localShopDeck ||= makeLocalShopDeck();
  return currentGame.localShopDeck.splice(0, count);
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
    localShopDeck: makeLocalShopDeck(),
    playerShopHands: {},
    shopDealRounds: {},
    placedShops: {},
    incomeRows: [],
    incomeSettled: false,
    nextRoundReadyCount: 0,
    shopPlacementConfirmed: false,
    shopReadyCount: 0,
    shopTileDrawCount: rule.shops,
    deckRemaining: 85 - rule.deal * room.playerCount,
  };
}

function makeDevGame() {
  return {
    round: 1,
    phase: "building-draft",
    buildingCards: [6, 7, 8, 10, 11, 12, 13],
    keptBuildingIds: [],
    publicLots: [],
    buildingConfirmed: false,
    buildingReadyCount: 0,
    buildingKeepCount: 5,
    buildingDealCount: 7,
    shopCards: [],
    localShopDeck: makeLocalShopDeck(),
    playerShopHands: {},
    shopDealRounds: {},
    placedShops: {},
    incomeRows: [],
    incomeSettled: false,
    nextRoundReadyCount: 0,
    shopPlacementConfirmed: false,
    shopReadyCount: 0,
    shopTileDrawCount: 6,
    deckRemaining: 64,
  };
}

function formatMoney(value) {
  return `${Number(value.toFixed(1)).toLocaleString("zh-CN")}万元`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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
  const canPreviewPlacement = currentGame?.phase === "shop-draft" && selectedShopCardId;
  const selfPlayer = getSelfPlayer();
  const placementPalette = placementPalettes[selfPlayer?.color] || placementPalettes.red;
  board.style.setProperty("--placement-fill", placementPalette.fill);
  board.style.setProperty("--placement-stroke", placementPalette.stroke);
  board.style.setProperty("--placement-glow", placementPalette.glow);
  board.classList.toggle("is-placing-shop", Boolean(canPreviewPlacement));

  lots.forEach((lot) => {
    const cell = document.createElement("button");
    const owner = lotOwners[lot.id];
    const placedShop = currentGame?.placedShops?.[lot.id];

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

    if (placedShop) {
      cell.classList.add("shop-group");
      const componentIds = getShopComponentIds(lot.id);
      const anchorId = getShopGroupAnchorId(componentIds);
      const isGroupAnchor = anchorId === lot.id;
      const linkedDirections = getShopNeighborLinks(lot.id);
      cell.classList.toggle("shop-group-anchor", isGroupAnchor);
      cell.classList.toggle("shop-chain", componentIds.length > 1);
      linkedDirections.forEach((direction) => {
        cell.classList.add(`shop-linked-${direction}`);
      });
      if (isGroupAnchor) {
        cell.classList.add("has-shop");
        const label = document.createElement("span");
        label.className = "shop-label";
        const shopMark = placedShop.mark || placedShop.name.slice(0, 1);
        label.innerHTML = componentIds.length > 1
          ? `<span>${shopMark}</span><b>${componentIds.length}/${placedShop.size}</b>`
          : `<span>${shopMark}</span>`;
        cell.appendChild(label);
      }
      linkedDirections.forEach((direction) => {
        const bridge = document.createElement("span");
        bridge.className = `shop-bridge ${direction}`;
        bridge.setAttribute("aria-hidden", "true");
        cell.appendChild(bridge);
      });
    }

    if (canPreviewPlacement) {
      const placement = canPlaceShopOnLot(lot.id);
      if (placement.ok) {
        cell.classList.add("can-place-shop");
      } else if (owner && !ownsLot(selfPlayer, owner)) {
        cell.classList.add("placement-muted");
      } else if (owner?.shop) {
        cell.classList.add("placement-blocked");
      }
    }

    cell.addEventListener("click", () => selectCell(lot.id, cell));
    board.appendChild(cell);
  });
}

function getShopGroupAnchorId(componentIds) {
  if (!componentIds.length) return null;

  const componentLots = componentIds.map((id) => lotsById.get(id)).filter(Boolean);
  const center = componentLots.reduce((sum, lot) => ({
    x: sum.x + lot.cx / componentLots.length,
    y: sum.y + lot.cy / componentLots.length,
  }), { x: 0, y: 0 });

  return componentLots.reduce((bestLot, lot) => {
    const bestDistance = Math.hypot(bestLot.cx - center.x, bestLot.cy - center.y);
    const distance = Math.hypot(lot.cx - center.x, lot.cy - center.y);
    return distance < bestDistance ? lot : bestLot;
  }, componentLots[0]).id;
}

function getShopComponentIds(lotId) {
  const placedShop = currentGame?.placedShops?.[lotId];
  if (!placedShop) return [];

  const visited = new Set();
  const queue = [Number(lotId)];

  while (queue.length) {
    const nextId = queue.shift();
    if (visited.has(nextId)) continue;
    const nextShop = currentGame.placedShops?.[nextId];
    if (!nextShop || nextShop.id !== placedShop.id || nextShop.ownerId !== placedShop.ownerId) continue;

    visited.add(nextId);
    const lot = lotsById.get(nextId);
    if (!lot) continue;
    getNeighbors(lot).forEach((neighbor) => {
      if (!visited.has(neighbor.id)) {
        queue.push(neighbor.id);
      }
    });
  }

  return [...visited];
}

function getShopNeighborLinks(lotId) {
  const placedShop = currentGame?.placedShops?.[lotId];
  const lot = lotsById.get(Number(lotId));
  if (!placedShop || !lot) return [];

  return getNeighbors(lot).flatMap((neighbor) => {
    const neighborShop = currentGame.placedShops?.[neighbor.id];
    if (!neighborShop || neighborShop.id !== placedShop.id || neighborShop.ownerId !== placedShop.ownerId) {
      return [];
    }

    if (neighbor.cx > lot.cx && Math.abs(neighbor.cy - lot.cy) < lot.h * 0.5) return ["right"];
    if (neighbor.cx < lot.cx && Math.abs(neighbor.cy - lot.cy) < lot.h * 0.5) return ["left"];
    if (neighbor.cy > lot.cy && Math.abs(neighbor.cx - lot.cx) < lot.w * 0.5) return ["down"];
    if (neighbor.cy < lot.cy && Math.abs(neighbor.cx - lot.cx) < lot.w * 0.5) return ["up"];
    return [];
  });
}

function getPlayerStatsText(player) {
  if (!currentGame) return player.stats;

  const publicLots = currentGame.publicLots || [];
  const placedShops = Object.values(currentGame.placedShops || {});
  const lotCount = publicLots.filter((item) => item.playerId === player.id).length;
  const shopCount = placedShops.filter((shop) => shop.ownerId === player.id).length;
  return `${lotCount} 地块 · ${shopCount} 商铺`;
}

function getPlayerCash(player) {
  const self = getSelfPlayer();
  if (player && self && player.id === self.id && Number.isFinite(Number(currentGame?.cash))) {
    return Number(currentGame.cash);
  }

  return player?.cash ?? 5;
}

function getPlayerLotIds(player) {
  if (!currentGame) return [];

  return (currentGame.publicLots || [])
    .filter((item) => item.playerId === player.id)
    .map((item) => item.lotId)
    .sort((a, b) => a - b);
}

function getSelfOwnedLotIds() {
  if (!currentGame) return [];

  if (Array.isArray(currentGame.ownLotIds)) {
    return [...currentGame.ownLotIds].sort((a, b) => a - b);
  }

  const self = getSelfPlayer();
  return getPlayerLotIds(self);
}

function getPlayerHandShops(player) {
  if (!currentGame) return null;

  const self = getSelfPlayer();
  if (player.id === self?.id || player.you) {
    return currentGame.shopCards?.length ? currentGame.shopCards : (currentGame.playerShopHands?.[player.id] || null);
  }

  if (currentGame.publicShopHands?.[player.id]) {
    return currentGame.publicShopHands[player.id];
  }

  return currentGame.playerShopHands?.[player.id] || null;
}

function hasShopPhaseStarted() {
  return ["shop-draft", "income", "final"].includes(currentGame?.phase);
}

function renderMiniTokens(values, emptyText) {
  if (!values.length) {
    return `<span class="mini-empty">${escapeHtml(emptyText)}</span>`;
  }

  return values.map((value) => `<span class="mini-token">${escapeHtml(value)}</span>`).join("");
}

function renderPlayerShopTokens(player) {
  const shops = getPlayerHandShops(player);
  if (shops === null) {
    const hiddenCount = currentGame?.playerShopCounts?.[player.id] || 0;
    if (hiddenCount > 0) {
      return `<span class="mini-empty">店铺 ${hiddenCount} 张（保密）</span>`;
    }

    if (hasShopPhaseStarted()) {
      return `<span class="mini-empty">手上暂无店铺</span>`;
    }

    return `<span class="mini-empty">店铺尚未发放</span>`;
  }

  const grouped = groupShopCards(shops);
  if (!grouped.length) {
    return `<span class="mini-empty">手上暂无店铺</span>`;
  }

  return grouped.map((shop) => `
    <span class="player-shop-token">
      <img src="${escapeHtml(shop.image)}" alt="${escapeHtml(shop.name)}" loading="lazy" />
      <b>${shop.count}</b>
    </span>
  `).join("");
}

function getPublicPlayerShopCards(player) {
  if (!player) return [];

  const self = getSelfPlayer();
  if (player.id === self?.id || player.you) {
    return currentGame?.shopCards || [];
  }

  return currentGame?.publicShopHands?.[player.id] || currentGame?.playerShopHands?.[player.id] || [];
}

function getPlayerMapShopSummaries(player) {
  if (!currentGame || !player) return [];

  const rows = calculateIncomeRows()
    .filter((row) => row.playerId === player.id)
    .sort((a, b) => (
      a.maxSize - b.maxSize
      || a.shopName.localeCompare(b.shopName, "zh-Hans-CN")
      || a.lotIds[0] - b.lotIds[0]
    ));

  return rows.map((row) => `${row.shopName}${row.size}/${row.maxSize}`);
}

function renderPlayerMapShops(player) {
  const shops = getPlayerMapShopSummaries(player);
  if (!shops.length) {
    return `<span class="mini-empty">地图暂无店铺</span>`;
  }

  return shops.map((text) => `<span class="map-shop-token">${escapeHtml(text)}</span>`).join("");
}

function renderIncomeHint() {
  hintTitle.textContent = "收入表";
  hintContent.innerHTML = `
    <table class="income-hint-table">
      <thead>
        <tr>
          <th>规模</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>6</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>未完成</th>
          <td>1万</td>
          <td>2万</td>
          <td>4万</td>
          <td>6万</td>
          <td>8万</td>
          <td>-</td>
        </tr>
        <tr>
          <th>完成</th>
          <td>-</td>
          <td>-</td>
          <td>5万</td>
          <td>8万</td>
          <td>11万</td>
          <td>14万</td>
        </tr>
      </tbody>
    </table>
    <p class="hint-note">完成表示同类店铺连接数量达到店铺图标上的最大规模。</p>
  `;
}

function openHintModal() {
  hintModal.setAttribute("aria-hidden", "false");
}

function closeHintModal() {
  hintModal.setAttribute("aria-hidden", "true");
}

function renderRoundAdvanceConfirm() {
  const remaining = currentGame?.shopCards?.length || 0;
  hintTitle.textContent = "进入下一轮？";
  hintContent.innerHTML = `
    <p>确认后，本轮会先进行收入结算，然后再进入下一轮。</p>
    <p class="hint-note">${remaining ? `你还有 ${remaining} 张未放置店铺，会继续保留在手中。` : "你本轮手上没有未放置店铺。"}</p>
    <div class="modal-actions">
      <button class="modal-secondary" data-modal-close type="button">继续放置</button>
      <button class="modal-primary" data-confirm-next-round type="button">确认进入下一轮</button>
    </div>
  `;
  openHintModal();
}

function renderIncomeSettlementModal() {
  const self = getSelfPlayer();
  const rows = (currentGame?.incomeRows || []).filter((row) => row.playerId === self?.id);
  const total = getIncomeTotalForPlayer(self?.id);
  const rowHtml = rows.length
    ? rows.map((row) => {
      const splitLabel = row.partCount > 1 ? ` · 第${row.partIndex}组` : "";
      return `
        <article class="modal-income-row">
          <div>
            <strong>${escapeHtml(row.shopName)}</strong>
            <small>${row.complete ? "完成" : "未完成"} · ${row.size}/${row.maxSize}${splitLabel} · 地块 ${row.lotIds.join("、")}</small>
          </div>
          <b>+${formatMoney(row.income)}</b>
        </article>
      `;
    }).join("")
    : `<p class="hint-note">你本轮还没有可结算的店铺。</p>`;

  hintTitle.textContent = "本回合收入结算";
  hintContent.innerHTML = `
    <div class="modal-income-total">
      <span>本轮收入</span>
      <strong>+${formatMoney(total)}</strong>
    </div>
    <div class="modal-income-list">${rowHtml}</div>
    <div class="modal-actions">
      <button class="modal-primary" data-income-next type="button">${currentGame.round >= 6 ? "查看最终排名" : "进入下一轮"}</button>
    </div>
  `;
  openHintModal();
}

function renderPlayers() {
  playersList.innerHTML = "";
  playerModalList.innerHTML = "";
  const activePlayers = room?.players || playerPresets.slice(0, selectedRoomSize);
  playersList.className = `player-list count-${activePlayers.length}`;
  playerModalList.className = `player-modal-list count-${activePlayers.length}`;
  playerCountLabel.textContent = `${activePlayers.length}人局`;
  playersButton.textContent = "玩家";
  playersTitle.textContent = `${activePlayers.length}人局玩家`;

  activePlayers.forEach((player) => {
    const isSelf = player.you || player.id === currentPlayerId;
    const lotIds = getPlayerLotIds(player);
    const cashText = isSelf ? `我的现金：${formatMoney(getPlayerCash(player))}` : "现金：保密";
    const playerEl = document.createElement("article");
    playerEl.className = isSelf ? "player is-you" : "player";
    playerEl.innerHTML = `
        <span class="avatar ${player.color}"></span>
      <div>
        <strong>${escapeHtml(player.name)}</strong>
        <small>${getPlayerStatsText(player)}</small>
      </div>
    `;
    playersList.appendChild(playerEl);

    const modalEl = document.createElement("article");
    modalEl.className = isSelf ? "player-detail is-you" : "player-detail";
    modalEl.innerHTML = `
      <header>
        <span class="avatar ${player.color}"></span>
        <div>
          <strong>${escapeHtml(player.name)}</strong>
          <small>${cashText}</small>
        </div>
      </header>
      <section>
        <h3>地块</h3>
        <div class="mini-token-list">${renderMiniTokens(lotIds, "暂无地块")}</div>
      </section>
      <section>
        <h3>地图店铺</h3>
        <div class="mini-token-list map-shop-list">${renderPlayerMapShops(player)}</div>
      </section>
      <section>
        <h3>手上店铺</h3>
        <div class="player-shop-list">${renderPlayerShopTokens(player)}</div>
      </section>
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
  const starterIndex = Math.max(0, room.players.findIndex((player) => player.id === starter?.id));
  const angleStep = 360 / room.players.length;
  const ringStops = room.players.map((player, index) => {
    const start = index * angleStep;
    const end = start + angleStep;
    const gapStart = Math.max(start, end - 1.8);
    return `${playerRingColors[player.color] || "rgba(214, 167, 58, 0.74)"} ${start}deg ${gapStart}deg, rgba(245, 211, 129, 0.92) ${gapStart}deg ${end}deg`;
  }).join(", ");

  starterWheel.style.setProperty("--starter-angle", `${starterIndex * angleStep + angleStep / 2}deg`);
  starterWheel.style.setProperty("--ring-bg", `conic-gradient(${ringStops})`);
  starterWheel.innerHTML = `
    <div class="starter-player-ring" aria-hidden="true"></div>
    <div class="starter-wheel-core" aria-hidden="true"></div>
    ${room.players.map((player, index) => `
      <span class="starter-name ${player.color}" style="--label-angle: ${index * angleStep + angleStep / 2}deg">
        ${player.name}
      </span>
    `).join("")}
  `;
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
  cashLabel.textContent = formatMoney(getPlayerCash(getSelfPlayer()));
  selectedSummary.textContent = `候选 ${currentGame.buildingDealCount} · 保留 ${currentGame.buildingKeepCount}`;
  showScreen(gameScreen);
}

function getRoundRules(playerCount, round) {
  const rules = {
    3: {
      buildings: round === 1 ? { deal: 7, keep: 5 } : { deal: 6, keep: 4 },
      shops: round === 1 ? 6 : 4,
    },
    4: {
      buildings: round === 1 ? { deal: 6, keep: 4 } : { deal: 5, keep: 3 },
      shops: round === 1 ? 4 : 3,
    },
  };

  return rules[playerCount];
}

function makeBuildingCandidates(count) {
  const ownedLots = new Set((currentGame.publicLots || []).map((item) => item.lotId));
  return Array.from({ length: 85 }, (_, index) => index + 1)
    .filter((id) => !ownedLots.has(id))
    .slice(0, count);
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
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  highlightLocatedLot(target);
  selectCell(Number(id), target, { fromLocate: true });
}

function highlightLocatedLot(target) {
  document.querySelector(".cell.is-located")?.classList.remove("is-located");
  window.clearTimeout(locatedCellTimer);
  target.classList.add("is-located");
  locatedCellTimer = window.setTimeout(() => {
    target.classList.remove("is-located");
  }, 1800);
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
    const shopCount = Array.isArray(currentGame.shopCards)
      ? currentGame.shopCards.length
      : currentGame.shopTileDrawCount;
    selectedSummary.textContent = currentGame.shopPlacementConfirmed
      ? `已确认店铺 · 等待 ${currentGame.shopReadyCount || 1}/${room.playerCount}`
      : selectedShopCardId
      ? "选择自己的空地块放置店铺"
      : `店铺 ${shopCount} 张 · 先选店铺`;
    return;
  }

  if (currentGame.phase === "income") {
    const selfIncome = getIncomeTotalForPlayer(getSelfPlayer()?.id);
    selectedSummary.textContent = `收入结算 · 本轮 +${formatMoney(selfIncome)}`;
    return;
  }

  if (currentGame.phase === "final") {
    selectedSummary.textContent = "游戏结束 · 查看最终现金";
  }
}

function renderHand() {
  cardRow.innerHTML = "";
  draftAction.innerHTML = "";
  const cards = currentGame?.buildingCards || handCards;
  const keepCount = currentGame?.buildingKeepCount;
  const isDrafting = currentGame?.phase === "building-draft";
  const isAfterDraft = ["building-reveal", "shop-dealing", "shop-draft", "income", "final"].includes(currentGame?.phase);
  const keptIds = isAfterDraft
    ? new Set(currentGame.keptBuildingIds || [...selectedBuildingKeeps])
    : selectedBuildingKeeps;
  const visibleCards = isAfterDraft
    ? getSelfOwnedLotIds()
    : buildingDraftConfirmed ? [...keptIds].sort((a, b) => a - b) : cards;

  visibleCards.forEach((id) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "deed-card";
    card.classList.toggle("is-kept", keptIds.has(id));
    card.disabled = buildingDraftConfirmed && isDrafting;
    card.innerHTML = `
      <small>${isAfterDraft || keptIds.has(id) ? "已保留" : "候选地块"}</small>
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
  const heldShopCards = currentGame?.shopCards || [];

  if (currentGame?.phase === "building-draft") {
    const chip = document.createElement("div");
    chip.className = "shop-chip wide";
    chip.innerHTML = heldShopCards.length
      ? `<span>手上保留 ${heldShopCards.length} 张 · 本轮稍后再抽</span><strong>x${currentGame.shopTileDrawCount}</strong>`
      : `<span>本轮稍后抽取店铺</span><strong>x${currentGame.shopTileDrawCount}</strong>`;
    shopGrid.appendChild(chip);
    if (!heldShopCards.length) return;
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

  if (currentGame?.phase === "income") {
    renderIncomePanel();
    return;
  }

  if (currentGame?.phase === "final") {
    renderFinalPanel();
    return;
  }

  const shopCards = currentGame ? heldShopCards : shopCatalog;
  if (!shopCards.length) {
    const chip = document.createElement("div");
    chip.className = "shop-chip wide";
    chip.innerHTML = "<span>本轮店铺已放置完</span><strong>完成</strong>";
    shopGrid.appendChild(chip);
    renderShopPlacementAction();
    return;
  }

  const groupedShops = groupShopCards(shopCards);

  groupedShops.forEach((shop, index) => {
    const canSelectShop = currentGame?.phase === "shop-draft";
    const chip = document.createElement("button");
    chip.type = "button";
    chip.disabled = !canSelectShop;
    chip.className = "shop-chip shop-card";
    chip.classList.toggle("is-selected", canSelectShop && selectedShopCardId === shop.id);
    chip.style.animationDelay = `${index * 80}ms`;
    chip.innerHTML = `
      <img src="${shop.image}" alt="${shop.name}" loading="lazy" />
      <strong aria-label="${shop.name} 数量 ${shop.count}">${shop.count}</strong>
    `;
    if (canSelectShop) chip.addEventListener("click", () => {
      const previousSelected = shopGrid.querySelector(".shop-card.is-selected");
      selectedShopCardId = selectedShopCardId === shop.id ? null : shop.id;
      selectedSummary.textContent = selectedShopCardId
        ? `已选 ${shop.name} · 点击自己的空地块放置`
        : "未选择店铺";
      previousSelected?.classList.remove("is-selected");
      chip.classList.toggle("is-selected", selectedShopCardId === shop.id);
      renderBoard();
    });
    shopGrid.appendChild(chip);
  });

  renderShopPlacementAction();
}

function renderShopPlacementAction() {
  if (currentGame?.phase !== "shop-draft") return;

  const action = document.createElement("button");
  const remaining = currentGame.shopCards?.length || 0;
  action.type = "button";
  action.className = "confirm-draft shop-confirm";
  action.disabled = Boolean(currentGame.shopPlacementConfirmed);
  action.textContent = currentGame.shopPlacementConfirmed
    ? `已确认 · 等待 ${currentGame.shopReadyCount || 1}/${room.playerCount}`
    : remaining ? `进入下一轮 · 保留 ${remaining} 张` : "进入下一轮";
  action.addEventListener("click", confirmShopPlacement);
  shopGrid.appendChild(action);
}

function makeShopCandidates(count, offset = 0) {
  return drawLocalShopTiles(count).map((shop, index) => ({
    ...shop,
    cardId: shop.cardId || `${shop.id}-local-${offset}-${index + 1}`,
  }));
}

function dealLocalShopTilesForRound() {
  if (!currentGame || !room) return;

  currentGame.playerShopHands ||= {};
  currentGame.shopDealRounds ||= {};
  if (currentGame.shopDealRounds[currentGame.round]) {
    const self = getSelfPlayer();
    if (self) {
      currentGame.shopCards = [...(currentGame.playerShopHands[self.id] || [])];
    }
    return;
  }

  room.players.forEach((player, index) => {
    const existing = currentGame.playerShopHands[player.id] || [];
    const newTiles = makeShopCandidates(currentGame.shopTileDrawCount, currentGame.round * 100 + index * 10);
    currentGame.playerShopHands[player.id] = [...existing, ...newTiles];
  });
  currentGame.shopDealRounds[currentGame.round] = true;

  const self = getSelfPlayer();
  if (self) {
    currentGame.shopCards = [...(currentGame.playerShopHands[self.id] || [])];
  }
}

function syncSelfShopHand() {
  if (!currentGame) return;

  const self = getSelfPlayer();
  if (self) {
    currentGame.playerShopHands ||= {};
    currentGame.playerShopHands[self.id] = [...(currentGame.shopCards || [])];
  }
}

function applyPublicLotsToBoard(publicLots = []) {
  lotOwners = {};
  const placedShops = currentGame?.placedShops || {};
  publicLots.forEach((item) => {
    const placedShop = placedShops[item.lotId];
    lotOwners[item.lotId] = {
      name: item.name,
      playerId: item.playerId,
      className: ownerClassByColor[item.color] || "owner-red",
      shop: placedShop?.name,
      shopId: placedShop?.id,
      shopMark: placedShop?.mark,
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
      dealLocalShopTilesForRound();
      selectedShopCardId = null;
      renderPlayers();
      renderHand();
      renderShops();
      updateDraftSummary();
    }, 850);
    return;
  }

  currentGame.phase = "shop-draft";
  dealLocalShopTilesForRound();
  activateTab("shops");
  renderPlayers();
  renderHand();
  renderShops();
  updateDraftSummary();
}

function finishLocalBuildingDraft(keptIds) {
  const previousLots = currentGame.publicLots || [];
  const discarded = currentGame.buildingCards.filter((id) => !keptIds.includes(id));
  const otherLots = room.players.slice(1).flatMap((player, playerIndex) => (
    discarded.slice(playerIndex * 2, playerIndex * 2 + 2).map((lotId) => ({
      lotId,
      playerId: player.id,
      name: player.name,
      color: player.color,
    }))
  ));
  const selfPlayer = room.players.find((player) => player.id === currentPlayerId || player.you) || room.players[0];

  currentGame.phase = "building-reveal";
  currentGame.buildingCards = keptIds;
  currentGame.keptBuildingIds = keptIds;
  currentGame.publicLots = [
    ...previousLots,
    ...keptIds.map((lotId) => ({
      lotId,
      playerId: selfPlayer.id,
      name: selfPlayer.name,
      color: selfPlayer.color,
    })),
    ...otherLots,
  ];
  currentGame.buildingConfirmed = true;
  currentGame.buildingReadyCount = room.playerCount;

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

function getSelfPlayer() {
  const players = room?.players || [];
  const exact = players.find((player) => player.id === currentPlayerId);
  if (exact) return exact;

  if (socket?.id) {
    const socketPlayer = players.find((player) => player.id === socket.id);
    if (socketPlayer) {
      currentPlayerId = socket.id;
      return socketPlayer;
    }
  }

  return players.find((player) => player.you) || players[0];
}

function getTradeTargets() {
  const self = getSelfPlayer();
  return (room?.players || []).filter((player) => player.id !== self?.id && !player.you);
}

function groupShopCards(cards = []) {
  return [...cards.reduce((groups, shop) => {
    const group = groups.get(shop.id) || { ...shop, count: 0 };
    group.count += 1;
    groups.set(shop.id, group);
    return groups;
  }, new Map()).values()].sort((a, b) => (
    (a.size || 0) - (b.size || 0)
    || shopCatalog.findIndex((shop) => shop.id === a.id) - shopCatalog.findIndex((shop) => shop.id === b.id)
    || a.name.localeCompare(b.name, "zh-Hans-CN")
  ));
}

function toggleTradeSet(setName, value) {
  const targetSet = tradeDraft[setName];
  if (targetSet.has(value)) {
    targetSet.delete(value);
  } else {
    targetSet.add(value);
  }
  return targetSet.has(value);
}

function renderTradeChips(items, setName, labeler) {
  if (!items.length) return `<p class="trade-empty">暂无可选项</p>`;

  return items.map((item) => {
    const value = String(item.value);
    const selected = tradeDraft[setName].has(value) ? " is-selected" : "";
    return `<button class="trade-chip${selected}" data-set="${setName}" data-value="${value}" type="button">${labeler(item)}</button>`;
  }).join("");
}

function getPlayerCashLimit(player = getSelfPlayer()) {
  return tradeCashLimit;
}

function renderCashSlider(name, label, max) {
  const value = Math.min(max, tradeDraft[name]);
  tradeDraft[name] = value;
  return `
    <label class="trade-cash">
      <span>${label}<b data-cash-value="${name}">${value}万</b></span>
      <input data-cash="${name}" max="${max}" min="0" step="1" type="range" value="${value}" />
    </label>
  `;
}

function renderTradeShopStacks(items, mapName) {
  if (!items.length) return `<p class="trade-empty">暂无可选项</p>`;

  return items.map((shop) => {
    const qty = tradeDraft[mapName].get(shop.id) || 0;
    const selected = qty > 0 ? " is-selected" : "";
    return `
      <article class="trade-shop${selected}">
        <button data-shop-step="1" data-map="${mapName}" data-shop-id="${shop.id}" data-max="${shop.count}" type="button">
          <img src="${shop.image}" alt="${shop.name}" loading="lazy" />
          <strong>x${shop.count}</strong>
          <em data-shop-picked>${qty ? `x${qty}` : ""}</em>
        </button>
        <div class="trade-stepper">
          <button data-shop-step="-1" data-map="${mapName}" data-shop-id="${shop.id}" data-max="${shop.count}" type="button">-</button>
          <b data-shop-count>${qty}</b>
          <button data-shop-step="1" data-map="${mapName}" data-shop-id="${shop.id}" data-max="${shop.count}" type="button">+</button>
        </div>
      </article>
    `;
  }).join("");
}

function adjustTradeShop(mapName, shopId, step, max, element) {
  const targetMap = tradeDraft[mapName];
  const next = Math.max(0, Math.min(max, (targetMap.get(shopId) || 0) + step));

  if (next) {
    targetMap.set(shopId, next);
  } else {
    targetMap.delete(shopId);
  }

  const shopEl = element?.closest(".trade-shop");
  if (!shopEl) return;
  shopEl.classList.toggle("is-selected", next > 0);
  const countEl = shopEl.querySelector("[data-shop-count]");
  const pickedEl = shopEl.querySelector("[data-shop-picked]");
  if (countEl) countEl.textContent = String(next);
  if (pickedEl) pickedEl.textContent = next ? `x${next}` : "";
}

function clampTradeShopMap(shopMap, availableShops) {
  const availableCounts = new Map(availableShops.map((shop) => [shop.id, shop.count]));
  [...shopMap.entries()].forEach(([shopId, count]) => {
    const max = availableCounts.get(shopId) || 0;
    const next = Math.min(count, max);
    if (next > 0) {
      shopMap.set(shopId, next);
    } else {
      shopMap.delete(shopId);
    }
  });
}

function clampTradeLotSet(lotSet, availableLots) {
  const availableIds = new Set(availableLots.map((item) => String(item.value)));
  [...lotSet].forEach((lotId) => {
    if (!availableIds.has(String(lotId))) {
      lotSet.delete(lotId);
    }
  });
}

function renderTradeModal() {
  const targets = getTradeTargets();
  const target = targets.find((player) => player.id === tradeDraft.targetId) || targets[0];
  tradeDraft.targetId = target?.id || null;

  const selfCashLimit = getPlayerCashLimit(getSelfPlayer());
  const targetCashLimit = getPlayerCashLimit(target);
  const selfLots = getSelfOwnedLotIds().map((id) => ({ value: id, text: `${id}` }));
  const targetLots = (currentGame?.publicLots || [])
    .filter((item) => item.playerId === target?.id)
    .map((item) => ({ value: item.lotId, text: `${item.lotId}` }));
  const ownShops = groupShopCards(currentGame?.shopCards || []);
  const requestShops = groupShopCards(getPublicPlayerShopCards(target));
  clampTradeLotSet(tradeDraft.offerLots, selfLots);
  clampTradeLotSet(tradeDraft.requestLots, targetLots);
  clampTradeShopMap(tradeDraft.offerShops, ownShops);
  clampTradeShopMap(tradeDraft.requestShops, requestShops);

  tradeBody.innerHTML = `
    <div class="trade-targets">
      ${targets.map((player) => `
        <button class="${player.id === tradeDraft.targetId ? "is-selected" : ""}" data-target="${player.id}" type="button">
          <span class="avatar ${player.color}"></span>${player.name}
        </button>
      `).join("") || "<p class=\"trade-empty\">暂无其他玩家</p>"}
    </div>

    <div class="trade-columns">
      <section>
        <h3>我给出</h3>
        ${renderCashSlider("offerCash", "现金", selfCashLimit)}
        <h4>地块</h4>
        <div class="trade-chip-grid">${renderTradeChips(selfLots, "offerLots", (item) => item.text)}</div>
        <h4>店铺</h4>
        <div class="trade-shop-grid">${renderTradeShopStacks(ownShops, "offerShops")}</div>
      </section>
      <section>
        <h3>我想要</h3>
        ${renderCashSlider("requestCash", "现金", targetCashLimit)}
        <h4>${target?.name || "对方"}的地块</h4>
        <div class="trade-chip-grid">${renderTradeChips(targetLots, "requestLots", (item) => item.text)}</div>
        <h4>${target?.name || "对方"}的店铺</h4>
        <div class="trade-shop-grid">${renderTradeShopStacks(requestShops, "requestShops")}</div>
      </section>
    </div>
  `;
}

function showTradeError(message) {
  let errorEl = tradeBody.querySelector("[data-trade-error]");
  if (!errorEl) {
    errorEl = document.createElement("p");
    errorEl.className = "trade-error";
    errorEl.dataset.tradeError = "true";
    tradeBody.prepend(errorEl);
  }
  errorEl.textContent = message;
}

function openTradeModal() {
  resetTradeModalMode();
  tradeDraft = makeEmptyTradeDraft();
  tradeDraft.targetId = getTradeTargets()[0]?.id || null;
  renderTradeModal();
  tradeModal.setAttribute("aria-hidden", "false");
}

function summarizeTradeDraft() {
  const target = getTradeTargets().find((player) => player.id === tradeDraft.targetId);
  const bits = [];
  const shopName = (shopId) => shopCatalog.find((shop) => shop.id === shopId)?.name || shopId;
  const shopSummary = (shopMap) => [...shopMap.entries()]
    .filter(([, count]) => count > 0)
    .map(([shopId, count]) => `${shopName(shopId)}x${count}`)
    .join("、");
  const offerShopText = shopSummary(tradeDraft.offerShops);
  const requestShopText = shopSummary(tradeDraft.requestShops);

  if (tradeDraft.offerLots.size) bits.push(`给地块 ${[...tradeDraft.offerLots].join("、")}`);
  if (offerShopText) bits.push(`给店铺 ${offerShopText}`);
  if (tradeDraft.offerCash) bits.push(`给现金 ${tradeDraft.offerCash}万`);
  if (tradeDraft.requestLots.size) bits.push(`要地块 ${[...tradeDraft.requestLots].join("、")}`);
  if (requestShopText) bits.push(`要店铺 ${requestShopText}`);
  if (tradeDraft.requestCash) bits.push(`要现金 ${tradeDraft.requestCash}万`);

  selectedSummary.textContent = bits.length
    ? `向${target?.name || "玩家"}提议：${bits.join("；")}`
    : "交易提议为空";
  tradeModal.setAttribute("aria-hidden", "true");
}

function tradeShopSummary(shops = {}) {
  return Object.entries(shops)
    .filter(([, count]) => Number(count) > 0)
    .map(([shopId, count]) => {
      const shop = shopCatalog.find((item) => item.id === shopId);
      return `${shop?.name || shopId}x${count}`;
    })
    .join("、");
}

function tradeSideSummary(side = {}) {
  const bits = [];
  if (side.lots?.length) bits.push(`地块 ${side.lots.join("、")}`);
  const shops = tradeShopSummary(side.shops);
  if (shops) bits.push(`店铺 ${shops}`);
  if (side.cash) bits.push(`现金 ${side.cash}万`);
  return bits.join("；") || "无";
}

function serializeTradeDraft() {
  return {
    offer: {
      lots: [...tradeDraft.offerLots].map(Number),
      shops: Object.fromEntries(tradeDraft.offerShops),
      cash: tradeDraft.offerCash,
    },
    request: {
      lots: [...tradeDraft.requestLots].map(Number),
      shops: Object.fromEntries(tradeDraft.requestShops),
      cash: tradeDraft.requestCash,
    },
  };
}

function isTradePayloadEmpty(trade) {
  return !(
    trade.offer.lots.length
    || Object.keys(trade.offer.shops).length
    || trade.offer.cash
    || trade.request.lots.length
    || Object.keys(trade.request.shops).length
    || trade.request.cash
  );
}

function resetTradeModalMode() {
  activeTradeProposal = null;
  tradeTitle.textContent = "发起交易";
  submitTrade.textContent = "发送交易提议";
  closeTradeButton.textContent = "关闭";
  submitTrade.dataset.mode = "create";
  submitTrade.disabled = false;
  submitTrade.hidden = false;
}

function closeTradeModal() {
  tradeModal.setAttribute("aria-hidden", "true");
  resetTradeModalMode();
}

function createTradeProposal() {
  const target = getTradeTargets().find((player) => player.id === tradeDraft.targetId);
  const trade = serializeTradeDraft();

  if (!target) {
    selectedSummary.textContent = "请选择交易对象。";
    showTradeError("请选择交易对象。");
    return;
  }

  if (isTradePayloadEmpty(trade)) {
    selectedSummary.textContent = "交易提议为空。";
    showTradeError("交易提议为空。");
    return;
  }

  if (!socket || isDevMode || !room?.code) {
    selectedSummary.textContent = "真实交易需要在多人房间里测试。";
    showTradeError("真实交易需要在多人房间里测试。");
    return;
  }

  submitTrade.disabled = true;
  socket.emit("createTradeProposal", { code: room.code, targetId: target.id, trade }, (reply) => {
    submitTrade.disabled = false;

    if (!reply?.ok) {
      if (reply?.game) {
        applyServerGameState(reply.room, reply.game);
        renderPlayers();
        renderHand();
        renderShops();
        renderTradeModal();
      }
      selectedSummary.textContent = reply?.error || "交易提议发送失败。";
      showTradeError(reply?.error || "交易提议发送失败。");
      return;
    }

    selectedSummary.textContent = `已向${target.name}发送交易提议，等待对方确认。`;
    closeTradeModal();
  });
}

function renderIncomingTrade(proposal) {
  activeTradeProposal = proposal;
  tradeTitle.textContent = "收到交易提议";
  closeTradeButton.textContent = "拒绝";
  submitTrade.dataset.mode = "accept";
  submitTrade.disabled = false;
  submitTrade.hidden = true;
  tradeBody.innerHTML = `
    <div class="trade-review">
      <p class="trade-review-from">${escapeHtml(proposal.fromName)} 想和你交易</p>
      <section>
        <h3>你将获得</h3>
        <p>${escapeHtml(tradeSideSummary(proposal.offer))}</p>
      </section>
      <section>
        <h3>你要给出</h3>
        <p>${escapeHtml(tradeSideSummary(proposal.request))}</p>
      </section>
      <div class="trade-response-actions">
        <button class="trade-reject" data-trade-response="reject" type="button">拒绝</button>
        <button class="trade-accept" data-trade-response="accept" type="button">接受</button>
      </div>
    </div>
  `;
  tradeModal.setAttribute("aria-hidden", "false");
  selectedSummary.textContent = `收到${proposal.fromName}的交易提议。`;
}

function respondTradeProposal(accepted) {
  if (!activeTradeProposal || !socket || !room?.code) return;

  submitTrade.disabled = true;
  socket.emit("respondTradeProposal", {
    code: room.code,
    tradeId: activeTradeProposal.id,
    accepted,
  }, (reply) => {
    submitTrade.disabled = false;

    if (!reply?.ok) {
      selectedSummary.textContent = reply?.error || "处理交易失败。";
      return;
    }

    if (reply.game) {
      applyServerGameState(reply.room, reply.game);
      renderPlayers();
      renderHand();
      renderShops();
      updateDraftSummary();
    }

    selectedSummary.textContent = accepted ? "交易已执行。" : "已拒绝交易。";
    closeTradeModal();
  });
}

function getSelectedShopCard() {
  return (currentGame?.shopCards || []).find((shop) => shop.id === selectedShopCardId);
}

function getLotPublicOwner(lotId) {
  return (currentGame?.publicLots || []).find((item) => Number(item.lotId) === Number(lotId));
}

function ownsLot(player, lotOwner) {
  return Boolean(player && lotOwner && (
    String(lotOwner.playerId) === String(player.id)
    || String(lotOwner.playerId) === String(currentPlayerId)
  ));
}

function canPlaceShopOnLot(lotId) {
  if (currentGame?.phase !== "shop-draft") return { ok: false, message: "当前还不能放置店铺" };
  if (!selectedShopCardId) return { ok: false, message: "请先选择一个店铺" };
  if (currentGame.placedShops?.[lotId]) return { ok: false, message: `${lotId}号地块已经有店铺` };

  const self = getSelfPlayer();
  const owner = getLotPublicOwner(lotId);
  if (!ownsLot(self, owner)) return { ok: false, message: "只能放在你自己的空地块上" };

  const shop = getSelectedShopCard();
  if (!shop) return { ok: false, message: "这个店铺已经用完了" };

  return { ok: true, shop, owner };
}

function getShopGroupProgress(lotId) {
  const placedShop = currentGame?.placedShops?.[lotId];
  if (!placedShop) return null;

  const visited = new Set();
  const queue = [Number(lotId)];

  while (queue.length) {
    const nextId = queue.shift();
    if (visited.has(nextId)) continue;
    const nextShop = currentGame.placedShops[nextId];
    if (!nextShop) continue;
    if (nextShop.id !== placedShop.id || nextShop.ownerId !== placedShop.ownerId) continue;

    visited.add(nextId);
    const lot = lotsById.get(nextId);
    if (!lot) continue;

    getNeighbors(lot).forEach((neighbor) => {
      if (!visited.has(neighbor.id)) {
        queue.push(neighbor.id);
      }
    });
  }

  return {
    name: placedShop.name,
    current: visited.size,
    max: placedShop.size,
  };
}

function splitBusinessSizes(count, maxSize) {
  const sizes = [];
  let remaining = count;

  while (remaining >= maxSize) {
    sizes.push(maxSize);
    remaining -= maxSize;
  }

  if (remaining > 0) {
    sizes.push(remaining);
  }

  return sizes;
}

function getIncomeForBusinessSize(count, maxSize) {
  if (count >= maxSize) {
    return incomeTable.complete[maxSize] || 0;
  }

  return incomeTable.incomplete[count] || 0;
}

function calculateIncomeRows() {
  const placedShops = currentGame?.placedShops || {};
  const visited = new Set();
  const rows = [];

  Object.keys(placedShops).map(Number).forEach((lotId) => {
    if (visited.has(lotId)) return;

    const shop = placedShops[lotId];
    const componentIds = getShopComponentIds(lotId);
    componentIds.forEach((id) => visited.add(id));

    const sortedLotIds = componentIds.sort((a, b) => a - b);
    const businessSizes = splitBusinessSizes(sortedLotIds.length, shop.size);

    businessSizes.forEach((businessSize, businessIndex) => {
      const start = businessIndex * shop.size;
      const lotIds = sortedLotIds.slice(start, start + businessSize);
      rows.push({
        playerId: shop.ownerId,
        playerName: shop.ownerName,
        shopId: shop.id,
        shopName: shop.name,
        size: businessSize,
        maxSize: shop.size,
        complete: businessSize >= shop.size,
        income: getIncomeForBusinessSize(businessSize, shop.size),
        lotIds,
        partIndex: businessIndex + 1,
        partCount: businessSizes.length,
      });
    });
  });

  return rows;
}

function applyIncomeSettlement() {
  if (!currentGame || currentGame.incomeSettled) return;

  currentGame.incomeRows = calculateIncomeRows();
  room.players.forEach((player) => {
    const income = getIncomeTotalForPlayer(player.id);
    player.cash = getPlayerCash(player) + income;
  });
  currentGame.incomeSettled = true;
}

function applyServerGameState(nextRoom, nextGame) {
  room = nextRoom;
  currentGame = nextGame;
  saveSession();
  selectedBuildingKeeps = new Set(currentGame.keptBuildingIds || []);
  buildingDraftConfirmed = Boolean(currentGame.buildingConfirmed);

  if (selectedShopCardId && !(currentGame.shopCards || []).some((shop) => shop.id === selectedShopCardId)) {
    selectedShopCardId = null;
  }

  applyPublicLotsToBoard(currentGame.publicLots || []);
  roundLabel.textContent = `${currentGame.round}/6轮`;
  cashLabel.textContent = formatMoney(getPlayerCash(getSelfPlayer()));
}

function renderSyncedGameScreen() {
  selectedBuildingKeeps = new Set(currentGame?.keptBuildingIds || []);
  buildingDraftConfirmed = Boolean(currentGame?.buildingConfirmed);
  applyPublicLotsToBoard(currentGame?.publicLots || []);
  renderPlayers();
  renderHand();
  renderShops();
  updateDraftSummary();
  roundLabel.textContent = `${currentGame.round}/6轮`;
  cashLabel.textContent = formatMoney(getPlayerCash(getSelfPlayer()));
  showScreen(gameScreen);
}

function getIncomeTotalForPlayer(playerId) {
  return (currentGame?.incomeRows || [])
    .filter((row) => row.playerId === playerId)
    .reduce((total, row) => total + row.income, 0);
}

function renderIncomePanel() {
  const rows = currentGame.incomeRows || [];
  const self = getSelfPlayer();
  const selfRows = rows.filter((row) => row.playerId === self?.id);
  const total = getIncomeTotalForPlayer(self?.id);

  const header = document.createElement("div");
  header.className = "income-card wide";
  header.innerHTML = `
    <span>收入结算</span>
    <strong>+${formatMoney(total)}</strong>
  `;
  shopGrid.appendChild(header);

  if (!selfRows.length) {
    const empty = document.createElement("p");
    empty.className = "income-empty wide";
    empty.textContent = "你本轮还没有可结算的店铺。";
    shopGrid.appendChild(empty);
  }

  selfRows.forEach((row, index) => {
    const splitLabel = row.partCount > 1 ? ` · 第${row.partIndex}组` : "";
    const item = document.createElement("article");
    item.className = `income-row${row.complete ? " complete" : ""}`;
    item.style.animationDelay = `${index * 90}ms`;
    item.innerHTML = `
      <div>
        <strong>${row.shopName}</strong>
        <small>${row.complete ? "完成" : "未完成"} · ${row.size}/${row.maxSize}${splitLabel} · 地块 ${row.lotIds.join("、")}</small>
      </div>
      <b>+${formatMoney(row.income)}</b>
    `;
    shopGrid.appendChild(item);
  });

  const next = document.createElement("button");
  next.type = "button";
  next.className = "confirm-draft shop-confirm";
  next.disabled = Boolean(currentGame.nextRoundConfirmed);
  next.textContent = currentGame.nextRoundConfirmed
    ? `已同意 · 等待 ${currentGame.nextRoundReadyCount || 1}/${room.playerCount}`
    : currentGame.round >= 6 ? "同意查看最终结算" : "同意进入下一轮";
  next.addEventListener("click", agreeToAdvanceAfterIncome);
  shopGrid.appendChild(next);
}

function renderFinalPanel() {
  [...room.players]
    .sort((a, b) => getPlayerCash(b) - getPlayerCash(a))
    .forEach((player, index) => {
      const item = document.createElement("article");
      item.className = "income-row final";
      item.innerHTML = `
        <div>
          <strong>${index + 1}. ${player.name}</strong>
          <small>${getPlayerStatsText(player)}</small>
        </div>
        <b>${formatMoney(getPlayerCash(player))}</b>
      `;
      shopGrid.appendChild(item);
    });
}

function confirmShopPlacement() {
  if (currentGame?.phase !== "shop-draft") return;

  renderRoundAdvanceConfirm();
}

function finalizeShopPlacementAndShowIncome() {
  if (currentGame?.phase !== "shop-draft") return;

  if (socket && room?.code && !isDevMode) {
    closeHintModal();
    socket.emit("confirmShopPlacement", { code: room.code }, (reply) => {
      if (!reply?.ok) {
        selectedSummary.textContent = reply?.error || "确认店铺放置失败。";
        return;
      }

      room = reply.room;
      currentGame = reply.game;
      selectedShopCardId = null;
      applyPublicLotsToBoard(currentGame.publicLots || []);
      if (currentGame.phase === "income") {
        applyIncomeSettlement();
      }
      renderPlayers();
      renderHand();
      renderShops();
      updateDraftSummary();
      if (currentGame.phase === "income") {
        cashLabel.textContent = formatMoney(getPlayerCash(getSelfPlayer()));
        renderIncomeSettlementModal();
      }
    });
    return;
  }

  selectedShopCardId = null;
  currentGame.shopPlacementConfirmed = true;
  currentGame.shopReadyCount = room.playerCount;
  currentGame.phase = "income";
  applyIncomeSettlement();
  applyPublicLotsToBoard(currentGame.publicLots || []);
  renderPlayers();
  renderHand();
  renderShops();
  updateDraftSummary();
  cashLabel.textContent = formatMoney(getPlayerCash(getSelfPlayer()));
  renderIncomeSettlementModal();
}

function agreeToAdvanceAfterIncome() {
  if (!currentGame) return;

  closeHintModal();

  if (socket && room?.code && !isDevMode) {
    socket.emit("agreeNextRound", { code: room.code }, (reply) => {
      if (!reply?.ok) {
        selectedSummary.textContent = reply?.error || "同意进入下一轮失败。";
        return;
      }

      applyServerGameState(reply.room, reply.game);
      if (currentGame.phase === "income") {
        selectedSummary.textContent = currentGame.round >= 6
          ? `已同意最终结算 ${currentGame.nextRoundReadyCount || 1}/${room.playerCount}`
          : `已同意进入下一轮 ${currentGame.nextRoundReadyCount || 1}/${room.playerCount}`;
      } else if (currentGame.phase === "final") {
        selectedSummary.textContent = "游戏结束 · 最终现金排名";
        activateTab("shops");
      } else {
        selectedBuildingKeeps = new Set();
        buildingDraftConfirmed = false;
        selectedShopCardId = null;
        clearSelection();
        selectedSummary.textContent = `第${currentGame.round}轮 · 候选 ${currentGame.buildingDealCount} 保留 ${currentGame.buildingKeepCount}`;
        activateTab("cards");
      }

      renderPlayers();
      renderHand();
      renderShops();
      updateDraftSummary();
    });
    return;
  }

  currentGame.nextRoundReadyCount = room.playerCount;
  selectedSummary.textContent = currentGame.round >= 6
    ? `已同意最终结算 ${currentGame.nextRoundReadyCount}/${room.playerCount}`
    : `已同意进入下一轮 ${currentGame.nextRoundReadyCount}/${room.playerCount}`;
  advanceAfterIncome();
}

function advanceAfterIncome() {
  if (!currentGame) return;

  if ((currentGame.nextRoundReadyCount || 0) < room.playerCount) {
    selectedSummary.textContent = `等待其他玩家同意 ${currentGame.nextRoundReadyCount || 0}/${room.playerCount}`;
    return;
  }

  if (currentGame.round >= 6) {
    currentGame.phase = "final";
    selectedSummary.textContent = "游戏结束 · 最终现金排名";
    activateTab("shops");
    renderPlayers();
    renderHand();
    renderShops();
    return;
  }

  currentGame.round += 1;
  const rules = getRoundRules(room.playerCount, currentGame.round);
  currentGame.phase = "building-draft";
  currentGame.buildingCards = makeBuildingCandidates(rules.buildings.deal);
  currentGame.keptBuildingIds = [];
  currentGame.buildingConfirmed = false;
  currentGame.buildingReadyCount = 0;
  currentGame.buildingKeepCount = rules.buildings.keep;
  currentGame.buildingDealCount = rules.buildings.deal;
  currentGame.shopCards = [...(currentGame.playerShopHands?.[getSelfPlayer()?.id] || currentGame.shopCards || [])];
  currentGame.shopTileDrawCount = rules.shops;
  currentGame.incomeRows = [];
  currentGame.incomeSettled = false;
  currentGame.nextRoundReadyCount = 0;
  currentGame.shopPlacementConfirmed = false;
  currentGame.shopReadyCount = 0;
  selectedBuildingKeeps = new Set();
  buildingDraftConfirmed = false;
  selectedShopCardId = null;
  clearSelection();
  applyPublicLotsToBoard(currentGame.publicLots || []);
  renderPlayers();
  renderHand();
  renderShops();
  roundLabel.textContent = `${currentGame.round}/6轮`;
  cashLabel.textContent = formatMoney(getPlayerCash(getSelfPlayer()));
  selectedSummary.textContent = `第${currentGame.round}轮 · 候选 ${currentGame.buildingDealCount} 保留 ${currentGame.buildingKeepCount}`;
  activateTab("cards");
}

function removeOneShopCard(shopId) {
  const index = currentGame.shopCards.findIndex((shop) => shop.id === shopId);
  if (index >= 0) {
    currentGame.shopCards.splice(index, 1);
    syncSelfShopHand();
  }
}

function placeSelectedShop(lotId) {
  const result = canPlaceShopOnLot(lotId);
  if (!result.ok) {
    selectedSummary.textContent = result.message;
    return false;
  }

  const { shop, owner } = result;
  if (socket && room?.code && !isDevMode) {
    socket.emit("placeShopTile", { code: room.code, lotId, shopId: shop.id }, (reply) => {
      if (!reply?.ok) {
        selectedSummary.textContent = reply?.error || "放置店铺失败。";
        return;
      }

      room = reply.room;
      currentGame = reply.game;
      selectedShopCardId = (currentGame.shopCards || []).some((item) => item.id === shop.id) ? shop.id : null;
      applyPublicLotsToBoard(currentGame.publicLots || []);
      renderPlayers();
      renderShops();
      updateDraftSummary();
      activateTab("shops");
      const progress = getShopGroupProgress(lotId);
      selectedSummary.textContent = progress
        ? `${lotId}号放置${shop.name} · 规模 ${progress.current}/${progress.max}`
        : `${lotId}号放置${shop.name}`;
    });
    return true;
  }

  currentGame.placedShops ||= {};
  currentGame.placedShops[lotId] = {
    id: shop.id,
    name: shop.name,
    mark: shop.mark,
    image: shop.image,
    size: shop.size,
    ownerId: owner.playerId || getSelfPlayer()?.id,
    ownerName: owner.name,
  };

  removeOneShopCard(shop.id);
  selectedShopCardId = (currentGame.shopCards || []).some((item) => item.id === shop.id) ? shop.id : null;
  applyPublicLotsToBoard(currentGame.publicLots || []);
  renderPlayers();
  renderShops();
  activateTab("shops");

  const progress = getShopGroupProgress(lotId);
  selectedSummary.textContent = progress
    ? `${lotId}号放置${shop.name} · 规模 ${progress.current}/${progress.max}`
    : `${lotId}号放置${shop.name}`;
  return true;
}

function selectCell(id, element, options = {}) {
  if (selectedShopCardId) {
    placeSelectedShop(id);
    return;
  }

  if (selectedCell === element && !options.fromLocate) {
    clearSelection();
    return;
  }

  selectedCell?.classList.remove("is-selected");
  selectedCell = element;
  selectedCell.classList.add("is-selected");

  const owner = lotOwners[id];
  const lot = lotsById.get(id);
  const neighborIds = getNeighbors(lot).map((neighbor) => neighbor.id).join("、") || "无";
  const progress = getShopGroupProgress(id);
  const shopText = progress ? ` · ${progress.name} ${progress.current}/${progress.max}` : "";
  const ownerText = owner ? `${owner.name}${shopText}` : "无主";
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
    saveSession();
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
    saveSession();
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
  renderIncomeHint();
  openHintModal();
});

playersButton.addEventListener("click", () => {
  playersModal.setAttribute("aria-hidden", "false");
});

document.querySelector("#startTradeButton").addEventListener("click", () => {
  openTradeModal();
});

tradeBody.addEventListener("click", (event) => {
  const targetButton = event.target.closest("[data-target]");
  if (targetButton) {
    event.preventDefault();
    tradeDraft.targetId = targetButton.dataset.target;
    tradeDraft.requestLots.clear();
    tradeDraft.requestShops.clear();
    renderTradeModal();
    return;
  }

  const shopButton = event.target.closest("[data-shop-step]");
  if (shopButton) {
    event.preventDefault();
    adjustTradeShop(
      shopButton.dataset.map,
      shopButton.dataset.shopId,
      Number(shopButton.dataset.shopStep),
      Number(shopButton.dataset.max),
      shopButton,
    );
    return;
  }

  const responseButton = event.target.closest("[data-trade-response]");
  if (responseButton) {
    event.preventDefault();
    respondTradeProposal(responseButton.dataset.tradeResponse === "accept");
    return;
  }

  const chip = event.target.closest("[data-set]");
  if (chip) {
    event.preventDefault();
    const selected = toggleTradeSet(chip.dataset.set, chip.dataset.value);
    chip.classList.toggle("is-selected", selected);
  }
});

tradeBody.addEventListener("input", (event) => {
  const cashName = event.target.dataset.cash;
  if (!cashName) return;
  tradeDraft[cashName] = Math.max(0, Math.min(tradeCashLimit, Number(event.target.value || 0)));
  const valueLabel = tradeBody.querySelector(`[data-cash-value="${cashName}"]`);
  if (valueLabel) {
    valueLabel.textContent = `${tradeDraft[cashName]}万`;
  }
});

submitTrade.addEventListener("click", () => {
  if (submitTrade.dataset.mode === "accept") {
    respondTradeProposal(true);
    return;
  }

  createTradeProposal();
});

closeTradeButton.addEventListener("click", () => {
  if (submitTrade.dataset.mode === "accept" && activeTradeProposal) {
    respondTradeProposal(false);
    return;
  }

  closeTradeModal();
});

tradeModal.addEventListener("click", (event) => {
  if (event.target === tradeModal) {
    if (submitTrade.dataset.mode === "accept" && activeTradeProposal) {
      respondTradeProposal(false);
      return;
    }

    closeTradeModal();
  }
});

document.querySelector("#closePlayers").addEventListener("click", () => {
  playersModal.setAttribute("aria-hidden", "true");
});

playersModal.addEventListener("click", (event) => {
  if (event.target === playersModal) {
    playersModal.setAttribute("aria-hidden", "true");
  }
});

document.querySelector("#closeHint").addEventListener("click", closeHintModal);

hintContent.addEventListener("click", (event) => {
  if (event.target.closest("[data-modal-close]")) {
    closeHintModal();
    return;
  }

  if (event.target.closest("[data-confirm-next-round]")) {
    finalizeShopPlacementAndShowIncome();
    return;
  }

  if (event.target.closest("[data-income-next]")) {
    agreeToAdvanceAfterIncome();
  }
});

hintModal.addEventListener("click", (event) => {
  if (event.target === hintModal) {
    closeHintModal();
  }
});

if (socket) {
  socket.on("connect", () => {
    const saved = readSession();
    const resumeCode = room?.code || saved?.code;
    const resumePlayerId = currentPlayerId || saved?.playerId;

    if (resumeCode && resumePlayerId) {
      socket.emit("resumeRoom", { code: resumeCode, playerId: resumePlayerId }, (reply) => {
        if (!reply?.ok) {
          if (!currentPlayerId) currentPlayerId = socket.id;
          return;
        }

        currentPlayerId = reply.selfId;
        room = reply.room;
        saveSession();

        if (reply.game) {
          currentGame = reply.game;
          renderSyncedGameScreen();
        } else if (waitingScreen.classList.contains("is-active")) {
          renderWaitingRoom();
        }
      });
      return;
    }

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
    saveSession();
    renderStarterWheel();
    showScreen(starterScreen);
  });

  socket.on("gameState", (payload) => {
    const previousPhase = currentGame?.phase;
    applyServerGameState(payload.room, payload.game);

    if (currentGame.phase === "building-reveal") {
      activateTab("cards");
      renderPlayers();
      renderHand();
      renderShops();
      updateDraftSummary();
      return;
    }

    if (!["shop-draft", "shop-dealing"].includes(previousPhase) && currentGame.phase === "shop-draft") {
      selectedShopCardId = null;
      activateTab("shops");
      renderPlayers();
      renderHand();
      renderShops();
      updateDraftSummary();
      return;
    }

    if (currentGame.phase === "income" && previousPhase !== "income") {
      applyIncomeSettlement();
      renderPlayers();
      renderHand();
      renderShops();
      updateDraftSummary();
      cashLabel.textContent = formatMoney(getPlayerCash(getSelfPlayer()));
      renderIncomeSettlementModal();
      return;
    }

    if (previousPhase === "income" && currentGame.phase === "building-draft") {
      selectedBuildingKeeps = new Set();
      buildingDraftConfirmed = false;
      selectedShopCardId = null;
      clearSelection();
      activateTab("cards");
      renderPlayers();
      renderHand();
      renderShops();
      selectedSummary.textContent = `第${currentGame.round}轮 · 候选 ${currentGame.buildingDealCount} 保留 ${currentGame.buildingKeepCount}`;
      return;
    }

    if (currentGame.phase === "final") {
      selectedShopCardId = null;
      selectedSummary.textContent = "游戏结束 · 最终现金排名";
      activateTab("shops");
      renderPlayers();
      renderHand();
      renderShops();
      return;
    }

    renderPlayers();
    renderHand();
    renderShops();
    updateDraftSummary();
  });

  socket.on("tradeProposal", (proposal) => {
    renderIncomingTrade(proposal);
  });

  socket.on("tradeResolved", (result) => {
    selectedSummary.textContent = result?.text || "交易状态已更新。";
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
  room = makeRoom(devPlayerCount, "DEV1");
  room.phase = "playing";
  room.starterId = room.players[0].id;
  currentPlayerId = "local-host";
  currentGame = makeDevGame();
  renderStarterWheel();
  showScreen(starterScreen);
  if (params.get("trade") === "1") {
    window.setTimeout(openTradeModal, 5200);
  }
} else {
  showScreen(homeScreen);
}
