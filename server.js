const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Get all posts
app.get("/api/posts", (req, res) => {
    const postsDir = path.join(__dirname, "posts");

    fs.readdir(postsDir, (err, files) => {
        if (err) return res.status(500).json({ error: "Error reading posts" });

        const posts = files.map(file => {
            const data = fs.readFileSync(path.join(postsDir, file));
            return JSON.parse(data);
        });

        res.json(posts);
    });
});

// Add new post
app.post("/api/posts", (req, res) => {
    const newPost = req.body;

    const fileName = `post-${Date.now()}.json`;
    const filePath = path.join(__dirname, "posts", fileName);

    fs.writeFileSync(filePath, JSON.stringify(newPost, null, 2));

    res.json({ message: "Post created!" });
});

app.listen(PORT, () => {
    console.log(`WellBeing Lab running on http://localhost:${PORT}`);
});