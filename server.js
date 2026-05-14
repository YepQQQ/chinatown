const express = require("express");
const http = require("http");
const os = require("os");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 4173;
const HOST = "0.0.0.0";

const colors = ["red", "cyan", "gold", "green"];
const rooms = new Map();

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

function createShopDeck() {
  return shuffle(SHOP_TYPES.flatMap((shop) => (
    Array.from({ length: shop.size + 3 }, (_, index) => ({ ...shop, cardId: `${shop.id}-${index + 1}` }))
  )));
}

function publicBuildingLots(room) {
  if (!room.game) return [];

  return room.players.flatMap((player) => (
    (room.game.buildingSelections[player.id] || []).map((lotId) => ({
      lotId,
      playerId: player.id,
      name: player.name,
      color: player.color,
    }))
  ));
}

function createGame(room) {
  const buildingDeck = shuffle(Array.from({ length: 85 }, (_, index) => index + 1));
  const businessOutlookDeck = shuffle([
    "seafood",
    "herbs",
    "workwear",
    "restaurant",
    "laundry",
    "sports",
    "tailor",
    "fireworks",
    "antiques",
  ]).slice(0, 6);
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
    businessOutlookDeck,
    buildingDrafts,
    buildingSelections: {},
    shopDrafts: {},
    buildingKeepCount: buildingRule.keep,
    buildingDealCount: buildingRule.deal,
    shopTileDrawCount: SHOP_TILE_RULES[room.playerCount][0],
  };
}

function personalGameState(room, playerId) {
  if (!room.game) return null;

  return {
    round: room.game.round,
    phase: room.game.phase,
    buildingCards: room.game.buildingSelections[playerId] || room.game.buildingDrafts[playerId] || [],
    keptBuildingIds: room.game.buildingSelections[playerId] || [],
    buildingConfirmed: Boolean(room.game.buildingSelections[playerId]),
    buildingReadyCount: Object.keys(room.game.buildingSelections).length,
    buildingKeepCount: room.game.buildingKeepCount,
    buildingDealCount: room.game.buildingDealCount,
    publicLots: publicBuildingLots(room),
    shopCards: room.game.shopDrafts[playerId] || [],
    shopTileDrawCount: room.game.shopTileDrawCount,
    deckRemaining: room.game.buildingDeck.length,
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
      name: String(nickname || "玩家").slice(0, 8),
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
    room.game = createGame(room);
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

    const player = room.players.find((item) => item.id === socket.id);
    if (player) {
      player.stats = `${selected.length} 地块 · 0 商铺`;
    }

    const allReady = room.players.every((item) => room.game.buildingSelections[item.id]);

    if (allReady) {
      room.game.phase = "building-reveal";
    }

    reply?.({ ok: true, room: publicRoom(room), game: personalGameState(room, socket.id) });
    emitGameState(room);

    if (allReady) {
      setTimeout(() => {
        if (!rooms.has(room.code) || room.game?.phase !== "building-reveal") return;

        room.game.phase = "shop-draft";
        room.players.forEach((item) => {
          room.game.shopDrafts[item.id] = room.game.shopDeck.splice(0, room.game.shopTileDrawCount);
        });
        emitGameState(room);
      }, 1800);
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
