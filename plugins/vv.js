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
      if (
        !mek.quoted ||
        (!mek.quoted.viewOnce &&
          !mek.quoted.message?.viewOnceMessageV2 &&
          !mek.quoted.message?.viewOnceMessageV2Extension)
      ) {
        return reply(
          "❌ Reply to a View Once photo, video, or voice message using .vv"
        );
      }

      let msg = mek.quoted.message || mek.quoted;
      let viewOnceObj =
        msg.viewOnceMessageV2 ||
        msg.viewOnceMessageV2Extension ||
        msg.viewOnce;

      if (!viewOnceObj) {
        return reply("⚠ Can't find view once media content!");
      }

      // Extract original message inside
      let mediaMsg = viewOnceObj.message;

      if (mediaMsg.imageMessage) {
        await danuwa.sendMessage(
          m.chat,
          { image: mediaMsg.imageMessage, caption: "📷 ViewOnce image unlocked!" },
          { quoted: mek }
        );
      } else if (mediaMsg.videoMessage) {
        await danuwa.sendMessage(
          m.chat,
          { video: mediaMsg.videoMessage, caption: "🎥 ViewOnce video unlocked!" },
          { quoted: mek }
        );
      } else if (mediaMsg.audioMessage) {
        await danuwa.sendMessage(
          m.chat,
          { audio: mediaMsg.audioMessage, mimetype: "audio/mpeg" },
          { quoted: mek }
        );
      } else {
        reply("❌ Unsupported ViewOnce message type!");
      }
    } catch (e) {
      console.log("VV ERROR:", e);
      reply(❌ Error: ${e.message});
    }
  }
);
