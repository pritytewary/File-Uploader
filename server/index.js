const express = require("express");
const cors = require("cors");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/files");
  },
  filename: function (req, file, cb) {
    const uniqueID = crypto.randomUUID();

    const ext = path.extname(file.originalname);

    cb(null, `${uniqueID}${ext}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  // Assuming the response contains the filename
  const filename = req.file.filename;
  // Construct the URL for the file
  const fileUrl = `/files/${filename}`;
  // Send the file URL as response
  res.json({ url: fileUrl });
});

// Serve uploaded files statically
app.use("/files", express.static(path.join(__dirname, "public/files")));

app.listen(3000, () => {
  console.log("Server is running");
});
