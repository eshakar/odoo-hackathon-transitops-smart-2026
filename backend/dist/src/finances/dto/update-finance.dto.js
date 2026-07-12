"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFinanceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_finance_dto_1 = require("./create-finance.dto");
class UpdateFinanceDto extends (0, swagger_1.PartialType)(create_finance_dto_1.CreateFinanceDto) {
}
exports.UpdateFinanceDto = UpdateFinanceDto;
//# sourceMappingURL=update-finance.dto.js.map