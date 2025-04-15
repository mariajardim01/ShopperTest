CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS measures (
    measure_uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    measure_value INTEGER NOT NULL,
    measure_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    measure_type TEXT CHECK (measure_type IN ('WATER', 'GAS')),
    image_url TEXT,
    confirmed BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS customers_measures (
    customer_code TEXT,
    measure_id UUID REFERENCES measures(measure_uuid) ON DELETE CASCADE,
    PRIMARY KEY (customer_code, measure_id)
);
