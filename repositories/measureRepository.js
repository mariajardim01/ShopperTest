import { db } from "../src/database.connection.js";


export async function checkExistingMeasure(measureType, customerCode) {
    try {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      const query = `
        SELECT m.measure_uuid 
        FROM measures m
        JOIN customers_measures cm ON m.measure_uuid = cm.measure_id
        WHERE m.measure_type = $1 
        AND cm.customer_code = $2
        AND m.measure_datetime >= $3
      `;
      
      const result = await db.query(query, [measureType, customerCode, firstDayOfMonth]);
      
      return result.rows.length > 0;
    } catch (error) {
      console.error("Erro ao verificar leituras existentes:", error);
      throw error;
    }
  }

export async function postPicture(imageURL, imageValue, imageType, customerCode, measureDatetime) {
    try {
      
      const hasExistingMeasure = await checkExistingMeasure(imageType, customerCode);
      
      if (hasExistingMeasure) {
        const response = {
          success: false,
          error_code: "DOUBLE_REPORT",
          error_description: "Leitura do mês já realizada"
        }
        return response
      }
      
      const result = await db.query(
        `INSERT INTO measures (measure_value, measure_type, image_url,measure_datetime) VALUES ($1, $2, $3,$4) RETURNING measure_uuid`,
        [imageValue, imageType, imageURL, measureDatetime]
      );
      
      const measureId = result.rows[0].measure_uuid;
      
      await db.query(
        `INSERT INTO customers_measures (measure_id, customer_code) VALUES ($1, $2)`,
        [measureId, customerCode]
      );
      
      return { 
        success: true,
        measure_uuid: measureId  
      }; 
    } catch (error) {
      console.log('Erro no armazenamento:', error);
      return { 
        success: false,
        error_code: "DB_ERROR",
        error_description: "Erro ao armazenar medição" 
      };
    }
  }

export async function getMeasure(measureId) {
  const getMeasure = await db.query("SELECT * FROM measures WHERE measure_uuid = $1", [measureId]);
  return getMeasure
  
}

export async function patchMeasure(measureValue, measureId) {
  await db.query(
    `UPDATE measures 
     SET measure_value = $1, confirmed = TRUE 
     WHERE measure_uuid = $2`,
     [measureValue, measureId]
  );
  
}
  