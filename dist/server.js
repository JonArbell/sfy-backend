var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// node_modules/.pnpm/postgres-array@3.0.4/node_modules/postgres-array/index.js
var require_postgres_array = __commonJS({
  "node_modules/.pnpm/postgres-array@3.0.4/node_modules/postgres-array/index.js"(exports) {
    "use strict";
    var BACKSLASH = "\\";
    var DQUOT = '"';
    var LBRACE = "{";
    var RBRACE = "}";
    var LBRACKET = "[";
    var EQUALS = "=";
    var COMMA = ",";
    var NULL_STRING = "NULL";
    function makeParseArrayWithTransform(transform) {
      const haveTransform = transform != null;
      return function parseArray3(str) {
        const rbraceIndex = str.length - 1;
        if (rbraceIndex === 1) {
          return [];
        }
        if (str[rbraceIndex] !== RBRACE) {
          throw new Error("Invalid array text - must end with }");
        }
        let position = 0;
        if (str[position] === LBRACKET) {
          position = str.indexOf(EQUALS) + 1;
        }
        if (str[position++] !== LBRACE) {
          throw new Error("Invalid array text - must start with {");
        }
        const output = [];
        let current = output;
        const stack = [];
        let currentStringStart = position;
        let currentString = "";
        let expectValue = true;
        for (; position < rbraceIndex; ++position) {
          let char = str[position];
          if (char === DQUOT) {
            currentStringStart = ++position;
            let dquot = str.indexOf(DQUOT, currentStringStart);
            let backSlash = str.indexOf(BACKSLASH, currentStringStart);
            while (backSlash !== -1 && backSlash < dquot) {
              position = backSlash;
              const part2 = str.slice(currentStringStart, position);
              currentString += part2;
              currentStringStart = ++position;
              if (dquot === position++) {
                dquot = str.indexOf(DQUOT, position);
              }
              backSlash = str.indexOf(BACKSLASH, position);
            }
            position = dquot;
            const part = str.slice(currentStringStart, position);
            currentString += part;
            current.push(haveTransform ? transform(currentString) : currentString);
            currentString = "";
            expectValue = false;
          } else if (char === LBRACE) {
            const newArray = [];
            current.push(newArray);
            stack.push(current);
            current = newArray;
            currentStringStart = position + 1;
            expectValue = true;
          } else if (char === COMMA) {
            expectValue = true;
          } else if (char === RBRACE) {
            expectValue = false;
            const arr = stack.pop();
            if (arr === void 0) {
              throw new Error("Invalid array text - too many '}'");
            }
            current = arr;
          } else if (expectValue) {
            currentStringStart = position;
            while ((char = str[position]) !== COMMA && char !== RBRACE && position < rbraceIndex) {
              ++position;
            }
            const part = str.slice(currentStringStart, position--);
            current.push(
              part === NULL_STRING ? null : haveTransform ? transform(part) : part
            );
            expectValue = false;
          } else {
            throw new Error("Was expecting delimeter");
          }
        }
        return output;
      };
    }
    var parseArray2 = makeParseArrayWithTransform();
    exports.parse = (source, transform) => transform != null ? makeParseArrayWithTransform(transform)(source) : parseArray2(source);
  }
});

// src/server.ts
import cors from "cors";

// src/app.ts
import express from "express";

// node_modules/.pnpm/@prisma+debug@7.2.0/node_modules/@prisma/debug/dist/index.mjs
var __defProp2 = Object.defineProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp2(target, name2, { get: all[name2], enumerable: true });
};
var colors_exports = {};
__export(colors_exports, {
  $: () => $,
  bgBlack: () => bgBlack,
  bgBlue: () => bgBlue,
  bgCyan: () => bgCyan,
  bgGreen: () => bgGreen,
  bgMagenta: () => bgMagenta,
  bgRed: () => bgRed,
  bgWhite: () => bgWhite,
  bgYellow: () => bgYellow,
  black: () => black,
  blue: () => blue,
  bold: () => bold,
  cyan: () => cyan,
  dim: () => dim,
  gray: () => gray,
  green: () => green,
  grey: () => grey,
  hidden: () => hidden,
  inverse: () => inverse,
  italic: () => italic,
  magenta: () => magenta,
  red: () => red,
  reset: () => reset,
  strikethrough: () => strikethrough,
  underline: () => underline,
  white: () => white,
  yellow: () => yellow
});
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
  isTTY = process.stdout && process.stdout.isTTY;
}
var $ = {
  enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
};
function init(x, y) {
  let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
  let open = `\x1B[${x}m`, close = `\x1B[${y}m`;
  return function(txt) {
    if (!$.enabled || txt == null) return txt;
    return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
  };
}
var reset = init(0, 0);
var bold = init(1, 22);
var dim = init(2, 22);
var italic = init(3, 23);
var underline = init(4, 24);
var inverse = init(7, 27);
var hidden = init(8, 28);
var strikethrough = init(9, 29);
var black = init(30, 39);
var red = init(31, 39);
var green = init(32, 39);
var yellow = init(33, 39);
var blue = init(34, 39);
var magenta = init(35, 39);
var cyan = init(36, 39);
var white = init(37, 39);
var gray = init(90, 39);
var grey = init(90, 39);
var bgBlack = init(40, 49);
var bgRed = init(41, 49);
var bgGreen = init(42, 49);
var bgYellow = init(43, 49);
var bgBlue = init(44, 49);
var bgMagenta = init(45, 49);
var bgCyan = init(46, 49);
var bgWhite = init(47, 49);
var MAX_ARGS_HISTORY = 100;
var COLORS = ["green", "yellow", "blue", "magenta", "cyan", "red"];
var argsHistory = [];
var lastTimestamp = Date.now();
var lastColor = 0;
var processEnv = typeof process !== "undefined" ? process.env : {};
globalThis.DEBUG ?? (globalThis.DEBUG = processEnv.DEBUG ?? "");
globalThis.DEBUG_COLORS ?? (globalThis.DEBUG_COLORS = processEnv.DEBUG_COLORS ? processEnv.DEBUG_COLORS === "true" : true);
var topProps = {
  enable(namespace) {
    if (typeof namespace === "string") {
      globalThis.DEBUG = namespace;
    }
  },
  disable() {
    const prev = globalThis.DEBUG;
    globalThis.DEBUG = "";
    return prev;
  },
  // this is the core logic to check if logging should happen or not
  enabled(namespace) {
    const listenedNamespaces = globalThis.DEBUG.split(",").map((s) => {
      return s.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
    });
    const isListened = listenedNamespaces.some((listenedNamespace) => {
      if (listenedNamespace === "" || listenedNamespace[0] === "-") return false;
      return namespace.match(RegExp(listenedNamespace.split("*").join(".*") + "$"));
    });
    const isExcluded = listenedNamespaces.some((listenedNamespace) => {
      if (listenedNamespace === "" || listenedNamespace[0] !== "-") return false;
      return namespace.match(RegExp(listenedNamespace.slice(1).split("*").join(".*") + "$"));
    });
    return isListened && !isExcluded;
  },
  log: (...args) => {
    const [namespace, format, ...rest] = args;
    const logWithFormatting = console.warn ?? console.log;
    logWithFormatting(`${namespace} ${format}`, ...rest);
  },
  formatters: {}
  // not implemented
};
function debugCreate(namespace) {
  const instanceProps = {
    color: COLORS[lastColor++ % COLORS.length],
    enabled: topProps.enabled(namespace),
    namespace,
    log: topProps.log,
    extend: () => {
    }
    // not implemented
  };
  const debugCall = (...args) => {
    const { enabled, namespace: namespace2, color, log } = instanceProps;
    if (args.length !== 0) {
      argsHistory.push([namespace2, ...args]);
    }
    if (argsHistory.length > MAX_ARGS_HISTORY) {
      argsHistory.shift();
    }
    if (topProps.enabled(namespace2) || enabled) {
      const stringArgs = args.map((arg) => {
        if (typeof arg === "string") {
          return arg;
        }
        return safeStringify(arg);
      });
      const ms = `+${Date.now() - lastTimestamp}ms`;
      lastTimestamp = Date.now();
      if (globalThis.DEBUG_COLORS) {
        log(colors_exports[color](bold(namespace2)), ...stringArgs, colors_exports[color](ms));
      } else {
        log(namespace2, ...stringArgs, ms);
      }
    }
  };
  return new Proxy(debugCall, {
    get: (_, prop) => instanceProps[prop],
    set: (_, prop, value) => instanceProps[prop] = value
  });
}
var Debug = new Proxy(debugCreate, {
  get: (_, prop) => topProps[prop],
  set: (_, prop, value) => topProps[prop] = value
});
function safeStringify(value, indent = 2) {
  const cache = /* @__PURE__ */ new Set();
  return JSON.stringify(
    value,
    (key, value2) => {
      if (typeof value2 === "object" && value2 !== null) {
        if (cache.has(value2)) {
          return `[Circular *]`;
        }
        cache.add(value2);
      } else if (typeof value2 === "bigint") {
        return value2.toString();
      }
      return value2;
    },
    indent
  );
}

