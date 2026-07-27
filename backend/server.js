const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/dist")));

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ,
});

// Records
app.post("/registro", async (req, res) => {
    const { cartao_numero, cartao_codigo, etiqueta, tipo, mesa, linea } = req.body;
    try {
        await pool.query(
            "INSERT INTO registros (cartao_numero, cartao_codigo, etiqueta, tipo, mesa, linea) VALUES ($1, $2, $3, $4, $5, $6)",
            [cartao_numero, cartao_codigo, etiqueta, tipo, mesa, linea]
        );
        res.send("Record saved successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

//  Users
app.get("/usuarios", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM usuarios ORDER BY nome");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.get("/usuarios/:cartao_codigo", async (req, res) => {
    const { cartao_codigo } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM usuarios WHERE cartao_codigo = $1",
            [cartao_codigo]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.post("/usuarios", async (req, res) => {
    const { cartao_numero, cartao_codigo, nome, rol } = req.body;
    try {
        await pool.query(
            "INSERT INTO usuarios (cartao_numero, cartao_codigo, nome, rol) VALUES ($1, $2, $3, $4)",
            [cartao_numero, cartao_codigo, nome, rol]
        );
        res.send("Employee added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.delete("/usuarios/:cartao_codigo", async (req, res) => {
    const { cartao_codigo } = req.params;
    try {
        await pool.query("DELETE FROM usuarios WHERE cartao_codigo = $1", [cartao_codigo]);
        res.send("Employee removed successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running at http://localhost:3000");
});