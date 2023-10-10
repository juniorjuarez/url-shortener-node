const { randomUUID } = require("crypto");

async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }
  const { Pool } = require("pg");
  const pool = new Pool({
    connectionString: process.env.CONECTION_STRING,
  });

  const client = await pool.connect();

  console.log("criou o pool de conexão");

  const res = await client.query("select now()");

  console.log(res.rows[0]);

  client.release();

  global.connection = pool;

  return pool.connect();
}

connect();

async function selectAllUrls() {
  try {
    const url = await connect();
    const res = await url.query("select * from url_shortener");
    return res.rows;
  } catch (error) {
    console.log(error.message, "Erro no select");
  }
}

async function selectUrlsForId(id) {
  try {
    const url = await connect();
    const res = await url.query("select * from url_shortener where id=$1", [
      id,
    ]);
    return res.rows;
  } catch (error) {
    console.log(error.message, "Erro no select por ID");
  }
}

async function insertUrl(newUrl) {
  try {
    const shortened_url = randomUUID();
    const url = await connect();
    await url.query(
      "INSERT INTO url_shortener (original_url, shortened_url, clicks) VALUES ($1, $2, $3)",
      [newUrl.original_url, shortened_url, 0]
    );
  } catch (error) {
    console.log("Erro no INSERT de URL:", error.message);
  }
}
async function updateStatus(id, dataUrl) {
  try {
    const url = await connect();

    await url.query("update url_shortener set is_active = $1 where id = $2", [
      dataUrl.is_active,
      id,
    ]);
  } catch (error) {
    console.log("Erro no UPDATE de STATUS:", error.message);
  }
}

module.exports = {
  selectAllUrls,
  selectUrlsForId,
  insertUrl,
  updateStatus,
  connect,
};