// node_modules/.pnpm/@prisma+driver-adapter-utils@7.2.0/node_modules/@prisma/driver-adapter-utils/dist/index.mjs
var DriverAdapterError = class extends Error {
  constructor(payload) {
    super(typeof payload["message"] === "string" ? payload["message"] : payload.kind);
    __publicField(this, "name", "DriverAdapterError");
    __publicField(this, "cause");
    this.cause = payload;
  }
};
var debug = Debug("driver-adapter-utils");
var ColumnTypeEnum = {
  // Scalars
  Int32: 0,
  Int64: 1,
  Float: 2,
  Double: 3,
  Numeric: 4,
  Boolean: 5,
  Character: 6,
  Text: 7,
  Date: 8,
  Time: 9,
  DateTime: 10,
  Json: 11,
  Enum: 12,
  Bytes: 13,
  Set: 14,
  Uuid: 15,
  // Arrays
  Int32Array: 64,
  Int64Array: 65,
  FloatArray: 66,
  DoubleArray: 67,
  NumericArray: 68,
  BooleanArray: 69,
  CharacterArray: 70,
  TextArray: 71,
  DateArray: 72,
  TimeArray: 73,
  DateTimeArray: 74,
  JsonArray: 75,
  EnumArray: 76,
  BytesArray: 77,
  UuidArray: 78,
  // Custom
  UnknownNumber: 128
};
var mockAdapterErrors = {
  queryRaw: new Error("Not implemented: queryRaw"),
  executeRaw: new Error("Not implemented: executeRaw"),
  startTransaction: new Error("Not implemented: startTransaction"),
  executeScript: new Error("Not implemented: executeScript"),
  dispose: new Error("Not implemented: dispose")
};

