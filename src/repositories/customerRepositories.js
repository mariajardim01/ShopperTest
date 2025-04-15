import { db } from "../database.connection.js";

export async function getCustomerMeasures(customer_code, measure_type, ) {
    let query = `
    SELECT cm.customer_code, m.*
    FROM customers_measures cm
    JOIN measures m ON cm.measure_id = m.measure_uuid
    WHERE cm.customer_code = $1
`;

const params = [customer_code];


if (measure_type) {
    query += " AND m.measure_type = $2";
    params.push(measure_type);
}

const result = await db.query(query, params);
return result
}