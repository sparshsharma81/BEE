const express = require("express");
const app = express();
const PORT = 5000;
const { generateOtp, verifyOtp } = require("@sparshsharma81/otp");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let savedOtp = ""; // In-memory storage (for demo only)

app.get("/", (req, res) => {
    res.send("Welcome to the OTP service");
});

app.get("/otp/generate", (req, res) => {
    try {
        savedOtp = generateOtp(4);
        res.status(200).json({ otp: savedOtp });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/otp/verify", (req, res) => {
    try {
        const { otp } = req.body;
        const result = verifyOtp(otp, savedOtp);
        res.status(200).json({ message: "User verified" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