// node_modules/.pnpm/@prisma+adapter-pg@7.2.0/node_modules/@prisma/adapter-pg/dist/index.mjs
import pg2 from "pg";
var import_postgres_array = __toESM(require_postgres_array(), 1);
import pg from "pg";
var name = "@prisma/adapter-pg";
var FIRST_NORMAL_OBJECT_ID = 16384;
var { types } = pg;
var { builtins: ScalarColumnType, getTypeParser } = types;
var AdditionalScalarColumnType = {
  NAME: 19
};
var ArrayColumnType = {
  BIT_ARRAY: 1561,
  BOOL_ARRAY: 1e3,
  BYTEA_ARRAY: 1001,
  BPCHAR_ARRAY: 1014,
  CHAR_ARRAY: 1002,
  CIDR_ARRAY: 651,
  DATE_ARRAY: 1182,
  FLOAT4_ARRAY: 1021,
  FLOAT8_ARRAY: 1022,
  INET_ARRAY: 1041,
  INT2_ARRAY: 1005,
  INT4_ARRAY: 1007,
  INT8_ARRAY: 1016,
  JSONB_ARRAY: 3807,
  JSON_ARRAY: 199,
  MONEY_ARRAY: 791,
  NUMERIC_ARRAY: 1231,
  OID_ARRAY: 1028,
  TEXT_ARRAY: 1009,
  TIMESTAMP_ARRAY: 1115,
  TIMESTAMPTZ_ARRAY: 1185,
  TIME_ARRAY: 1183,
  UUID_ARRAY: 2951,
  VARBIT_ARRAY: 1563,
  VARCHAR_ARRAY: 1015,
  XML_ARRAY: 143
};
var _a;
var UnsupportedNativeDataType = (_a = class extends Error {
  constructor(code) {
    super();
    __publicField(this, "type");
    this.type = _a.typeNames[code] || "Unknown";
    this.message = `Unsupported column type ${this.type}`;
  }
}, // map of type codes to type names
__publicField(_a, "typeNames", {
  16: "bool",
  17: "bytea",
  18: "char",
  19: "name",
  20: "int8",
  21: "int2",
  22: "int2vector",
  23: "int4",
  24: "regproc",
  25: "text",
  26: "oid",
  27: "tid",
  28: "xid",
  29: "cid",
  30: "oidvector",
  32: "pg_ddl_command",
  71: "pg_type",
  75: "pg_attribute",
  81: "pg_proc",
  83: "pg_class",
  114: "json",
  142: "xml",
  194: "pg_node_tree",
  269: "table_am_handler",
  325: "index_am_handler",
  600: "point",
  601: "lseg",
  602: "path",
  603: "box",
  604: "polygon",
  628: "line",
  650: "cidr",
  700: "float4",
  701: "float8",
  705: "unknown",
  718: "circle",
  774: "macaddr8",
  790: "money",
  829: "macaddr",
  869: "inet",
  1033: "aclitem",
  1042: "bpchar",
  1043: "varchar",
  1082: "date",
  1083: "time",
  1114: "timestamp",
  1184: "timestamptz",
  1186: "interval",
  1266: "timetz",
  1560: "bit",
  1562: "varbit",
  1700: "numeric",
  1790: "refcursor",
  2202: "regprocedure",
  2203: "regoper",
  2204: "regoperator",
  2205: "regclass",
  2206: "regtype",
  2249: "record",
  2275: "cstring",
  2276: "any",
  2277: "anyarray",
  2278: "void",
  2279: "trigger",
  2280: "language_handler",
  2281: "internal",
  2283: "anyelement",
  2287: "_record",
  2776: "anynonarray",
  2950: "uuid",
  2970: "txid_snapshot",
  3115: "fdw_handler",
  3220: "pg_lsn",
  3310: "tsm_handler",
  3361: "pg_ndistinct",
  3402: "pg_dependencies",
  3500: "anyenum",
  3614: "tsvector",
  3615: "tsquery",
  3642: "gtsvector",
  3734: "regconfig",
  3769: "regdictionary",
  3802: "jsonb",
  3831: "anyrange",
  3838: "event_trigger",
  3904: "int4range",
  3906: "numrange",
  3908: "tsrange",
  3910: "tstzrange",
  3912: "daterange",
  3926: "int8range",
  4072: "jsonpath",
  4089: "regnamespace",
  4096: "regrole",
  4191: "regcollation",
  4451: "int4multirange",
  4532: "nummultirange",
  4533: "tsmultirange",
  4534: "tstzmultirange",
  4535: "datemultirange",
  4536: "int8multirange",
  4537: "anymultirange",
  4538: "anycompatiblemultirange",
  4600: "pg_brin_bloom_summary",
  4601: "pg_brin_minmax_multi_summary",
  5017: "pg_mcv_list",
  5038: "pg_snapshot",
  5069: "xid8",
  5077: "anycompatible",
  5078: "anycompatiblearray",
  5079: "anycompatiblenonarray",
  5080: "anycompatiblerange"
}), _a);
function fieldToColumnType(fieldTypeId) {
  switch (fieldTypeId) {
    case ScalarColumnType.INT2:
    case ScalarColumnType.INT4:
      return ColumnTypeEnum.Int32;
    case ScalarColumnType.INT8:
      return ColumnTypeEnum.Int64;
    case ScalarColumnType.FLOAT4:
      return ColumnTypeEnum.Float;
    case ScalarColumnType.FLOAT8:
      return ColumnTypeEnum.Double;
    case ScalarColumnType.BOOL:
      return ColumnTypeEnum.Boolean;
    case ScalarColumnType.DATE:
      return ColumnTypeEnum.Date;
    case ScalarColumnType.TIME:
    case ScalarColumnType.TIMETZ:
      return ColumnTypeEnum.Time;
    case ScalarColumnType.TIMESTAMP:
    case ScalarColumnType.TIMESTAMPTZ:
      return ColumnTypeEnum.DateTime;
    case ScalarColumnType.NUMERIC:
    case ScalarColumnType.MONEY:
      return ColumnTypeEnum.Numeric;
    case ScalarColumnType.JSON:
    case ScalarColumnType.JSONB:
      return ColumnTypeEnum.Json;
    case ScalarColumnType.UUID:
      return ColumnTypeEnum.Uuid;
    case ScalarColumnType.OID:
      return ColumnTypeEnum.Int64;
    case ScalarColumnType.BPCHAR:
    case ScalarColumnType.TEXT:
    case ScalarColumnType.VARCHAR:
    case ScalarColumnType.BIT:
    case ScalarColumnType.VARBIT:
    case ScalarColumnType.INET:
    case ScalarColumnType.CIDR:
    case ScalarColumnType.XML:
    case AdditionalScalarColumnType.NAME:
      return ColumnTypeEnum.Text;
    case ScalarColumnType.BYTEA:
      return ColumnTypeEnum.Bytes;
    case ArrayColumnType.INT2_ARRAY:
    case ArrayColumnType.INT4_ARRAY:
      return ColumnTypeEnum.Int32Array;
    case ArrayColumnType.FLOAT4_ARRAY:
      return ColumnTypeEnum.FloatArray;
    case ArrayColumnType.FLOAT8_ARRAY:
      return ColumnTypeEnum.DoubleArray;
    case ArrayColumnType.NUMERIC_ARRAY:
    case ArrayColumnType.MONEY_ARRAY:
      return ColumnTypeEnum.NumericArray;
    case ArrayColumnType.BOOL_ARRAY:
      return ColumnTypeEnum.BooleanArray;
    case ArrayColumnType.CHAR_ARRAY:
      return ColumnTypeEnum.CharacterArray;
    case ArrayColumnType.BPCHAR_ARRAY:
    case ArrayColumnType.TEXT_ARRAY:
    case ArrayColumnType.VARCHAR_ARRAY:
    case ArrayColumnType.VARBIT_ARRAY:
    case ArrayColumnType.BIT_ARRAY:
    case ArrayColumnType.INET_ARRAY:
    case ArrayColumnType.CIDR_ARRAY:
    case ArrayColumnType.XML_ARRAY:
      return ColumnTypeEnum.TextArray;
    case ArrayColumnType.DATE_ARRAY:
      return ColumnTypeEnum.DateArray;
    case ArrayColumnType.TIME_ARRAY:
      return ColumnTypeEnum.TimeArray;
    case ArrayColumnType.TIMESTAMP_ARRAY:
      return ColumnTypeEnum.DateTimeArray;
    case ArrayColumnType.TIMESTAMPTZ_ARRAY:
      return ColumnTypeEnum.DateTimeArray;
    case ArrayColumnType.JSON_ARRAY:
    case ArrayColumnType.JSONB_ARRAY:
      return ColumnTypeEnum.JsonArray;
    case ArrayColumnType.BYTEA_ARRAY:
      return ColumnTypeEnum.BytesArray;
    case ArrayColumnType.UUID_ARRAY:
      return ColumnTypeEnum.UuidArray;
    case ArrayColumnType.INT8_ARRAY:
    case ArrayColumnType.OID_ARRAY:
      return ColumnTypeEnum.Int64Array;
    default:
      if (fieldTypeId >= FIRST_NORMAL_OBJECT_ID) {
        return ColumnTypeEnum.Text;
      }
      throw new UnsupportedNativeDataType(fieldTypeId);
  }
}
function normalize_array(element_normalizer) {
  return (str) => (0, import_postgres_array.parse)(str, element_normalizer);
}
function normalize_numeric(numeric) {
  return numeric;
}
function normalize_date(date) {
  return date;
}
function normalize_timestamp(time) {
  return `${time.replace(" ", "T")}+00:00`;
}
function normalize_timestamptz(time) {
  return time.replace(" ", "T").replace(/[+-]\d{2}(:\d{2})?$/, "+00:00");
}
function normalize_time(time) {
  return time;
}
function normalize_timez(time) {
  return time.replace(/[+-]\d{2}(:\d{2})?$/, "");
}
function normalize_money(money) {
  return money.slice(1);
}
function normalize_xml(xml) {
  return xml;
}
function toJson(json) {
  return json;
}
var parsePgBytes = getTypeParser(ScalarColumnType.BYTEA);
var normalizeByteaArray = getTypeParser(ArrayColumnType.BYTEA_ARRAY);
function convertBytes(serializedBytes) {
  return parsePgBytes(serializedBytes);
}
function normalizeBit(bit) {
  return bit;
}
var customParsers = {
  [ScalarColumnType.NUMERIC]: normalize_numeric,
  [ArrayColumnType.NUMERIC_ARRAY]: normalize_array(normalize_numeric),
  [ScalarColumnType.TIME]: normalize_time,
  [ArrayColumnType.TIME_ARRAY]: normalize_array(normalize_time),
  [ScalarColumnType.TIMETZ]: normalize_timez,
  [ScalarColumnType.DATE]: normalize_date,
  [ArrayColumnType.DATE_ARRAY]: normalize_array(normalize_date),
  [ScalarColumnType.TIMESTAMP]: normalize_timestamp,
  [ArrayColumnType.TIMESTAMP_ARRAY]: normalize_array(normalize_timestamp),
  [ScalarColumnType.TIMESTAMPTZ]: normalize_timestamptz,
  [ArrayColumnType.TIMESTAMPTZ_ARRAY]: normalize_array(normalize_timestamptz),
  [ScalarColumnType.MONEY]: normalize_money,
  [ArrayColumnType.MONEY_ARRAY]: normalize_array(normalize_money),
  [ScalarColumnType.JSON]: toJson,
  [ArrayColumnType.JSON_ARRAY]: normalize_array(toJson),
  [ScalarColumnType.JSONB]: toJson,
  [ArrayColumnType.JSONB_ARRAY]: normalize_array(toJson),
  [ScalarColumnType.BYTEA]: convertBytes,
  [ArrayColumnType.BYTEA_ARRAY]: normalizeByteaArray,
  [ArrayColumnType.BIT_ARRAY]: normalize_array(normalizeBit),
  [ArrayColumnType.VARBIT_ARRAY]: normalize_array(normalizeBit),
  [ArrayColumnType.XML_ARRAY]: normalize_array(normalize_xml)
};
function mapArg(arg, argType) {
  if (arg === null) {
    return null;
  }
  if (Array.isArray(arg) && argType.arity === "list") {
    return arg.map((value) => mapArg(value, argType));
  }
  if (typeof arg === "string" && argType.scalarType === "datetime") {
    arg = new Date(arg);
  }
  if (arg instanceof Date) {
    switch (argType.dbType) {
      case "TIME":
      case "TIMETZ":
        return formatTime(arg);
      case "DATE":
        return formatDate(arg);
      default:
        return formatDateTime(arg);
    }
  }
  if (typeof arg === "string" && argType.scalarType === "bytes") {
    return Buffer.from(arg, "base64");
  }
  if (ArrayBuffer.isView(arg)) {
    return new Uint8Array(arg.buffer, arg.byteOffset, arg.byteLength);
  }
  return arg;
}
function formatDateTime(date) {
  const pad = (n, z3 = 2) => String(n).padStart(z3, "0");
  const ms = date.getUTCMilliseconds();
  return pad(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate()) + " " + pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + (ms ? "." + String(ms).padStart(3, "0") : "");
}
function formatDate(date) {
  const pad = (n, z3 = 2) => String(n).padStart(z3, "0");
  return pad(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate());
}
function formatTime(date) {
  const pad = (n, z3 = 2) => String(n).padStart(z3, "0");
  const ms = date.getUTCMilliseconds();
  return pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + (ms ? "." + String(ms).padStart(3, "0") : "");
}
var TLS_ERRORS = /* @__PURE__ */ new Set([
  "UNABLE_TO_GET_ISSUER_CERT",
  "UNABLE_TO_GET_CRL",
  "UNABLE_TO_DECRYPT_CERT_SIGNATURE",
  "UNABLE_TO_DECRYPT_CRL_SIGNATURE",
  "UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY",
  "CERT_SIGNATURE_FAILURE",
  "CRL_SIGNATURE_FAILURE",
  "CERT_NOT_YET_VALID",
  "CERT_HAS_EXPIRED",
  "CRL_NOT_YET_VALID",
  "CRL_HAS_EXPIRED",
  "ERROR_IN_CERT_NOT_BEFORE_FIELD",
  "ERROR_IN_CERT_NOT_AFTER_FIELD",
  "ERROR_IN_CRL_LAST_UPDATE_FIELD",
  "ERROR_IN_CRL_NEXT_UPDATE_FIELD",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "CERT_CHAIN_TOO_LONG",
  "CERT_REVOKED",
  "INVALID_CA",
  "INVALID_PURPOSE",
  "CERT_UNTRUSTED",
  "CERT_REJECTED",
  "HOSTNAME_MISMATCH",
  "ERR_TLS_CERT_ALTNAME_FORMAT",
  "ERR_TLS_CERT_ALTNAME_INVALID"
]);
var SOCKET_ERRORS = /* @__PURE__ */ new Set(["ENOTFOUND", "ECONNREFUSED", "ECONNRESET", "ETIMEDOUT"]);
function convertDriverError(error) {
  if (isSocketError(error)) {
    return mapSocketError(error);
  }
  if (isTlsError(error)) {
    return {
      kind: "TlsConnectionError",
      reason: error.message
    };
  }
  if (isDriverError(error)) {
    return {
      originalCode: error.code,
      originalMessage: error.message,
      ...mapDriverError(error)
    };
  }
  throw error;
}
function mapDriverError(error) {
  switch (error.code) {
    case "22001":
      return {
        kind: "LengthMismatch",
        column: error.column
      };
    case "22003":
      return {
        kind: "ValueOutOfRange",
        cause: error.message
      };
    case "22P02":
      return {
        kind: "InvalidInputValue",
        message: error.message
      };
    case "23505": {
      const fields = error.detail?.match(/Key \(([^)]+)\)/)?.at(1)?.split(", ");
      return {
        kind: "UniqueConstraintViolation",
        constraint: fields !== void 0 ? { fields } : void 0
      };
    }
    case "23502": {
      const fields = error.detail?.match(/Key \(([^)]+)\)/)?.at(1)?.split(", ");
      return {
        kind: "NullConstraintViolation",
        constraint: fields !== void 0 ? { fields } : void 0
      };
    }
    case "23503": {
      let constraint;
      if (error.column) {
        constraint = { fields: [error.column] };
      } else if (error.constraint) {
        constraint = { index: error.constraint };
      }
      return {
        kind: "ForeignKeyConstraintViolation",
        constraint
      };
    }
    case "3D000":
      return {
        kind: "DatabaseDoesNotExist",
        db: error.message.split(" ").at(1)?.split('"').at(1)
      };
    case "28000":
      return {
        kind: "DatabaseAccessDenied",
        db: error.message.split(",").find((s) => s.startsWith(" database"))?.split('"').at(1)
      };
    case "28P01":
      return {
        kind: "AuthenticationFailed",
        user: error.message.split(" ").pop()?.split('"').at(1)
      };
    case "40001":
      return {
        kind: "TransactionWriteConflict"
      };
    case "42P01":
      return {
        kind: "TableDoesNotExist",
        table: error.message.split(" ").at(1)?.split('"').at(1)
      };
    case "42703":
      return {
        kind: "ColumnNotFound",
        column: error.message.split(" ").at(1)?.split('"').at(1)
      };
    case "42P04":
      return {
        kind: "DatabaseAlreadyExists",
        db: error.message.split(" ").at(1)?.split('"').at(1)
      };
    case "53300":
      return {
        kind: "TooManyConnections",
        cause: error.message
      };
    default:
      return {
        kind: "postgres",
        code: error.code ?? "N/A",
        severity: error.severity ?? "N/A",
        message: error.message,
        detail: error.detail,
        column: error.column,
        hint: error.hint
      };
  }
}
function isDriverError(error) {
  return typeof error.code === "string" && typeof error.message === "string" && typeof error.severity === "string" && (typeof error.detail === "string" || error.detail === void 0) && (typeof error.column === "string" || error.column === void 0) && (typeof error.hint === "string" || error.hint === void 0);
}
function mapSocketError(error) {
  switch (error.code) {
    case "ENOTFOUND":
    case "ECONNREFUSED":
      return {
        kind: "DatabaseNotReachable",
        host: error.address ?? error.hostname,
        port: error.port
      };
    case "ECONNRESET":
      return {
        kind: "ConnectionClosed"
      };
    case "ETIMEDOUT":
      return {
        kind: "SocketTimeout"
      };
  }
}
function isSocketError(error) {
  return typeof error.code === "string" && typeof error.syscall === "string" && typeof error.errno === "number" && SOCKET_ERRORS.has(error.code);
}
function isTlsError(error) {
  if (typeof error.code === "string") {
    return TLS_ERRORS.has(error.code);
  }
  switch (error.message) {
    case "The server does not support SSL connections":
    case "There was an error establishing an SSL connection":
      return true;
  }
  return false;
}
var types2 = pg2.types;
var debug2 = Debug("prisma:driver-adapter:pg");
var PgQueryable = class {
  constructor(client, pgOptions) {
    __publicField(this, "provider", "postgres");
    __publicField(this, "adapterName", name);
    this.client = client;
    this.pgOptions = pgOptions;
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters.
   */
  async queryRaw(query) {
    const tag = "[js::query_raw]";
    debug2(`${tag} %O`, query);
    const { fields, rows } = await this.performIO(query);
    const columnNames = fields.map((field) => field.name);
    let columnTypes = [];
    try {
      columnTypes = fields.map((field) => fieldToColumnType(field.dataTypeID));
    } catch (e) {
      if (e instanceof UnsupportedNativeDataType) {
        throw new DriverAdapterError({
          kind: "UnsupportedNativeDataType",
          type: e.type
        });
      }
      throw e;
    }
    const udtParser = this.pgOptions?.userDefinedTypeParser;
    if (udtParser) {
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (field.dataTypeID >= FIRST_NORMAL_OBJECT_ID && !Object.hasOwn(customParsers, field.dataTypeID)) {
          for (let j = 0; j < rows.length; j++) {
            rows[j][i] = await udtParser(field.dataTypeID, rows[j][i], this);
          }
        }
      }
    }
    return {
      columnNames,
      columnTypes,
      rows
    };
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters and
   * returning the number of affected rows.
   * Note: Queryable expects a u64, but napi.rs only supports u32.
   */
  async executeRaw(query) {
    const tag = "[js::execute_raw]";
    debug2(`${tag} %O`, query);
    return (await this.performIO(query)).rowCount ?? 0;
  }
  /**
   * Run a query against the database, returning the result set.
   * Should the query fail due to a connection error, the connection is
   * marked as unhealthy.
   */
  async performIO(query) {
    const { sql, args } = query;
    const values = args.map((arg, i) => mapArg(arg, query.argTypes[i]));
    try {
      const result = await this.client.query(
        {
          text: sql,
          values,
          rowMode: "array",
          types: {
            // This is the error expected:
            // No overload matches this call.
            // The last overload gave the following error.
            // Type '(oid: number, format?: any) => (json: string) => unknown' is not assignable to type '{ <T>(oid: number): TypeParser<string, string | T>; <T>(oid: number, format: "text"): TypeParser<string, string | T>; <T>(oid: number, format: "binary"): TypeParser<...>; }'.
            //   Type '(json: string) => unknown' is not assignable to type 'TypeParser<Buffer, any>'.
            //     Types of parameters 'json' and 'value' are incompatible.
            //       Type 'Buffer' is not assignable to type 'string'.ts(2769)
            //
            // Because pg-types types expect us to handle both binary and text protocol versions,
            // where as far we can see, pg will ever pass only text version.
            //
            // @ts-expect-error
            getTypeParser: (oid, format) => {
              if (format === "text" && customParsers[oid]) {
                return customParsers[oid];
              }
              return types2.getTypeParser(oid, format);
            }
          }
        },
        values
      );
      return result;
    } catch (e) {
      this.onError(e);
    }
  }
  onError(error) {
    debug2("Error in performIO: %O", error);
    throw new DriverAdapterError(convertDriverError(error));
  }
};
var PgTransaction = class extends PgQueryable {
  constructor(client, options, pgOptions, cleanup) {
    super(client, pgOptions);
    this.options = options;
    this.pgOptions = pgOptions;
    this.cleanup = cleanup;
  }
  async commit() {
    debug2(`[js::commit]`);
    this.cleanup?.();
    this.client.release();
  }
  async rollback() {
    debug2(`[js::rollback]`);
    this.cleanup?.();
    this.client.release();
  }
};
var PrismaPgAdapter = class extends PgQueryable {
  constructor(client, pgOptions, release) {
    super(client);
    this.pgOptions = pgOptions;
    this.release = release;
  }
  async startTransaction(isolationLevel) {
    const options = {
      usePhantomQuery: false
    };
    const tag = "[js::startTransaction]";
    debug2("%s options: %O", tag, options);
    const conn = await this.client.connect().catch((error) => this.onError(error));
    const onError = (err) => {
      debug2(`Error from pool connection: ${err.message} %O`, err);
      this.pgOptions?.onConnectionError?.(err);
    };
    conn.on("error", onError);
    const cleanup = () => {
      conn.removeListener("error", onError);
    };
    try {
      const tx = new PgTransaction(conn, options, this.pgOptions, cleanup);
      await tx.executeRaw({ sql: "BEGIN", args: [], argTypes: [] });
      if (isolationLevel) {
        await tx.executeRaw({
          sql: `SET TRANSACTION ISOLATION LEVEL ${isolationLevel}`,
          args: [],
          argTypes: []
        });
      }
      return tx;
    } catch (error) {
      cleanup();
      conn.release(error);
      this.onError(error);
    }
  }
  async executeScript(script) {
    const statements = script.split(";").map((stmt) => stmt.trim()).filter((stmt) => stmt.length > 0);
    for (const stmt of statements) {
      try {
        await this.client.query(stmt);
      } catch (error) {
        this.onError(error);
      }
    }
  }
  getConnectionInfo() {
    return {
      schemaName: this.pgOptions?.schema,
      supportsRelationJoins: true
    };
  }
  async dispose() {
    return this.release?.();
  }
  underlyingDriver() {
    return this.client;
  }
};
var PrismaPgAdapterFactory = class {
  constructor(poolOrConfig, options) {
    __publicField(this, "provider", "postgres");
    __publicField(this, "adapterName", name);
    __publicField(this, "config");
    __publicField(this, "externalPool");
    this.options = options;
    if (poolOrConfig instanceof pg2.Pool) {
      this.externalPool = poolOrConfig;
      this.config = poolOrConfig.options;
    } else {
      this.externalPool = null;
      this.config = poolOrConfig;
    }
  }
  async connect() {
    const client = this.externalPool ?? new pg2.Pool(this.config);
    const onIdleClientError = (err) => {
      debug2(`Error from idle pool client: ${err.message} %O`, err);
      this.options?.onPoolError?.(err);
    };
    client.on("error", onIdleClientError);
    return new PrismaPgAdapter(client, this.options, async () => {
      if (this.externalPool) {
        if (this.options?.disposeExternalPool) {
          await this.externalPool.end();
          this.externalPool = null;
        } else {
          this.externalPool.removeListener("error", onIdleClientError);
        }
      } else {
        await client.end();
      }
    });
  }
  async connectToShadowDb() {
    const conn = await this.connect();
    const database = `prisma_migrate_shadow_db_${globalThis.crypto.randomUUID()}`;
    await conn.executeScript(`CREATE DATABASE "${database}"`);
    const client = new pg2.Pool({ ...this.config, database });
    return new PrismaPgAdapter(client, void 0, async () => {
      await conn.executeScript(`DROP DATABASE "${database}"`);
      await client.end();
    });
  }
};

// src/prisma/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.2.0",
  "engineVersion": "0c8ef2ce45c83248ab3df073180d5eda9e8be7a3",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "./generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id          String       @id @default(uuid())\n  username    String       @unique\n  password    String\n  urls        Url[]\n  userProfile UserProfile?\n  createdAt   DateTime     @default(now()) @map("created_at")\n  updatedAt   DateTime     @updatedAt @map("updated_at")\n\n  @@index([username])\n  @@map("users")\n}\n\nmodel UserProfile {\n  id       String  @id @default(uuid())\n  fullName String  @map("full_name")\n  email    String? @unique\n  icon     String?\n  userId   String  @unique @map("user_id")\n  user     User    @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  updatedAt DateTime @updatedAt @map("updated_at")\n\n  @@index([fullName])\n  @@index([email])\n  @@index([userId])\n  @@map("user_profiles")\n}\n\nmodel Url {\n  id        String     @id @default(uuid())\n  short     String     @unique\n  original  String\n  userId    String     @map("user_id")\n  user      User       @relation(fields: [userId], references: [id])\n  status    UrlAccess?\n  visits    Visit[]\n  createdAt DateTime   @default(now()) @map("created_at")\n  updatedAt DateTime   @updatedAt @map("updated_at")\n\n  @@index([original])\n  @@index([short])\n  @@index([userId])\n  @@map("urls")\n}\n\nmodel UrlAccess {\n  id             String    @id @default(uuid())\n  urlId          String    @unique @map("url_id")\n  url            Url       @relation(fields: [urlId], references: [id], onDelete: Cascade)\n  active         Boolean\n  expirationDate DateTime? @map("expiration_date")\n  password       String?\n  createdAt      DateTime  @default(now()) @map("created_at")\n  updatedAt      DateTime  @updatedAt @map("updated_at")\n\n  @@index([expirationDate])\n  @@index([urlId])\n  @@map("url_access")\n}\n\nmodel Visitor {\n  id         String   @id @default(uuid())\n  ipAddress  String   @unique @map("ip_address")\n  location   String\n  deviceType String   @map("device_type")\n  visits     Visit[]\n  createdAt  DateTime @default(now()) @map("created_at")\n\n  @@index([ipAddress])\n  @@map("visitors")\n}\n\nmodel Visit {\n  id        String   @id @default(uuid())\n  visitorId String   @map("visitor_id")\n  visitor   Visitor  @relation(fields: [visitorId], references: [id])\n  urlId     String   @map("url_id")\n  url       Url      @relation(fields: [urlId], references: [id], onDelete: Cascade)\n  visitedAt DateTime @default(now()) @map("visited_at")\n\n  @@index([urlId])\n  @@index([visitorId])\n  @@index([visitedAt])\n  @@map("visits")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"username","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"urls","kind":"object","type":"Url","relationName":"UrlToUser"},{"name":"userProfile","kind":"object","type":"UserProfile","relationName":"UserToUserProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"users"},"UserProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"fullName","kind":"scalar","type":"String","dbName":"full_name"},{"name":"email","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String","dbName":"user_id"},{"name":"user","kind":"object","type":"User","relationName":"UserToUserProfile"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"user_profiles"},"Url":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"short","kind":"scalar","type":"String"},{"name":"original","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String","dbName":"user_id"},{"name":"user","kind":"object","type":"User","relationName":"UrlToUser"},{"name":"status","kind":"object","type":"UrlAccess","relationName":"UrlToUrlAccess"},{"name":"visits","kind":"object","type":"Visit","relationName":"UrlToVisit"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"urls"},"UrlAccess":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"urlId","kind":"scalar","type":"String","dbName":"url_id"},{"name":"url","kind":"object","type":"Url","relationName":"UrlToUrlAccess"},{"name":"active","kind":"scalar","type":"Boolean"},{"name":"expirationDate","kind":"scalar","type":"DateTime","dbName":"expiration_date"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"url_access"},"Visitor":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"ipAddress","kind":"scalar","type":"String","dbName":"ip_address"},{"name":"location","kind":"scalar","type":"String"},{"name":"deviceType","kind":"scalar","type":"String","dbName":"device_type"},{"name":"visits","kind":"object","type":"Visit","relationName":"VisitToVisitor"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"}],"dbName":"visitors"},"Visit":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"visitorId","kind":"scalar","type":"String","dbName":"visitor_id"},{"name":"visitor","kind":"object","type":"Visitor","relationName":"VisitToVisitor"},{"name":"urlId","kind":"scalar","type":"String","dbName":"url_id"},{"name":"url","kind":"object","type":"Url","relationName":"UrlToVisit"},{"name":"visitedAt","kind":"scalar","type":"DateTime","dbName":"visited_at"}],"dbName":"visits"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_bg.postgresql.js"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_bg.postgresql.wasm-base64.js");
    return await decodeBase64AsWasm(wasm);
  }
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/prisma/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/prisma/generated/prisma/client.ts
var PrismaClient = getPrismaClientClass();

