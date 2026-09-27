CREATE TABLE health_checks(
    id SERIAL PRIMARY KEY,

    service_id INT NOT NULL
    REFERENCES services(id)
    ON DELETE CASCADE,

    status_code INT,

    response_time_ms INT,

    is_healthy BOOLEAN NOT NULL,
    error_message TEXT,
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);