const { cmd } = require("../command");

cmd(
  {
    on: "message", // Auto run for all messages
    fromMe: false,
    filename: __filename,
  },
  async (bot, mek, m) => {
    try {
      const msg = m.message;
      if (!msg) return;

      // Check for View Once wrapper
      const viewOnce =
        msg.viewOnceMessageV2 ||
        msg.viewOnceMessageV2Extension ||
        msg.viewOnce;

      if (!viewOnce) return; // Not a View Once message

      // Extract real media
      const real = viewOnce.message || {};

      // Send it back to same chat
      if (real.imageMessage) {
        await bot.sendMessage(
          m.chat,
          { image: real.imageMessage, caption: `📷 Auto-unlocked image from ${m.pushName || m.sender}` },
          { quoted: m }
        );
      } else if (real.videoMessage) {
        await bot.sendMessage(
          m.chat,
          { video: real.videoMessage, caption: `🎥 Auto-unlocked video from ${m.pushName || m.sender}` },
          { quoted: m }
        );
      } else if (real.audioMessage) {
        await bot.sendMessage(
          m.chat,
          { audio: real.audioMessage, mimetype: "audio/mpeg" },
          { quoted: m }
        );
      }
    } catch (err) {
      console.error("AUTO-VV ERROR:", err);
    }
  }
);
