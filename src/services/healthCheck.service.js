const axios = require("axios");
const pool = require("../config/database");

const checkServiceHealth = async (serviceId, userId) => {
    const serviceResult = await pool.query(
        `SELECT id, name, url
         FROM services
         WHERE id = $1 AND user_id = $2`,
        [serviceId, userId]
    );

    const service = serviceResult.rows[0];

    if (!service) {
        return null;
    }

    const startTime = Date.now();

    try {
        const response = await axios.get(service.url, {
            timeout: 5000
        });

        const responseTime = Date.now() - startTime;

        const result = await pool.query(
            `INSERT INTO health_checks
            (service_id, status_code, response_time_ms, is_healthy)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [
                service.id,
                response.status,
                responseTime,
                response.status >= 200 && response.status < 400
            ]
        );

        return result.rows[0];

    } catch (error) {
        const responseTime = Date.now() - startTime;

        const result = await pool.query(
            `INSERT INTO health_checks
            (service_id, status_code, response_time_ms, is_healthy, error_message)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [
                service.id,
                error.response?.status || null,
                responseTime,
                false,
                error.message
            ]
        );

        return result.rows[0];
    }
};

module.exports = {
    checkServiceHealth
};