// src/app.ts
import "dotenv/config";
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPgAdapterFactory({ connectionString });
var prisma = new PrismaClient({ adapter });
var app = express();
app.use(express.json());

// src/routes/index.route.ts
import express6 from "express";

// src/routes/url.route.ts
import express2 from "express";

// src/middlewares/body-validator.ts
import { z } from "zod";
var validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errors = z.treeifyError(result.error);
    return res.status(400).json({
      message: "Validation failed",
      errors
    });
  }
  req.body = result.data;
  next();
};

// src/dtos/request/shorten-url-request.dto.ts
import { z as z2 } from "zod";
var shortenUrlValidator = z2.object({
  url: z2.url(),
  password: z2.string().min(5).max(15).optional(),
  expirationDate: z2.iso.datetime().optional()
});

// src/shared/utils/auth-request.util.ts
var asAuthRequest = (req) => {
  return req;
};

// src/repositories/url-repository.ts
var findAllByUserId = (userId) => {
  return prisma.url.findMany({
    where: {
      userId
    }
  });
};
var findAllUrlIdsByUserId = (userId) => {
  return prisma.url.findMany({
    where: {
      userId
    },
    select: {
      id: true
    }
  });
};
var create = (originalUrl, shortUrl, userId) => {
  return prisma.url.create({
    data: {
      original: originalUrl,
      short: shortUrl,
      userId
    }
  });
};
var findUrlByShort = (shortUrl) => {
  return prisma.url.findUnique({
    where: {
      short: shortUrl
    }
  });
};
var findAllIncludeUrlAccessByUserId = (userId, pageable) => {
  const skip = (pageable.currentPage - 1) * pageable.size;
  const take = pageable.size;
  return prisma.url.findMany({
    where: {
      userId
    },
    include: {
      status: true
    },
    skip,
    take
  });
};
var totalCountByUserId = (userId) => {
  return prisma.url.count({
    where: {
      userId
    }
  });
};
var findByIdAndUserId = (id, userId) => {
  return prisma.url.findUnique({
    where: {
      id,
      userId
    }
  });
};
var deleteUrlByIdAndUserId = (id, userId) => {
  return prisma.url.delete({
    where: {
      id,
      userId
    }
  });
};
var url_repository_default = {
  totalCountByUserId,
  findUrlByShort,
  create,
  findAllIncludeUrlAccessByUserId,
  findByIdAndUserId,
  findAllByUserId,
  findAllUrlIdsByUserId,
  deleteUrlByIdAndUserId
};

