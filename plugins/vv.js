const { cmd } = require("../command");

cmd(
  {
    pattern: "vv",
    fromMe: true,
    desc: "View Once media unlocker",
    category: "whatsapp",
    filename: __filename,
  },
  async (danuwa, mek, m, { reply }) => {
    try {
      if (!mek.quoted) {
        return reply("❌ Reply to a View Once photo / video / audio using .vv");
      }

      // find inside quoted message
      let msg = mek.quoted.message || mek.quoted;
      let viewOnceObj =
        msg.viewOnceMessageV2 ||
        msg.viewOnceMessageV2Extension ||
        msg.viewOnce;

      if (!viewOnceObj) {
        return reply("⚠ This is not a View Once media!");
      }

      // real content
      let mediaMsg = viewOnceObj.message;

      if (mediaMsg.imageMessage) {
        await danuwa.sendMessage(
          m.chat,
          { image: mediaMsg.imageMessage, caption: "📷 View Once image unlocked!" },
          { quoted: mek }
        );
      } else if (mediaMsg.videoMessage) {
        await danuwa.sendMessage(
          m.chat,
          { video: mediaMsg.videoMessage, caption: "🎥 View Once video unlocked!" },
          { quoted: mek }
        );
      } else if (mediaMsg.audioMessage) {
        await danuwa.sendMessage(
          m.chat,
          { audio: mediaMsg.audioMessage, mimetype: "audio/mpeg" },
          { quoted: mek }
        );
      } else {
        reply("❌ Unsupported View Once type!");
      }
    } catch (err) {
      console.error("VV ERROR:", err);
      await reply("❌ Error unlocking View Once media.");
    }
  }
);
