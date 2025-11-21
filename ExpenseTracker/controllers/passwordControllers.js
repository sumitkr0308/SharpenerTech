const Sib = require("sib-api-v3-sdk");
require("dotenv").config();

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) return res.status(400).json({ message: "Email required" });

        // Configure SendinBlue
        const client = Sib.ApiClient.instance;
        client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

        const tranEmailApi = new Sib.TransactionalEmailsApi();

        const sender = {
            email: "sumit2k30@gmail.com",
            name: "Expense Tracker"
        };

        const receivers = [
            { email }
        ];

        await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: "Password Reset Request",
            htmlContent: "<h3>This is a dummy email from SendinBlue for testing password reset.</h3>"
        });

        res.json({ message: "Dummy email sent!" });

    } catch (error) {
        console.log(error);
           console.error("BREVO ERROR DETAILS →");
    console.error("error.message:", error.message);
    console.error("error.response?.text:", error.response?.text);
    console.error("error.response?.body:", error.response?.body);
    console.error("FULL ERROR:", error);
        res.status(500).json({ message: "Error sending email" });
    }
};