// src/repositories/url-access.repository.ts
var create2 = (urlId, password, expirationDate) => {
  return prisma.urlAccess.create({
    data: {
      password,
      expirationDate,
      urlId,
      active: true
    }
  });
};
var url_access_repository_default = {
  create: create2
};

// src/shared/mapper/url-mapper.ts
var mapToUrlResponseDTO = (url) => {
  return {
    id: url.id,
    active: url.status.active,
    original: url.original,
    short: url.short,
    expirationDate: url.status.expirationDate ?? null
  };
};

// src/exceptions/httpError.ts
var HttpError = class extends Error {
  constructor(status, message, name2) {
    super(message);
    this.status = status;
    this.name = name2 || this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/shared/utils/shortener.util.ts
var SHORT_URL_LENGTH = 5;
var generateRandomString = (length) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
var shortenUrl = async (originalUrl) => {
  if (!originalUrl || originalUrl.length < 3) {
    throw new HttpError(400, "URL is too short to shorten.", "ValidationError");
  }
  const cleanedUrl = originalUrl.replace(/^https?:\/\//, "").trim();
  if (cleanedUrl.length < 3) {
    throw new HttpError(400, "Invalid domain.", "ValidationError");
  }
  const shortCode = generateRandomString(SHORT_URL_LENGTH);
  return shortCode;
};

// src/repositories/visitor-repository.ts
var findVisitorByIpAddress = (ipAddress) => {
  return prisma.visitor.findUnique({
    where: {
      ipAddress
    }
  });
};
var create3 = (ipAddress, location, deviceType) => {
  return prisma.visitor.create({
    data: {
      ipAddress,
      location,
      deviceType
    }
  });
};
var update = (visitorId, ipAddress, location, deviceType) => {
  return prisma.visitor.update({
    where: { id: visitorId },
    data: {
      ipAddress,
      location,
      deviceType
    }
  });
};
var visitor_repository_default = {
  update,
  create: create3,
  findVisitorByIpAddress
};

// src/repositories/visit-repository.ts
var create4 = (urlId, visitorId) => {
  return prisma.visit.create({
    data: {
      urlId,
      visitorId
    }
  });
};
var visitorsTotalCountByUrlIds = async (urlIds) => {
  const uniqueVisitors = await prisma.visit.groupBy({
    by: ["visitorId"],
    where: {
      urlId: { in: urlIds }
    }
  });
  return uniqueVisitors.length;
};
var findAllVisitorsByUrlIds = async (urlIds, pageable) => {
  const results = await Promise.all(
    urlIds.map((urlId) => {
      const skip = (pageable.currentPage - 1) * pageable.size;
      const take = pageable.size;
      return prisma.visit.findMany({
        where: { urlId },
        distinct: "visitorId",
        select: { visitor: true },
        skip,
        take
      });
    })
  );
  return results.flat().map((v) => v.visitor);
};
var visit_repository_default = {
  create: create4,
  findAllVisitorsByUrlIds,
  visitorsTotalCountByUrlIds
};

// src/services/url-service.ts
var shortenUrlByUserId = async (data, userId) => {
  const shortUrl = await shortenUrl(data.url);
  const findUrl = await url_repository_default.findUrlByShort(shortUrl);
  if (findUrl) {
    throw new HttpError(
      409,
      "Short URL already exists. Try again.",
      "ConflictError"
    );
  }
  const url = await url_repository_default.create(data.url, shortUrl, userId);
  const access = await url_access_repository_default.create(
    url.id,
    data.expirationDate,
    data.password
  );
  return {
    id: url.id,
    active: access.active,
    original: url.original,
    short: url.short,
    expirationDate: access.expirationDate
  };
};
var viewOriginalByShort = async (shortUrl, visitor) => {
  const originalUrl = await url_repository_default.findUrlByShort(shortUrl);
  const findVisitor = await visitor_repository_default.findVisitorByIpAddress(
    visitor.ipAddress
  );
  if (!originalUrl)
    throw new HttpError(404, "No original url found.", "ItemNotFound");
  if (!findVisitor) {
    const newVisitor = await visitor_repository_default.create(
      visitor.ipAddress,
      visitor.location,
      visitor.deviceType
    );
    await visit_repository_default.create(originalUrl.id, newVisitor.id);
  } else {
    findVisitor.deviceType = visitor.deviceType;
    await visit_repository_default.create(originalUrl.id, findVisitor.id);
    await visitor_repository_default.update(
      findVisitor.id,
      findVisitor.ipAddress,
      findVisitor.location,
      findVisitor.deviceType
    );
  }
  return originalUrl.original;
};
var findAllIncludeUrlAccessByUserId2 = async (userId, pageable) => {
  const count = await url_repository_default.totalCountByUserId(userId);
  const data = await url_repository_default.findAllIncludeUrlAccessByUserId(
    userId,
    pageable
  );
  const totalPages = Math.max(Math.ceil(count / pageable.size), 1);
  return {
    data: data.map((url) => mapToUrlResponseDTO(url)),
    totalElements: count,
    totalPages
  };
};
var deleteUrlByIdAndUserId2 = async (id, userId) => {
  const findUrl = await url_repository_default.findByIdAndUserId(id, userId);
  if (!findUrl)
    throw new HttpError(404, "No url found to delete.", "ItemNotFound");
  return await url_repository_default.deleteUrlByIdAndUserId(findUrl.id, userId);
};
var url_service_default = {
  deleteUrlByIdAndUserId: deleteUrlByIdAndUserId2,
  findAllIncludeUrlAccessByUserId: findAllIncludeUrlAccessByUserId2,
  shortenUrlByUserId,
  viewOriginalByShort
};

// src/shared/utils/pagination.util.ts
var buildPageable = (query) => {
  const direction = query.direction?.toLowerCase() === "asc" ? "asc" : "desc";
  const sortBy = typeof query.sortBy === "string" ? query.sortBy : "createdAt";
  const currentPage = Math.max(Number(query.page) || 1, 1);
  const size = Math.min(Math.max(Number(query.size) || 10, 1), 100);
  return { currentPage, size, direction, sortBy };
};

// src/shared/utils/track-visitor.util.ts
import geoip from "geoip-lite";
import { UserAgent } from "express-useragent";
var trackVisitor = (req) => {
  const ip = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ipAddress = Array.isArray(ip) ? ip[0] : ip;
  const source = req.headers["user-agent"] ?? "unknown";
  const parser = new UserAgent().hydrate(source);
  const agent = parser.Agent;
  let deviceType = "Desktop";
  if (agent.isMobile) deviceType = "Mobile";
  else if (agent.isTablet) deviceType = "Tablet";
  else if (agent.isSmartTV) deviceType = "SmartTV";
  else if (agent.isBot) deviceType = "Bot";
  const geo = geoip.lookup(ipAddress);
  const location = [geo?.city, geo?.country].filter(Boolean).join(", ") || "unknown";
  return {
    ipAddress,
    deviceType,
    location
  };
};

// src/controllers/url-controller.ts
var shortenUrl2 = async (req, res) => {
  const authRequest = asAuthRequest(req);
  const body = req.body;
  const response = await url_service_default.shortenUrlByUserId(body, authRequest.user.id);
  res.status(201).json({
    message: "success",
    data: response
  });
};
var getAllUrls = async (req, res) => {
  const authRequest = asAuthRequest(req);
  const pageable = buildPageable(req.query);
  const response = await url_service_default.findAllIncludeUrlAccessByUserId(
    authRequest.user.id,
    pageable
  );
  res.status(200).json({
    message: "success",
    data: response.data,
    meta: {
      totalPages: response.totalPages,
      totalElements: response.totalElements,
      size: pageable.size,
      currentPage: pageable.currentPage
    }
  });
};
var deleteUrlById = async (req, res) => {
  const id = req.params.id;
  const authRequest = asAuthRequest(req);
  const response = await url_service_default.deleteUrlByIdAndUserId(
    id,
    authRequest.user.id
  );
  console.log(response);
  res.status(200).json(
    {
      data: response,
      message: "success"
    }
  );
};
var getUrlByShort = async (req, res) => {
  const shortUrl = req.params.shortUrl;
  const visitorRequest = trackVisitor(req);
  const response = await url_service_default.viewOriginalByShort(shortUrl, visitorRequest);
  res.redirect(response);
};
var url_controller_default = {
  getUrlByShort,
  getAllUrls,
  shortenUrl: shortenUrl2,
  deleteUrlById
};

// src/services/jwt-service.ts
import jwt from "jsonwebtoken";
var JWT_SECRET = process.env.JWT_SECRET || "supersecret";
var generateToken = (tokenPayload, expiresIn) => {
  const options = { expiresIn };
  return jwt.sign(tokenPayload, JWT_SECRET, options);
};
var validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new HttpError(
      401,
      "Invalid or expired token.",
      "UnauthorizedError"
    );
  }
};

// src/middlewares/token-middleware.ts
var authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new HttpError(401, "Authorization header missing or invalid.", "UnauthorizedError");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = validateToken(token);
    asAuthRequest(req).user = decoded;
    next();
  } catch (err) {
    throw new HttpError(401, "Invalid or expired token.", "UnauthorizedError");
  }
};

