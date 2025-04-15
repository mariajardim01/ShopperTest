import status from "http-status"

export async function errorHandler(error, req, res, next) {
    console.log("Error", error)
    if (error.error_code == 'INVALID_DATA') return res.status(400).json({
        error_code: error.error_code,
        error_description: error.error_description  // sendo array aqui está ok
      });
      if (error.error_code == "MEASURE_NOT_FOUND") return res.status(404).json({
        error_code: error.error_code,
        error_description: error.error_description  // sendo array aqui está ok
      });
      if (error.error_code === "CONFIRMATION_DUPLICATE") {
        return res.status(409).json({
          error_code: error.error_code,
          error_description: error.error_description
        });
      }

      if (error.error_code === "DOUBLE_REPORT") {
        return res.status(409).json({
          error_code: error.error_code,
          error_description: error.error_description
        });
      }

      if (error.error_code === "INVALID_TYPE") {
        return res.status(400).json({
          error_code: error.error_code,
          error_description: error.error_description
        });
      }

      console.error("Erro não tratado:", error);
  return res.status(status.INTERNAL_SERVER_ERROR).json({ message: "Erro interno do servidor" });
}
