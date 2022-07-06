var _a;
export var TileType;
(function (TileType) {
    TileType[TileType["grass"] = 0] = "grass";
    TileType[TileType["dirt"] = 1] = "dirt";
    TileType[TileType["water"] = 2] = "water";
    TileType[TileType["sludge"] = 3] = "sludge";
    TileType[TileType["rock"] = 4] = "rock";
    TileType[TileType["sand"] = 5] = "sand";
    TileType[TileType["sandstone"] = 6] = "sandstone";
    TileType[TileType["snow"] = 7] = "snow";
    TileType[TileType["ice"] = 8] = "ice";
    TileType[TileType["magma"] = 9] = "magma";
    TileType[TileType["lava"] = 10] = "lava";
})(TileType || (TileType = {}));
var DEFAULT_FRICTION = 0.5;
export var TILE_TYPE_INFO_RECORD = (_a = {},
    _a[TileType.grass] = {
        textureSource: "grass.jpg",
        friction: DEFAULT_FRICTION
    },
    _a[TileType.dirt] = {
        textureSource: "grass.jpg",
        friction: DEFAULT_FRICTION
    },
    _a[TileType.water] = {
        textureSource: "grass.jpg",
        friction: DEFAULT_FRICTION
    },
    _a[TileType.sludge] = {
        textureSource: "grass.jpg",
        friction: DEFAULT_FRICTION
    },
    _a[TileType.rock] = {
        textureSource: "grass.jpg",
        friction: DEFAULT_FRICTION
    },
    _a[TileType.sand] = {
        textureSource: "grass.jpg",
        friction: DEFAULT_FRICTION
    },
    _a[TileType.sandstone] = {
        textureSource: "grass.jpg",
        friction: DEFAULT_FRICTION
    },
    _a[TileType.snow] = {
        textureSource: "grass.jpg",
        friction: 0.7
    },
    _a[TileType.ice] = {
        textureSource: "grass.jpg",
        friction: 0.15
    },
    _a[TileType.magma] = {
        textureSource: "grass.jpg",
        friction: DEFAULT_FRICTION
    },
    _a[TileType.lava] = {
        textureSource: "grass.jpg",
        friction: 0.8
    },
    _a);
var Tile = /** @class */ (function () {
    function Tile(_a) {
        var type = _a.type, biome = _a.biome, isWall = _a.isWall;
        this.type = type;
        this.biome = biome;
        this.isWall = isWall;
    }
    return Tile;
}());
export default Tile;