// src/routes/url.route.ts
var router = express2.Router();
var authenticated = express2.Router();
authenticated.post(
  "/",
  authenticateJWT,
  validateBody(shortenUrlValidator),
  url_controller_default.shortenUrl
);
authenticated.get("/", authenticateJWT, url_controller_default.getAllUrls);
authenticated.delete("/:id", authenticateJWT, url_controller_default.deleteUrlById);
router.get("/short/:shortUrl", url_controller_default.getUrlByShort);
router.use(authenticated);
var url_route_default = router;

// src/routes/auth.route.ts
import express3 from "express";

// src/shared/utils/crypto.util.ts
import bcrypt from "bcrypt";
var SALT_ROUNDS = 12;
var encode = async (text) => await bcrypt.hash(text, SALT_ROUNDS);
var decode = async (value, hashed) => await bcrypt.compare(value, hashed);
var crypto_util_default = {
  encode,
  decode
};

// src/repositories/user-repository.ts
var findByUsername = (username) => {
  return prisma.user.findUnique({
    where: {
      username
    }
  });
};
var findById = (id) => {
  return prisma.user.findUnique({
    where: {
      id
    }
  });
};
var create5 = (username, password) => {
  return prisma.user.create({
    data: {
      username,
      password
    }
  });
};
var deleteAll = () => {
  return prisma.user.deleteMany();
};
var user_repository_default = {
  findById,
  deleteAll,
  findByUsername,
  create: create5
};

