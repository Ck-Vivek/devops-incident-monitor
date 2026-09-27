const pool = require("../config/database");

const createService = async (userID, name, url, checkInterval) => {
  const result = await pool.query(
    `INSERT INTO services(user_id,name, url,check_interval)
        VALUES($1, $2, $3, $4)
        RETURNING *`,
    [userID, name, url, checkInterval],
  );

  return result.rows[0];
};

const getuserServices = async (userID) => {
  const result = await pool.query(
    `SELECT id, name,url,status,check_interval,created_at,updated_at
        FROM services
        WHERE user_id=$1
        ORDER BY created_at DESC`,
    [userID],
  );
  return result.rows;
};

const getserviceById = async (serviceId, userID) => {
  const result = await pool.query(
    `SELECT id, name, url, status, check_interval, created_at, updated_at
    FROM services
    WHERE id=$1 AND user_id=$2`,
    [serviceId, userID],
  );
  return result.rows[0];
};
const updateService=async(serviceID,userID,name,url,checkInterval)=>{
  const result=await pool.query(
    `UPDATE services
    SET name=$1, 
    url=$2, 
    check_interval=$3,
    updated_at=CURRENT_TIMESTAMP
    WHERE id=$4 AND user_id=$5
    RETURNING id,name,url,status,check_interval,created_at,updated_at`,
    [name,url,checkInterval,serviceID,userID]
  );
  return result.rows[0];
};

const deleteService= async(serviceID,userID)=>{
  const result =await pool.query(
    `DELETE FROM services
    WHERE id=$1 AND user_id=$2
    RETURNING id`,
    [serviceID,userID]
  );
  return result.rows[0];
}
module.exports = {
  createService,
  getuserServices,
  getserviceById,
  updateService,
  deleteService
};
