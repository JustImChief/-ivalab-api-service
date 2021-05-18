"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseServiceError = exports.ResponseService = exports.RequestServiceError = exports.RequestService = void 0;
var ts_axios_api_service_1 = require("ts-axios-api-service");
Object.defineProperty(exports, "RequestService", { enumerable: true, get: function () { return ts_axios_api_service_1.RequestService; } });
Object.defineProperty(exports, "RequestServiceError", { enumerable: true, get: function () { return ts_axios_api_service_1.RequestServiceError; } });
var ts_storage_service_1 = require("ts-storage-service");
var ts_react_redux_store_1 = require("ts-react-redux-store");
var ResponseService_1 = require("./ResponseService");
Object.defineProperty(exports, "ResponseService", { enumerable: true, get: function () { return ResponseService_1.default; } });
Object.defineProperty(exports, "ResponseServiceError", { enumerable: true, get: function () { return ResponseService_1.ResponseServiceError; } });
var ApiService = /** @class */ (function (_super) {
    __extends(ApiService, _super);
    function ApiService(urlKey, prefix) {
        if (urlKey === void 0) { urlKey = ''; }
        if (prefix === void 0) { prefix = ''; }
        var _this = _super.call(this, { baseUrl: '/api/', formData: true, urlKey: urlKey }) || this;
        _this.dispatch = ts_react_redux_store_1.dispatch;
        _this.ls = new ts_storage_service_1.LocalStorageService(prefix);
        _this.res = new ResponseService_1.default();
        _this.ss = new ts_storage_service_1.SessionStorageService(prefix);
        return _this;
    }
    ApiService.prototype.get = function (url, callback, options) {
        if (options === void 0) { options = {}; }
        return this.processResponse(this.req.get(this.getUrl(url), __assign(__assign({}, options), { headers: __assign(__assign({}, (options.headers || {})), { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' }), withCredentials: true })), callback);
    };
    ApiService.prototype.post = function (url, data, callback, options) {
        if (options === void 0) { options = {}; }
        return this.processResponse(this.req.post(this.getUrl(url), data, __assign(__assign({}, options), { headers: __assign(__assign({}, (options.headers || {})), { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'multipart/form-data' }), withCredentials: true })), callback);
    };
    return ApiService;
}(ts_axios_api_service_1.default));
exports.default = ApiService;
//# sourceMappingURL=index.js.map