// src/repositories/user-profile-repository.ts
var create6 = (fullName, email, icon, userId) => {
  return prisma.userProfile.create({
    data: {
      fullName,
      email,
      icon,
      userId
    }
  });
};
var findByEmail = (email) => {
  return prisma.userProfile.findUnique({
    where: {
      email
    }
  });
};
var findByUserId = (userId) => {
  return prisma.userProfile.findUnique({
    where: {
      userId
    }
  });
};
var user_profile_repository_default = {
  findByUserId,
  findByEmail,
  create: create6
};

// src/services/auth-service.ts
var login = async (username, password) => {
  const findUser = await user_repository_default.findByUsername(username);
  if (!findUser)
    throw new HttpError(401, "Invalid credentials.", "UnauthorizedError");
  const passwordMatch = await crypto_util_default.decode(password, findUser.password);
  if (!passwordMatch)
    throw new HttpError(401, "Invalid credentials.", "UnauthorizedError");
  const tokenPayload = {
    id: findUser.id,
    type: "access",
    username: findUser.username
  };
  const token = generateToken(tokenPayload, "1h");
  tokenPayload.type = "refresh";
  const refreshToken2 = generateToken(tokenPayload, "7d");
  return {
    token,
    refreshToken: refreshToken2
  };
};
var generateTokenFromRefreshToken = async (refreshToken2) => {
  const refreshTokenPayload = validateToken(refreshToken2);
  if (refreshTokenPayload.type === "access")
    throw new HttpError(401, "Invalid token type.", "UnauthorizedError");
  const tokenPayload = {
    id: refreshTokenPayload.id,
    username: refreshTokenPayload.username,
    type: "access"
  };
  const newToken = generateToken(tokenPayload, "1h");
  return {
    token: newToken
  };
};
var createAccount = async (data) => {
  const userExistsByUsername = await user_repository_default.findByUsername(data.username);
  const userExistsByEmail = await user_profile_repository_default.findByEmail(data.email);
  if (userExistsByUsername)
    throw new HttpError(409, "Username already taken.", "ConflictError");
  if (userExistsByEmail)
    throw new HttpError(409, "Email already registered.", "ConflictError");
  const hashedPassword = await crypto_util_default.encode(data.password);
  const savedUser = await user_repository_default.create(
    data.username,
    hashedPassword
  );
  const savedProfile = await user_profile_repository_default.create(
    data.fullName,
    data.email,
    data.icon,
    savedUser.id
  );
  return {
    id: savedProfile.id,
    fullName: savedProfile.fullName,
    email: savedProfile.email,
    icon: savedProfile.icon,
    updatedAt: savedProfile.updatedAt
  };
};
var auth_service_default = {
  generateTokenFromRefreshToken,
  createAccount,
  login
};

