/**
 * 
 * Base class for response
 * 
 * @class BaseResponse
 */
class BaseResponse {
    constructor() {
        this.codeMap = new Map([
            [-1, 'Fail'],
            [200, 'Success'],
            [401, 'UnLogin'],
            [404, 'NotFound'],
            [405, 'BadRequest'],
            [500, 'ServerError']
        ]);
        this.respSuccess = this.respSuccess.bind(this);
        this.respFail = this.respFail.bind(this);
    }
    respSuccess(data) {
        return Object.assign({
            code: 200,
            message: this.codeMap.get(200),
        }, data || {})
    }
    respFail(code, msg, data) {
        return {
            code: code || -1,
            message: msg || this.codeMap.get(code),
            data: data || null
        }
    }
}

module.exports = new BaseResponse();