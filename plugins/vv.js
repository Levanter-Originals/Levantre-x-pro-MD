const { cmd } = require("../command");

cmd(
  {
    pattern: "vv ?(.*)",
    desc: "Anti ViewOnce (Unlock view once image, video, or audio)",
    category: "tools",
    filename: __filename,
  },
  async (danuwa, mek, m, { from, quoted }) => {
    try {
      // Check if user replied to a viewOnce message
      if (
        !m.quoted ||
        (!m.quoted.message.imageMessage &&
          !m.quoted.message.videoMessage &&
          !m.quoted.message.audioMessage)
      ) {
        return await danuwa.sendMessage(
          from,
          {
            text: "Usage: Reply to a ViewOnce image / video / audio and type: .vv",
          },
          { quoted: mek }
        );
      }

      // Forward the viewOnce media as normal
      await danuwa.sendMessage(
        from,
        {
          forward: m.quoted.fakeObj,
          viewOnce: false, // disable viewOnce
        },
        { quoted: mek }
      );
    } catch (err) {
      console.error(err);
      await danuwa.sendMessage(
        from,
        { text: "❌ Error unlocking ViewOnce media." },
        { quoted: mek }
      );
    }
  }
);