// src/controllers/auth-controller.ts
var login2 = async (req, res) => {
  const { username, password } = req.body;
  const response = await auth_service_default.login(username, password);
  return res.status(200).json({
    data: response,
    message: "success"
  });
};
var refreshToken = async (req, res) => {
  const { refreshToken: refreshToken2 } = req.body;
  const newToken = await auth_service_default.generateTokenFromRefreshToken(refreshToken2);
  return res.status(201).json({
    data: newToken,
    message: "success"
  });
};
var register = async (req, res) => {
  const data = req.body;
  const response = await auth_service_default.createAccount(data);
  return res.status(201).json({
    data: response,
    message: "Account created successfully."
  });
};
var auth_controller_default = {
  login: login2,
  refreshToken,
  register
};

// src/routes/auth.route.ts
var router2 = express3.Router();
router2.post("/login", auth_controller_default.login);
router2.post("/register", auth_controller_default.register);
router2.post("/refresh", auth_controller_default.refreshToken);
var auth_route_default = router2;

// src/services/user-service.ts
var currentUser = async (userId) => {
  const user = await user_repository_default.findById(userId);
  if (!user)
    throw new HttpError(404, "User not found.", "NotFoundError");
  const findProfile = await user_profile_repository_default.findByUserId(userId);
  return {
    id: user.id,
    username: user.username,
    email: findProfile?.email,
    fullName: findProfile?.fullName,
    icon: findProfile?.icon
  };
};
var user_service_default = {
  currentUser
};

// src/controllers/my-account-controller.ts
var myAccount = async (req, res) => {
  const authRequest = asAuthRequest(req);
  const user = await user_service_default.currentUser(authRequest.user.id);
  return res.status(200).json({
    data: user,
    message: "success"
  });
};

// src/routes/my-account.route.ts
import express4 from "express";
var router3 = express4.Router();
router3.get("/me", authenticateJWT, myAccount);
var my_account_route_default = router3;

// src/shared/mapper/visitor-mapper.ts
var mapToVisitorResponseDTO = (visitor) => {
  console.log(visitor);
  return {
    id: visitor.id,
    deviceType: visitor.deviceType,
    ipAddress: visitor.ipAddress,
    location: visitor.location
  };
};

// src/services/visitor-service.ts
var findAllVisitorsByUrlIds2 = async (userId, pageable) => {
  const urlIds = await url_repository_default.findAllUrlIdsByUserId(userId).then((urls) => urls.map((url) => url.id));
  const count = await visit_repository_default.visitorsTotalCountByUrlIds(
    urlIds
  );
  const visitors = await visit_repository_default.findAllVisitorsByUrlIds(
    urlIds,
    pageable
  );
  const data = visitors.map((v) => mapToVisitorResponseDTO(v));
  const totalPages = Math.max(Math.ceil(count / pageable.size), 1);
  return {
    totalPages,
    totalElements: count,
    data
  };
};
var visitor_service_default = {
  findAllVisitorsByUrlIds: findAllVisitorsByUrlIds2
};

// src/controllers/visitor-controller.ts
var getAllVisitors = async (req, res) => {
  const authRequest = asAuthRequest(req);
  const pageable = buildPageable(req.query);
  const response = await visitor_service_default.findAllVisitorsByUrlIds(
    authRequest.user.id,
    pageable
  );
  res.status(200).json({
    message: "success",
    data: response.data,
    meta: {
      totalPages: response.totalPages,
      totalElements: response.totalElements,
      size: pageable.size,
      currentPage: pageable.currentPage
    }
  });
};
var visitor_controller_default = {
  getAllVisitors
};

// src/routes/visitor.route.ts
import express5 from "express";
var router4 = express5.Router();
router4.get("/", authenticateJWT, visitor_controller_default.getAllVisitors);
var visitor_route_default = router4;

// src/routes/index.route.ts
var api = express6.Router();
var router5 = express6.Router();
api.use("/api", router5);
router5.use(auth_route_default);
router5.use(my_account_route_default);
router5.use("/urls", url_route_default);
router5.use("/visitors", visitor_route_default);
router5.delete("/delete", async (req, res, next) => {
  user_repository_default.deleteAll();
  res.json({ message: "All users deleted" });
});
var index_route_default = api;

// src/middlewares/error-exception-handler.ts
var errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message,
      type: err.name
    });
  }
  return res.status(500).json({
    message: err.message,
    type: err.name
  });
};

// src/server.ts
var PORT = 8e3;
var corsOptions = {
  origin: ["http://localhost:4200"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
};
app.use(cors(corsOptions));
app.use(index_route_default);
app.use(errorHandler);
app.listen(PORT, () => console.log(`Running on PORT : ${PORT}`));
