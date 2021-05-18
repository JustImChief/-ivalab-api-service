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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseServiceError = void 0;
var ts_axios_api_service_1 = require("ts-axios-api-service");
Object.defineProperty(exports, "ResponseServiceError", { enumerable: true, get: function () { return ts_axios_api_service_1.ResponseServiceError; } });
var constants_1 = require("../constants");
var ResponseService = /** @class */ (function (_super) {
    __extends(ResponseService, _super);
    function ResponseService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResponseService.prototype.doFailureAction = function (error) {
        switch (error.errorType) {
            case constants_1.SERVER_ERROR:
                return Promise.reject({
                    message: 'Произошла ошибка при выполнении запроса',
                    messageType: 'error',
                });
            case constants_1.WRONG_RESPONSE_ERROR:
                return Promise.reject({
                    message: 'Некорректный формат ответа',
                    messageType: 'error',
                });
            case constants_1.NOT_FOUND_ERROR:
                return Promise.reject({
                    message: 'Не найден обработчик запроса',
                    messageType: 'warning',
                });
            case constants_1.NOT_AUTHORIZED_ERROR:
                return Promise.reject({
                    message: 'Отказано в доступе',
                    messageType: 'warning',
                });
            case constants_1.VALIDATION_ERROR:
                return Promise.reject(error.errors);
            default:
                return Promise.reject(error);
        }
    };
    ResponseService.prototype.doSuccessAction = function (response) {
        if (response.data.message) {
            return Promise.reject({
                message: response.data.message,
                messageType: 'success',
            });
        }
        return response.data.vars;
    };
    ResponseService.prototype.processResponse = function (promise) {
        return promise
            .then(function (response) {
            if (200 === response.status) {
                var _a = response.data, errors = _a.errors, message = _a.message, messageType = _a.messageType, success = _a.success, vars = _a.vars;
                if (typeof success === 'undefined' ||
                    typeof errors === 'undefined' ||
                    typeof vars === 'undefined' ||
                    typeof messageType === 'undefined' ||
                    typeof message === 'undefined') {
                    return Promise.reject({ errorType: constants_1.WRONG_RESPONSE_ERROR });
                }
                if (true === success) {
                    return response;
                }
                if (errors.common) {
                    return Promise.reject({
                        errorType: constants_1.COMMON_ERROR,
                        messageType: messageType,
                        message: errors.common,
                    });
                }
                if (Object.keys(errors.validation).length > 0) {
                    return Promise.reject({
                        errorType: constants_1.VALIDATION_ERROR,
                        messageType: messageType,
                        errors: errors.validation,
                    });
                }
            }
        })
            .catch(function (error) {
            if (error instanceof Error) {
                switch (error.message) {
                    case 'Request failed with status code 404':
                        return Promise.reject({ errorType: constants_1.NOT_FOUND_ERROR });
                    case 'Request failed with status code 403':
                        return Promise.reject({ errorType: constants_1.NOT_AUTHORIZED_ERROR });
                    case 'Request aborted':
                        break;
                    default:
                        return Promise.reject({ errorType: constants_1.SERVER_ERROR });
                }
            }
            return Promise.reject(error);
        });
    };
    return ResponseService;
}(ts_axios_api_service_1.ResponseService));
exports.default = ResponseService;
//# sourceMappingURL=index.js.map