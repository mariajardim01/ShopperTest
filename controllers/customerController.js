import errors from "../errors/BodyError.js"
import errorMeasure from "../errors/measureError.js"
import { getCustomerMeasures } from "../repositories/customerRepositories.js";

export async function GetList(req, res, next) {
    try {
      const measure_type = req.query.measure_type?.toUpperCase();
      const customer_code = req.params.customer_code;
  
      if (measure_type && measure_type !== "WATER" && measure_type !== "GAS") {
        throw errors.invalidBody();
      }
  
      const result = await getCustomerMeasures(customer_code, measure_type);
  
      if (result.rows.length === 0) {
        throw errorMeasure.measureNotFound(); 
      }
  
      return res.status(200).send({
        customer_code: customer_code,
        measures: result.rows
      });
      
    } catch (error) {
      console.error("Erro em GetList:", error);
      next(error); 
    }
  }
  