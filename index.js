import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = 3001;


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "user", 
  password: "mycreations",
  port: 5432,
});
db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const server = http.createServer(app);


const io = new Server(server);


app.get("/", (req, res) => {
  res.render("home.ejs"); 
});

app.get("/login", (req, res) => {
  res.render("login.ejs"); 
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/logout", (req, res) => {
  
  res.redirect("/");
});


app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const queryCheckEmail = "SELECT * FROM username WHERE email = $1";
  const queryInsertUser = "INSERT INTO username (email, password) VALUES ($1, $2) RETURNING id";
  
  try {
    const { rows } = await db.query(queryCheckEmail, [email]);
    if (rows.length > 0) {
      res.render("register.ejs", { message: "User with this email already exists!" });
    } else {
      const { rows: insertedUserRows } = await db.query(queryInsertUser, [email, password]);
      const userId = insertedUserRows[0].id;
       res.redirect(`/main?userId=${userId}`);
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Error registering user");
  }
});


app.post("/login", async (req, res) => {
  const email = req.body["username"];
  const password = req.body["password"];
  const query = "SELECT * FROM username WHERE email = $1 AND password = $2";
  try {
    const { rows, rowCount } = await db.query(query, [email, password]);
    if (rowCount === 1) {
      const userId = rows[0].id;
      
      res.redirect(`/main?userId=${userId}`);
    } else {
      res.send("Invalid email or password");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
  }
});


app.get("/main", (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
   
    res.status(400).send("User ID is required");
    return;
  }
  res.render("main.ejs", { userId });
});


app.get("/user/:userId/notes", async (req, res) => {
  const userId = req.params.userId;
  try {
    const query = "SELECT note_text FROM note WHERE user_id = $1";
    const { rows } = await db.query(query, [userId]);
    res.render("notes.ejs", { notes: rows, userId });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).send("Error fetching notes");
  }
});
app.get("/groupchat", (req, res) => {
  res.render("groupchat.ejs"); 
});


app.post("/user/:userId/notes", async (req, res) => {
  const userId = req.params.userId;
  const noteText = req.body.notes;
  const query = "INSERT INTO note (user_id, note_text) VALUES ($1, $2)";
  try {
    await db.query(query, [userId, noteText]);
    res.redirect(`/user/${userId}/notes`);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).send("Error creating note");
  }
});


io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (data) => {
    // Broadcast the message along with the user ID to all clients
    io.emit("chat message", { userId: data.userId, message: data.message });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
