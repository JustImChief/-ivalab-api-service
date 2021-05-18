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
import { default as AbstractApiService, RequestService, RequestServiceError } from 'ts-axios-api-service';
import { LocalStorageService, SessionStorageService } from 'ts-storage-service';
import { dispatch } from 'ts-react-redux-store';
import { default as ResponseService, ResponseServiceError } from './ResponseService';
var ApiService = /** @class */ (function (_super) {
    __extends(ApiService, _super);
    function ApiService(urlKey, prefix) {
        if (urlKey === void 0) { urlKey = ''; }
        if (prefix === void 0) { prefix = ''; }
        var _this = _super.call(this, { baseUrl: '/api/', formData: true, urlKey: urlKey }) || this;
        _this.dispatch = dispatch;
        _this.ls = new LocalStorageService(prefix);
        _this.res = new ResponseService();
        _this.ss = new SessionStorageService(prefix);
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
}(AbstractApiService));
export default ApiService;
export { RequestService, RequestServiceError, ResponseService, ResponseServiceError };
//# sourceMappingURL=index.js.map