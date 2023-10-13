require("dotenv").config();
//const urlRoutes = require("./routes/url_routes");

const port = process.env.PORT;
const db = require("./db/db");
const express = require("express");
const app = express();
app.use(express.json());

async function startServer() {
  app.get("/urls/:id", async (req, res) => {
    try {
      urls = await db.selectUrlsForId(req.params.id);

      if (urls.length === 0) {
        console.log("não existem urls para esse id");
        res.status(204);
      } else {
        res.status(201).json(urls);
        // res.json(urls);
      }
    } catch (error) {
      console.log(error.message, "erro na rota get selectUrlsForId");
    }
  });

  try {
    app.get("/urls", async (req, res) => {
      const urls = await db.selectAllUrls();
      res.json(urls);
    });
  } catch (error) {
    console.log("erro na rota get selectAllUrls", error.message);
  }

  try {
    app.post("/urls", async (req, res) => {
      const urls = req.body;

      if (Object.keys(urls).length === 0) {
        console.log("não existem dados para inserir");
        res.status(204).send("não existem dados para inserir");
      } else {
        await db.insertUrl(req.body);
        console.log("inserido", req.body);
        res.status(201).send("inserido");
      }
    });
  } catch (error) {
    console.log(error.message, "erro na rota post de inserir URL");
  }

  try {
    app.patch("/urls/:id", async (req, res) => {
      const urls = req.body;

      console.log(urls);

      if (urls && urls.hasOwnProperty("is_active")) {
        if (typeof urls.is_active === "boolean") {
          await db.updateStatus(req.params.id, req.body);
          res.sendStatus(201);
        } else {
          console.log("JSON VAZIO");
          res.sendStatus(204);
        }
      } else {
        console.log("JSON inválido ou vazio");
        res.status(400).json({ error: "JSON inválido ou vazio" });
      }
    });
  } catch (error) {
    console.log(error.message, "erro na rota put de alterar status");
  }

  app.listen(port);

  console.log("HTTP Server Start");
}
startServer();
