// errors/notFound.js
class AppError extends Error {
  constructor(code, description) {
    super(description);
    this.error_code = code;
    this.error_description = description;
  }
}

function measureNotFound() {
  return new AppError("MEASURE_NOT_FOUND", "Medida não encontrada");
}

function duplicatedConfirm() {
  return new AppError("CONFIRMATION_DUPLICATE", "Leitura do mês já realizada");
}

function doubleReport() {
  return new AppError("DOUBLE_REPORT", "Leitura do mês já realizada");
}

export default {
  measureNotFound,
  duplicatedConfirm,
  doubleReport
};
