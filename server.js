const express = require("express");
const http = require("http");
const os = require("os");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 4173;
const HOST = "0.0.0.0";

const colors = ["red", "blue", "cyan", "purple"];
const rooms = new Map();
const fallbackNames = ["阿明", "小林", "阿青", "阿豪", "小唐", "阿珍", "老陈", "阿远"];

const BUILDING_CARD_RULES = {
  3: [
    { deal: 7, keep: 5 },
    { deal: 6, keep: 4 },
    { deal: 6, keep: 4 },
    { deal: 6, keep: 4 },
    { deal: 6, keep: 4 },
    { deal: 6, keep: 4 },
  ],
  4: [
    { deal: 6, keep: 4 },
    { deal: 5, keep: 3 },
    { deal: 5, keep: 3 },
    { deal: 5, keep: 3 },
    { deal: 5, keep: 3 },
    { deal: 5, keep: 3 },
  ],
};

const SHOP_TILE_RULES = {
  3: [6, 4, 4, 4, 4, 4],
  4: [4, 3, 3, 3, 3, 3],
};

const SHOP_TYPES = [
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

const INCOME_TABLE = {
  incomplete: { 1: 1, 2: 2, 3: 4, 4: 6, 5: 8 },
  complete: { 3: 5, 4: 8, 5: 11, 6: 14 },
};
const TRADE_CASH_LIMIT = 50;

function lot(id, x, y, w, h) {
  return { id, x, y, w, h, cx: x + w / 2, cy: y + h / 2 };
}

const LOT_LAYOUT = [
  lot(1, 310, 245, 78, 78), lot(2, 420, 245, 78, 78),
  lot(3, 310, 355, 78, 78), lot(4, 420, 355, 78, 78), lot(5, 530, 355, 78, 78),
  lot(6, 200, 465, 78, 78), lot(7, 310, 465, 78, 78), lot(8, 420, 465, 78, 78), lot(9, 530, 465, 78, 78),
  lot(10, 200, 575, 78, 78), lot(11, 310, 575, 78, 78), lot(12, 420, 575, 78, 78),
  lot(13, 200, 685, 78, 78), lot(14, 310, 685, 78, 78), lot(15, 420, 685, 78, 78),
  lot(16, 688, 245, 78, 78), lot(17, 798, 245, 78, 78), lot(18, 908, 245, 78, 78),
  lot(19, 688, 355, 78, 78), lot(20, 798, 355, 78, 78), lot(21, 908, 355, 78, 78),
  lot(22, 688, 465, 78, 78), lot(23, 798, 465, 78, 78),
  lot(24, 688, 575, 78, 78), lot(25, 798, 575, 78, 78),
  lot(26, 688, 685, 78, 78), lot(27, 798, 685, 78, 78),
  lot(28, 1081, 245, 78, 78), lot(29, 1191, 245, 78, 78), lot(30, 1301, 245, 78, 78),
  lot(31, 1081, 355, 78, 78), lot(32, 1191, 355, 78, 78), lot(33, 1301, 355, 78, 78),
  lot(34, 1081, 465, 78, 78), lot(35, 1191, 465, 78, 78), lot(36, 1301, 465, 78, 78),
  lot(37, 1191, 575, 78, 78), lot(38, 1301, 575, 78, 78), lot(39, 1411, 575, 78, 78),
  lot(40, 1191, 685, 78, 78), lot(41, 1301, 685, 78, 78), lot(42, 1411, 685, 78, 78),
  lot(43, 1564, 247, 78, 78), lot(44, 1666, 247, 78, 78), lot(45, 1774, 247, 78, 78), lot(46, 1876, 247, 78, 78),
  lot(47, 1564, 357, 78, 78), lot(48, 1666, 357, 78, 78), lot(49, 1774, 357, 78, 78), lot(50, 1876, 357, 78, 78),
  lot(51, 1564, 467, 78, 78), lot(52, 1666, 467, 78, 78), lot(53, 1774, 467, 78, 78), lot(54, 1876, 467, 78, 78),
  lot(55, 1774, 579, 78, 78), lot(56, 1876, 579, 78, 78),
  lot(57, 1774, 685, 78, 78), lot(58, 1876, 685, 78, 78),
  lot(59, 794, 836, 78, 78), lot(60, 904, 836, 78, 78),
  lot(61, 794, 932, 78, 78), lot(62, 904, 932, 78, 78),
  lot(63, 794, 1026, 78, 78), lot(64, 904, 1026, 78, 78), lot(65, 1016, 1026, 78, 78),
  lot(66, 794, 1122, 78, 78), lot(67, 904, 1122, 78, 78), lot(68, 1016, 1122, 78, 78),
  lot(69, 904, 1216, 78, 78), lot(70, 1016, 1216, 78, 78),
  lot(71, 1327, 836, 78, 78), lot(72, 1437, 836, 78, 78), lot(73, 1549, 836, 78, 78), lot(74, 1659, 836, 78, 78),
  lot(75, 1327, 932, 78, 78), lot(76, 1437, 932, 78, 78), lot(77, 1549, 932, 78, 78), lot(78, 1659, 932, 78, 78),
  lot(79, 1327, 1026, 78, 78), lot(80, 1437, 1026, 78, 78), lot(81, 1549, 1026, 78, 78), lot(82, 1659, 1026, 78, 78),
  lot(83, 1327, 1122, 78, 78), lot(84, 1437, 1122, 78, 78), lot(85, 1549, 1122, 78, 78),
];

const LOTS_BY_ID = new Map(LOT_LAYOUT.map((item) => [item.id, item]));

app.use(express.static(__dirname));

function getLanUrls() {
  return Object.values(os.networkInterfaces())
    .flat()
    .filter((item) => item && item.family === "IPv4" && !item.internal)
    .map((item) => `http://${item.address}:${PORT}/`);
}

app.get("/api/network-info", (req, res) => {
  res.json({
    local: `http://127.0.0.1:${PORT}/`,
    lan: getLanUrls(),
  });
});

function makeRoomCode() {
  let code = "";

  do {
    code = Math.random().toString(36).slice(2, 6).toUpperCase();
  } while (rooms.has(code));

  return code;
}

function publicRoom(room) {
  return {
    code: room.code,
    playerCount: room.playerCount,
    hostId: room.hostId,
    phase: room.phase,
    starterId: room.starterId,
    players: room.players.map((player) => ({
      id: player.id,
      name: player.name,
      color: player.color,
      stats: player.stats,
      connected: player.connected !== false,
    })),
  };
}

function shuffle(items) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

function makeFallbackName(room) {
  const usedNames = new Set(room?.players?.map((player) => player.name) || []);
  const available = fallbackNames.filter((name) => !usedNames.has(name));
  const pool = available.length ? available : fallbackNames;
  return pool[Math.floor(Math.random() * pool.length)];
}

function normalizePlayerName(nickname, room) {
  const name = String(nickname || "").trim().slice(0, 8);
  const usedNames = new Set(room?.players?.map((player) => player.name) || []);
  if (!name || name === "你" || name === "玩家" || usedNames.has(name)) return makeFallbackName(room);
  return name;
}

function createShopDeck() {
  const remaining = new Map(SHOP_TYPES.map((shop) => [shop.id, shop.size + 3]));
  const deck = [];
  let previousShopId = null;

  while (deck.length < SHOP_TYPES.reduce((total, shop) => total + shop.size + 3, 0)) {
    const availableShops = SHOP_TYPES.filter((shop) => (remaining.get(shop.id) || 0) > 0);
    const repeatShop = availableShops.find((shop) => shop.id === previousShopId);
    const shouldRepeat = repeatShop && Math.random() < 0.34;
    const shop = shouldRepeat
      ? repeatShop
      : availableShops[Math.floor(Math.random() * availableShops.length)];
    const nextCount = remaining.get(shop.id) - 1;
    const copyNumber = shop.size + 3 - nextCount;
    remaining.set(shop.id, nextCount);
    deck.push({ ...shop, cardId: `${shop.id}-${copyNumber}` });
    previousShopId = shop.id;
  }

  return deck;
}

function publicBuildingLots(room) {
  if (!room.game) return [];

  return room.players.flatMap((player) => (
    (room.game.ownedLots[player.id] || []).map((lotId) => ({
      lotId,
      playerId: player.id,
      name: player.name,
      color: player.color,
    }))
  ));
}

function moveGameMapEntry(target, oldId, newId) {
  if (!target || !Object.prototype.hasOwnProperty.call(target, oldId)) return;
  target[newId] = target[oldId];
  delete target[oldId];
}

function transferPlayerSocket(room, oldId, newSocket) {
  const player = room.players.find((item) => item.id === oldId);
  if (!player) return null;

  const newId = newSocket.id;
  player.id = newId;
  player.connected = true;

  if (room.hostId === oldId) {
    room.hostId = newId;
  }

  if (room.game) {
    moveGameMapEntry(room.game.ownedLots, oldId, newId);
    moveGameMapEntry(room.game.buildingDrafts, oldId, newId);
    moveGameMapEntry(room.game.buildingSelections, oldId, newId);
    moveGameMapEntry(room.game.buildingReady, oldId, newId);
    moveGameMapEntry(room.game.shopDrafts, oldId, newId);
    moveGameMapEntry(room.game.shopReady, oldId, newId);
    moveGameMapEntry(room.game.nextRoundReady, oldId, newId);
    Object.values(room.game.placedShops || {}).forEach((shop) => {
      if (shop.ownerId === oldId) shop.ownerId = newId;
    });
    Object.values(room.game.pendingTrades || {}).forEach((trade) => {
      if (trade.fromId === oldId) trade.fromId = newId;
      if (trade.toId === oldId) trade.toId = newId;
    });
  }

  newSocket.join(room.code);
  newSocket.data.roomCode = room.code;
  return player;
}

function overlapLength(startA, endA, startB, endB) {
  return Math.max(0, Math.min(endA, endB) - Math.max(startA, startB));
}

function getNeighbors(targetLot) {
  const edgeTolerance = 36;
  return LOT_LAYOUT.filter((candidate) => {
    if (candidate.id === targetLot.id) return false;

    const horizontalGap = Math.min(
      Math.abs(candidate.x - (targetLot.x + targetLot.w)),
      Math.abs(targetLot.x - (candidate.x + candidate.w)),
    );
    const verticalGap = Math.min(
      Math.abs(candidate.y - (targetLot.y + targetLot.h)),
      Math.abs(targetLot.y - (candidate.y + candidate.h)),
    );
    const verticalOverlap = overlapLength(targetLot.y, targetLot.y + targetLot.h, candidate.y, candidate.y + candidate.h);
    const horizontalOverlap = overlapLength(targetLot.x, targetLot.x + targetLot.w, candidate.x, candidate.x + candidate.w);
    const horizontalTouch = horizontalGap <= edgeTolerance && verticalOverlap > targetLot.h * 0.6;
    const verticalTouch = verticalGap <= edgeTolerance && horizontalOverlap > targetLot.w * 0.6;
    return horizontalTouch || verticalTouch;
  });
}

function getShopComponentIds(game, lotId) {
  const placedShop = game.placedShops?.[lotId];
  if (!placedShop) return [];

  const visited = new Set();
  const queue = [Number(lotId)];

  while (queue.length) {
    const nextId = queue.shift();
    if (visited.has(nextId)) continue;

    const nextShop = game.placedShops?.[nextId];
    if (!nextShop) continue;
    if (nextShop.id !== placedShop.id || nextShop.ownerId !== placedShop.ownerId) continue;

    visited.add(nextId);
    const lotItem = LOTS_BY_ID.get(nextId);
    if (!lotItem) continue;

    getNeighbors(lotItem).forEach((neighbor) => {
      if (!visited.has(neighbor.id)) queue.push(neighbor.id);
    });
  }

  return [...visited];
}

function splitBusinessSizes(count, maxSize) {
  const sizes = [];
  let remaining = count;

  while (remaining >= maxSize) {
    sizes.push(maxSize);
    remaining -= maxSize;
  }

  if (remaining > 0) sizes.push(remaining);
  return sizes;
}

function getIncomeForBusinessSize(count, maxSize) {
  return count >= maxSize
    ? INCOME_TABLE.complete[maxSize] || 0
    : INCOME_TABLE.incomplete[count] || 0;
}

function calculateIncomeRows(game) {
  const visited = new Set();
  const rows = [];

  Object.keys(game.placedShops || {}).map(Number).forEach((lotId) => {
    if (visited.has(lotId)) return;

    const shop = game.placedShops[lotId];
    const componentIds = getShopComponentIds(game, lotId);
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

function settleIncome(room) {
  if (!room.game || room.game.incomeSettled) return;

  const rows = calculateIncomeRows(room.game);
  room.game.incomeRows = rows;
  room.players.forEach((player) => {
    const income = rows
      .filter((row) => row.playerId === player.id)
      .reduce((total, row) => total + row.income, 0);
    player.cash = (player.cash ?? 5) + income;
  });
  room.game.incomeSettled = true;
}

function formatMoney(value) {
  return `${Number(Number(value || 0).toFixed(1)).toLocaleString("zh-CN")}万`;
}

function addGameEvent(room, text, type = "system") {
  if (!room?.game || !text) return;

  room.game.eventSeq = (room.game.eventSeq || 0) + 1;
  room.game.eventLog ||= [];
  room.game.eventLog.unshift({
    id: room.game.eventSeq,
    round: room.game.round || 1,
    type,
    text,
    createdAt: Date.now(),
  });
  room.game.eventLog = room.game.eventLog.slice(0, 40);
}

function advanceToNextRound(room) {
  const game = room.game;
  game.round += 1;
  const buildingRule = BUILDING_CARD_RULES[room.playerCount][game.round - 1];
  const shopRule = SHOP_TILE_RULES[room.playerCount][game.round - 1];

  game.phase = "building-draft";
  game.buildingDrafts = {};
  game.buildingSelections = {};
  game.buildingReady = {};
  game.shopReady = {};
  game.nextRoundReady = {};
  game.incomeRows = [];
  game.incomeSettled = false;
  game.buildingKeepCount = buildingRule.keep;
  game.buildingDealCount = buildingRule.deal;
  game.shopTileDrawCount = shopRule;

  room.players.forEach((player) => {
    game.buildingDrafts[player.id] = game.buildingDeck.splice(0, buildingRule.deal).sort((a, b) => a - b);
  });
}

function createGame(room) {
  const buildingDeck = shuffle(Array.from({ length: 85 }, (_, index) => index + 1));
  const buildingRule = BUILDING_CARD_RULES[room.playerCount][0];
  const buildingDrafts = {};

  room.players.forEach((player) => {
    buildingDrafts[player.id] = buildingDeck.splice(0, buildingRule.deal).sort((a, b) => a - b);
  });

  return {
    round: 1,
    phase: "building-draft",
    buildingDeck,
    shopDeck: createShopDeck(),
    buildingDrafts,
    ownedLots: Object.fromEntries(room.players.map((player) => [player.id, []])),
    buildingSelections: {},
    buildingReady: {},
    shopDrafts: {},
    placedShops: {},
    shopReady: {},
    nextRoundReady: {},
    pendingTrades: {},
    tradeSeq: 1,
    eventLog: [],
    eventSeq: 0,
    incomeRows: [],
    incomeSettled: false,
    buildingKeepCount: buildingRule.keep,
    buildingDealCount: buildingRule.deal,
    shopTileDrawCount: SHOP_TILE_RULES[room.playerCount][0],
  };
}

function personalGameState(room, playerId) {
  if (!room.game) return null;

  const shopCounts = Object.fromEntries(room.players.map((player) => [
    player.id,
    (room.game.shopDrafts[player.id] || []).length,
  ]));
  const publicShopHands = Object.fromEntries(room.players.map((player) => [
    player.id,
    room.game.shopDrafts[player.id] || [],
  ]));

  return {
    round: room.game.round,
    phase: room.game.phase,
    buildingCards: room.game.buildingSelections[playerId] || room.game.buildingDrafts[playerId] || [],
    keptBuildingIds: room.game.buildingSelections[playerId] || [],
    buildingConfirmed: Boolean(room.game.buildingReady?.[playerId]),
    buildingReadyCount: Object.keys(room.game.buildingReady || {}).length,
    buildingKeepCount: room.game.buildingKeepCount,
    buildingDealCount: room.game.buildingDealCount,
    publicLots: publicBuildingLots(room),
    ownLotIds: room.game.ownedLots[playerId] || [],
    shopCards: room.game.shopDrafts[playerId] || [],
    publicShopHands,
    placedShops: room.game.placedShops || {},
    shopPlacementConfirmed: Boolean(room.game.shopReady?.[playerId]),
    shopReadyCount: Object.keys(room.game.shopReady || {}).length,
    nextRoundConfirmed: Boolean(room.game.nextRoundReady?.[playerId]),
    nextRoundReadyCount: Object.keys(room.game.nextRoundReady || {}).length,
    playerShopCounts: shopCounts,
    cash: room.players.find((player) => player.id === playerId)?.cash ?? 5,
    incomeRows: room.game.incomeRows || [],
    incomeSettled: Boolean(room.game.incomeSettled),
    eventLog: room.game.eventLog || [],
    shopTileDrawCount: room.game.shopTileDrawCount,
    deckRemaining: room.game.buildingDeck.length,
  };
}

function updatePlayerStats(room) {
  if (!room.game) return;

  room.players.forEach((player) => {
    const lotCount = (room.game.ownedLots[player.id] || []).length;
    const shopCount = Object.values(room.game.placedShops || {})
      .filter((shop) => shop.ownerId === player.id)
      .length;
    player.stats = `${lotCount} 地块 · ${shopCount} 商铺`;
  });
}

function normalizeTradeLots(lots) {
  return [...new Set((Array.isArray(lots) ? lots : [])
    .map(Number)
    .filter((id) => Number.isInteger(id) && id >= 1 && id <= 85))]
    .sort((a, b) => a - b);
}

function normalizeTradeShops(shops) {
  const counts = {};
  Object.entries(shops || {}).forEach(([shopId, count]) => {
    const catalogItem = SHOP_TYPES.find((shop) => shop.id === shopId);
    const nextCount = Math.max(0, Math.min(12, Math.floor(Number(count) || 0)));
    if (catalogItem && nextCount > 0) {
      counts[shopId] = nextCount;
    }
  });
  return counts;
}

function normalizeTradeCash(value) {
  return Math.max(0, Math.min(TRADE_CASH_LIMIT, Math.floor(Number(value) || 0)));
}

function normalizeTradePayload(payload) {
  return {
    offer: {
      lots: normalizeTradeLots(payload?.offer?.lots),
      shops: normalizeTradeShops(payload?.offer?.shops),
      cash: normalizeTradeCash(payload?.offer?.cash),
    },
    request: {
      lots: normalizeTradeLots(payload?.request?.lots),
      shops: normalizeTradeShops(payload?.request?.shops),
      cash: normalizeTradeCash(payload?.request?.cash),
    },
  };
}

function tradeHasContent(trade) {
  return Boolean(
    trade.offer.lots.length
    || Object.keys(trade.offer.shops).length
    || trade.offer.cash
    || trade.request.lots.length
    || Object.keys(trade.request.shops).length
    || trade.request.cash,
  );
}

function hasLots(game, playerId, lotIds) {
  const owned = new Set((game.ownedLots[playerId] || []).map(Number));
  return lotIds.every((lotId) => owned.has(Number(lotId)));
}

function countShopCards(hand = []) {
  return hand.reduce((counts, shop) => {
    counts[shop.id] = (counts[shop.id] || 0) + 1;
    return counts;
  }, {});
}

function hasShopCards(hand, requestedCounts) {
  const counts = countShopCards(hand);
  return Object.entries(requestedCounts).every(([shopId, count]) => (counts[shopId] || 0) >= count);
}

function validateTrade(room, trade) {
  const game = room.game;
  const from = room.players.find((player) => player.id === trade.fromId);
  const to = room.players.find((player) => player.id === trade.toId);

  if (!game || !from || !to) return "交易玩家不存在。";
  if (from.id === to.id) return "不能和自己交易。";
  if (!tradeHasContent(trade)) return "交易提议为空。";
  if (!hasLots(game, from.id, trade.offer.lots)) return `${from.name}已经没有这些地块。`;
  if (!hasLots(game, to.id, trade.request.lots)) return `${to.name}已经没有这些地块。`;
  if (!hasShopCards(game.shopDrafts[from.id] || [], trade.offer.shops)) return `${from.name}手上店铺不足。`;
  if (!hasShopCards(game.shopDrafts[to.id] || [], trade.request.shops)) return `${to.name}手上店铺不足。`;
  return null;
}

function takeShopCards(hand, requestedCounts) {
  const taken = [];

  Object.entries(requestedCounts).forEach(([shopId, count]) => {
    for (let index = 0; index < count; index += 1) {
      const shopIndex = hand.findIndex((shop) => shop.id === shopId);
      if (shopIndex >= 0) {
        taken.push(hand.splice(shopIndex, 1)[0]);
      }
    }
  });

  return taken;
}

function transferLots(room, fromId, toId, lotIds) {
  if (!lotIds.length) return;

  const fromLots = new Set((room.game.ownedLots[fromId] || []).map(Number));
  const toLots = new Set((room.game.ownedLots[toId] || []).map(Number));
  const toPlayer = room.players.find((player) => player.id === toId);

  lotIds.forEach((lotId) => {
    fromLots.delete(lotId);
    toLots.add(lotId);
    if (room.game.placedShops?.[lotId]) {
      room.game.placedShops[lotId].ownerId = toId;
      room.game.placedShops[lotId].ownerName = toPlayer?.name || "玩家";
    }
  });

  room.game.ownedLots[fromId] = [...fromLots].sort((a, b) => a - b);
  room.game.ownedLots[toId] = [...toLots].sort((a, b) => a - b);
}

function applyTrade(room, trade) {
  const error = validateTrade(room, trade);
  if (error) return error;

  const from = room.players.find((player) => player.id === trade.fromId);
  const to = room.players.find((player) => player.id === trade.toId);
  const fromHand = room.game.shopDrafts[from.id] || [];
  const toHand = room.game.shopDrafts[to.id] || [];

  transferLots(room, from.id, to.id, trade.offer.lots);
  transferLots(room, to.id, from.id, trade.request.lots);

  const offeredShops = takeShopCards(fromHand, trade.offer.shops);
  const requestedShops = takeShopCards(toHand, trade.request.shops);
  room.game.shopDrafts[from.id] = [...fromHand, ...requestedShops];
  room.game.shopDrafts[to.id] = [...toHand, ...offeredShops];

  from.cash = (from.cash ?? 5) - trade.offer.cash + trade.request.cash;
  to.cash = (to.cash ?? 5) + trade.offer.cash - trade.request.cash;

  updatePlayerStats(room);
  return null;
}

function shopCountsToText(shops) {
  return Object.entries(shops || {})
    .map(([shopId, count]) => {
      const shop = SHOP_TYPES.find((item) => item.id === shopId);
      return `${shop?.name || shopId}x${count}`;
    })
    .join("、");
}

function tradeSideText(side) {
  const bits = [];
  if (side.lots.length) bits.push(`地块 ${side.lots.join("、")}`);
  const shops = shopCountsToText(side.shops);
  if (shops) bits.push(`店铺 ${shops}`);
  if (side.cash) bits.push(`现金 ${side.cash}万`);
  return bits.join("；") || "无";
}

function publicTrade(room, trade) {
  const from = room.players.find((player) => player.id === trade.fromId);
  const to = room.players.find((player) => player.id === trade.toId);
  return {
    id: trade.id,
    fromId: trade.fromId,
    toId: trade.toId,
    fromName: from?.name || "玩家",
    toName: to?.name || "玩家",
    offer: trade.offer,
    request: trade.request,
    text: `${from?.name || "玩家"}给出：${tradeSideText(trade.offer)}；想要：${tradeSideText(trade.request)}`,
  };
}

function emitGameStarted(room) {
  room.players.forEach((player) => {
    io.to(player.id).emit("gameStarted", {
      room: publicRoom(room),
      game: personalGameState(room, player.id),
    });
  });
}

function emitGameState(room) {
  room.players.forEach((player) => {
    io.to(player.id).emit("gameState", {
      room: publicRoom(room),
      game: personalGameState(room, player.id),
    });
  });
}

function emitRoom(room) {
  io.to(room.code).emit("roomState", publicRoom(room));
}

function leaveCurrentRoom(socket) {
  const code = socket.data.roomCode;
  if (!code) return;

  const room = rooms.get(code);
  socket.leave(code);
  socket.data.roomCode = null;

  if (!room) return;

  if (room.phase !== "waiting" && room.game) {
    const player = room.players.find((item) => item.id === socket.id);
    if (player) {
      player.connected = false;
      emitRoom(room);
    }
    return;
  }

  room.players = room.players.filter((player) => player.id !== socket.id);

  if (room.players.length === 0) {
    rooms.delete(code);
    return;
  }

  if (room.hostId === socket.id) {
    room.hostId = room.players[0].id;
  }

  emitRoom(room);
}

io.on("connection", (socket) => {
  socket.on("resumeRoom", ({ code, playerId }, reply) => {
    const room = rooms.get(String(code || "").trim().toUpperCase());
    const oldId = String(playerId || "");

    if (!room || !oldId) {
      reply?.({ ok: false, error: "无法恢复房间。" });
      return;
    }

    const player = transferPlayerSocket(room, oldId, socket);
    if (!player) {
      reply?.({ ok: false, error: "没有找到原来的玩家。" });
      return;
    }

    const payload = {
      ok: true,
      selfId: socket.id,
      room: publicRoom(room),
      game: personalGameState(room, socket.id),
    };
    reply?.(payload);
    emitRoom(room);
    emitGameState(room);
  });

  socket.on("createRoom", ({ nickname, playerCount }, reply) => {
    leaveCurrentRoom(socket);

    const count = Number(playerCount);
    if (![3, 4].includes(count)) {
      reply?.({ ok: false, error: "只能创建 3 人局或 4 人局。" });
      return;
    }

    const code = makeRoomCode();
    const room = {
      code,
      playerCount: count,
      hostId: socket.id,
      phase: "waiting",
      players: [
        {
          id: socket.id,
          name: String(nickname || "玩家").slice(0, 8),
          color: colors[0],
          stats: "0 地块 · 0 商铺",
        },
      ],
    };
    room.players[0].name = normalizePlayerName(nickname, room);

    rooms.set(code, room);
    socket.join(code);
    socket.data.roomCode = code;

    reply?.({ ok: true, selfId: socket.id, room: publicRoom(room) });
    emitRoom(room);
  });

  socket.on("joinRoom", ({ nickname, code }, reply) => {
    leaveCurrentRoom(socket);

    const roomCode = String(code || "").trim().toUpperCase();
    const room = rooms.get(roomCode);

    if (!room) {
      reply?.({ ok: false, error: "没有找到这个房间。" });
      return;
    }

    if (room.phase !== "waiting") {
      reply?.({ ok: false, error: "这局已经开始了。" });
      return;
    }

    if (room.players.length >= room.playerCount) {
      reply?.({ ok: false, error: "房间已经满员。" });
      return;
    }

    room.players.push({
      id: socket.id,
      name: normalizePlayerName(nickname, room),
      color: colors[room.players.length],
      stats: "0 地块 · 0 商铺",
    });

    socket.join(room.code);
    socket.data.roomCode = room.code;

    reply?.({ ok: true, selfId: socket.id, room: publicRoom(room) });
    emitRoom(room);
  });

  socket.on("startGame", ({ code }, reply) => {
    const room = rooms.get(String(code || "").trim().toUpperCase());

    if (!room) {
      reply?.({ ok: false, error: "房间不存在。" });
      return;
    }

    if (room.hostId !== socket.id) {
      reply?.({ ok: false, error: "只有房主可以开始游戏。" });
      return;
    }

    if (room.players.length !== room.playerCount) {
      reply?.({ ok: false, error: "人数未满，暂时不能开始。" });
      return;
    }

    room.phase = "playing";
    room.starterId = room.players[Math.floor(Math.random() * room.players.length)].id;
    room.players.forEach((player) => {
      player.cash = 5;
    });
    room.game = createGame(room);
    const starter = room.players.find((player) => player.id === room.starterId);
    addGameEvent(room, `游戏开始，${starter?.name || "玩家"}成为起始玩家。`, "system");
    reply?.({ ok: true, room: publicRoom(room), game: personalGameState(room, socket.id) });
    emitGameStarted(room);
  });

  socket.on("confirmBuildingDraft", ({ code, kept }, reply) => {
    const room = rooms.get(String(code || "").trim().toUpperCase());

    if (!room || !room.game) {
      reply?.({ ok: false, error: "房间不存在。" });
      return;
    }

    if (room.game.phase !== "building-draft") {
      reply?.({ ok: false, error: "现在不能确认地块。" });
      return;
    }

    const draft = room.game.buildingDrafts[socket.id] || [];
    const selected = [...new Set((kept || []).map(Number))]
      .filter((id) => draft.includes(id))
      .sort((a, b) => a - b);

    if (selected.length !== room.game.buildingKeepCount) {
      reply?.({ ok: false, error: `需要保留 ${room.game.buildingKeepCount} 张地块。` });
      return;
    }

    room.game.buildingSelections[socket.id] = selected;
    room.game.buildingReady[socket.id] = true;

    const allReady = room.players.every((item) => room.game.buildingReady[item.id]);

    if (allReady) {
      room.players.forEach((player) => {
        const owned = new Set(room.game.ownedLots[player.id] || []);
        (room.game.buildingSelections[player.id] || []).forEach((lotId) => owned.add(lotId));
        room.game.ownedLots[player.id] = [...owned].sort((a, b) => a - b);
        addGameEvent(room, `${player.name}保留地块 ${room.game.buildingSelections[player.id].join("、")}。`, "lot");
      });
      updatePlayerStats(room);
      room.game.phase = "building-reveal";
    }

    reply?.({ ok: true, room: publicRoom(room), game: personalGameState(room, socket.id) });
    if (allReady) {
      emitGameState(room);
    } else {
      emitRoom(room);
    }

    if (allReady) {
      setTimeout(() => {
        if (!rooms.has(room.code) || room.game?.phase !== "building-reveal") return;

        room.game.phase = "shop-draft";
        room.game.shopReady = {};
        room.players.forEach((item) => {
          const existing = room.game.shopDrafts[item.id] || [];
          room.game.shopDrafts[item.id] = [
            ...existing,
            ...room.game.shopDeck.splice(0, room.game.shopTileDrawCount),
          ];
        });
        addGameEvent(room, `第${room.game.round}轮店铺已发放。`, "shop");
        emitGameState(room);
      }, 1800);
    }
  });

  socket.on("placeShopTile", ({ code, lotId, shopId }, reply) => {
    const room = rooms.get(String(code || "").trim().toUpperCase());

    if (!room || !room.game) {
      reply?.({ ok: false, error: "房间不存在。" });
      return;
    }

    if (room.game.phase !== "shop-draft") {
      reply?.({ ok: false, error: "现在不能放置店铺。" });
      return;
    }

    if (room.game.shopReady[socket.id]) {
      reply?.({ ok: false, error: "你已经确认本轮店铺放置。" });
      return;
    }

    const targetLotId = Number(lotId);
    const ownedLots = (room.game.ownedLots[socket.id] || []).map(Number);
    if (!ownedLots.includes(targetLotId)) {
      reply?.({ ok: false, error: "只能放在你自己的地块上。" });
      return;
    }

    if (room.game.placedShops[targetLotId]) {
      reply?.({ ok: false, error: "这个地块已经有店铺。" });
      return;
    }

    const hand = room.game.shopDrafts[socket.id] || [];
    const shopIndex = hand.findIndex((shop) => shop.id === shopId);
    if (shopIndex < 0) {
      reply?.({ ok: false, error: "你手上没有这个店铺。" });
      return;
    }

    const [shop] = hand.splice(shopIndex, 1);
    const player = room.players.find((item) => item.id === socket.id);
    room.game.placedShops[targetLotId] = {
      id: shop.id,
      name: shop.name,
      mark: shop.mark,
      image: shop.image,
      size: shop.size,
      ownerId: socket.id,
      ownerName: player?.name || "玩家",
    };
    addGameEvent(room, `${player?.name || "玩家"}在${targetLotId}号地块放置${shop.name}。`, "shop");
    updatePlayerStats(room);

    reply?.({ ok: true, room: publicRoom(room), game: personalGameState(room, socket.id) });
    emitGameState(room);
  });

  socket.on("confirmShopPlacement", ({ code }, reply) => {
    const room = rooms.get(String(code || "").trim().toUpperCase());

    if (!room || !room.game) {
      reply?.({ ok: false, error: "房间不存在。" });
      return;
    }

    if (room.game.phase !== "shop-draft") {
      reply?.({ ok: false, error: "现在不能确认店铺放置。" });
      return;
    }

    room.game.shopReady[socket.id] = true;
    const allReady = room.players.every((item) => room.game.shopReady[item.id]);
    if (allReady) {
      settleIncome(room);
      room.players.forEach((player) => {
        const income = (room.game.incomeRows || [])
          .filter((row) => row.playerId === player.id)
          .reduce((total, row) => total + row.income, 0);
        addGameEvent(room, `${player.name}第${room.game.round}轮收入 +${formatMoney(income)}。`, "income");
      });
      room.game.phase = "income";
    }

    reply?.({ ok: true, room: publicRoom(room), game: personalGameState(room, socket.id) });
    if (allReady) {
      emitGameState(room);
    } else {
      emitRoom(room);
    }
  });

  socket.on("createTradeProposal", ({ code, targetId, trade }, reply) => {
    const room = rooms.get(String(code || "").trim().toUpperCase());

    if (!room || !room.game) {
      reply?.({ ok: false, error: "房间不存在。" });
      return;
    }

    if (room.phase !== "playing") {
      reply?.({ ok: false, error: "现在还不能交易。" });
      return;
    }

    const target = room.players.find((player) => player.id === targetId);
    if (!target || target.id === socket.id) {
      reply?.({ ok: false, error: "请选择有效的交易对象。" });
      return;
    }

    const normalizedTrade = {
      id: `T${room.game.tradeSeq || 1}`,
      fromId: socket.id,
      toId: target.id,
      ...normalizeTradePayload(trade),
      createdAt: Date.now(),
    };
    room.game.pendingTrades ||= {};
    room.game.tradeSeq = (room.game.tradeSeq || 1) + 1;

    const error = validateTrade(room, normalizedTrade);
    if (error) {
      reply?.({
        ok: false,
        error,
        room: publicRoom(room),
        game: personalGameState(room, socket.id),
      });
      return;
    }

    room.game.pendingTrades[normalizedTrade.id] = normalizedTrade;
    const publicProposal = publicTrade(room, normalizedTrade);
    io.to(target.id).emit("tradeProposal", publicProposal);
    reply?.({ ok: true, proposal: publicProposal });
  });

  socket.on("respondTradeProposal", ({ code, tradeId, accepted }, reply) => {
    const room = rooms.get(String(code || "").trim().toUpperCase());

    if (!room || !room.game) {
      reply?.({ ok: false, error: "房间不存在。" });
      return;
    }

    room.game.pendingTrades ||= {};
    const trade = room.game.pendingTrades[tradeId];
    if (!trade) {
      reply?.({ ok: false, error: "这笔交易已经失效。" });
      return;
    }

    if (trade.toId !== socket.id) {
      reply?.({ ok: false, error: "只有交易对象可以处理这笔交易。" });
      return;
    }

    const proposal = publicTrade(room, trade);
    delete room.game.pendingTrades[trade.id];

    if (!accepted) {
      io.to(trade.fromId).emit("tradeResolved", {
        accepted: false,
        text: `${proposal.toName}拒绝了交易。`,
        proposal,
      });
      reply?.({ ok: true, room: publicRoom(room), game: personalGameState(room, socket.id) });
      return;
    }

    const error = applyTrade(room, trade);
    if (error) {
      io.to(trade.fromId).emit("tradeResolved", {
        accepted: false,
        text: `交易失败：${error}`,
        proposal,
      });
      reply?.({ ok: false, error });
      return;
    }

    addGameEvent(room, `交易完成：${proposal.text}`, "trade");
    reply?.({ ok: true, room: publicRoom(room), game: personalGameState(room, socket.id) });
    emitGameState(room);
    io.to(room.code).emit("tradeResolved", {
      accepted: true,
      text: `交易完成：${proposal.text}`,
      proposal,
    });
  });

  socket.on("agreeNextRound", ({ code }, reply) => {
    const room = rooms.get(String(code || "").trim().toUpperCase());

    if (!room || !room.game) {
      reply?.({ ok: false, error: "房间不存在。" });
      return;
    }

    if (room.game.phase !== "income") {
      reply?.({ ok: false, error: "现在还不能进入下一轮。" });
      return;
    }

    room.game.nextRoundReady[socket.id] = true;
    const allReady = room.players.every((item) => room.game.nextRoundReady[item.id]);

    if (allReady) {
      if (room.game.round >= 6) {
        room.game.phase = "final";
        addGameEvent(room, "游戏结束，进入最终结算。", "system");
      } else {
        advanceToNextRound(room);
        addGameEvent(room, `进入第${room.game.round}轮。`, "system");
      }
    }

    reply?.({ ok: true, room: publicRoom(room), game: personalGameState(room, socket.id) });
    if (allReady) {
      emitGameState(room);
    } else {
      emitRoom(room);
    }
  });

  socket.on("disconnect", () => {
    leaveCurrentRoom(socket);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Neon Tangbu prototype running at http://127.0.0.1:${PORT}`);
  getLanUrls().forEach((url) => {
    console.log(`Phone on same Wi-Fi can try: ${url}`);
  });
});
