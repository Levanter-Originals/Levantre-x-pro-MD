const { cmd } = require("../command");
const getFbVideoInfo = require("@xaviabot/fb-downloader");

cmd(
  {
    pattern: "fb",
    alias: ["facebook", "fbdl"],
    react: "📥",
    desc: "Download Facebook videos easily",
    category: "download",
    filename: __filename,
  },
  async (
    danuwa,
    mek,
    m,
    {
      from,
      args,
      q,
      reply,
    }
  ) => {
    try {
      if (!q)
        return reply(
          "❌ Please provide a valid Facebook video URL!\n\n📌 Example: _.fb https://fb.watch/example_"
        );

      const fbRegex = /(https?:\/\/)?(www\.)?(facebook|fb)\.com\/.+/;
      if (!fbRegex.test(q))
        return reply("⚠ Invalid Facebook URL!\n\n👉 Try again with a correct link.");

      // Inform user
      await reply("⏳ Fetching your video, please wait...");

      // Get video info
      const result = await getFbVideoInfo(q);
      if (!result || (!result.sd && !result.hd)) {
        return reply("😔 Video download failed!\nPlease try again later.");
      }

      const { title, sd, hd } = result;
      const bestQualityUrl = hd || sd;
      const qualityText = hd ? "HD" : "SD";

      // Info Card
      const captionText = `
🎥 Facebook Video Downloader
────────────────────
✨ Title: ${title || "Unknown"}
🎚 Quality: ${qualityText}
🌐 Source: Facebook
────────────────────
⏬ Downloading your video below...
`;

      await danuwa.sendMessage(
        from,
        {
          image: {
            url: "https://i.ibb.co/mBL2B94/facebook.png", // better fb logo
          },
          caption: captionText,
        },
        { quoted: mek }
      );

      // Send video
      await danuwa.sendMessage(
        from,
        {
          video: { url: bestQualityUrl },
          caption: ✅ *Here is your video in ${qualityText} quality*,
          buttons: [
            {
              buttonId: .fb ${q},
              buttonText: { displayText: "🔁 Download Again" },
              type: 1,
            },
            {
              buttonId: .menu,
              buttonText: { displayText: "🏠 Back to Menu" },
              type: 1,
            },
          ],
          headerType: 4,
        },
        { quoted: mek }
      );

      return reply("💝 Thanks for using DANUWA-MD Facebook Downloader!");
    } catch (e) {
      console.error(e);
      reply(🚨 *Error Occurred!*\n\n📌 Details: ${e.message || e});
    }
  }
);
