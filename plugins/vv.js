const { cmd } = require("../command");

cmd(
  {
    pattern: "vv",
    desc: "Unlock View Once media (photo/video/voice)",
    category: "whatsapp",
    filename: __filename,
  },
  async (danuwa, mek, m, { reply }) => {
    try {
      if (!mek.quoted) {
        return reply("❌ Reply to a View Once photo/video/audio using .vv");
      }

      // Get the quoted full message
      let qmsg = mek.quoted.message || mek.quoted;

      // detect if it's a View Once
      let viewOnce =
        qmsg.viewOnceMessageV2 ||
        qmsg.viewOnceMessageV2Extension ||
        qmsg.viewOnce;

      if (!viewOnce) {
        return reply("⚠ This is not a View Once message!");
      }

      // extract actual media
      let realMsg = viewOnce.message;

      if (realMsg.imageMessage) {
        await danuwa.sendMessage(
          m.chat,
          { image: realMsg.imageMessage, caption: "📷 ViewOnce image unlocked!" },
          { quoted: mek }
        );
      } else if (realMsg.videoMessage) {
        await danuwa.sendMessage(
          m.chat,
          { video: realMsg.videoMessage, caption: "🎥 ViewOnce video unlocked!" },
          { quoted: mek }
        );
      } else if (realMsg.audioMessage) {
        await danuwa.sendMessage(
          m.chat,
          { audio: realMsg.audioMessage, mimetype: "audio/mpeg" },
          { quoted: mek }
        );
      } else {
        reply("❌ Unsupported ViewOnce message type!");
      }
    } catch (e) {
      console.error("VV PLUGIN ERROR:", e);
      reply("❌ Error while unlocking View Once media.");
    }
  }
);
