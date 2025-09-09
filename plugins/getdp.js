const { cmd } = require("../command");

cmd(
  {
    pattern: "getdp",
    fromMe: true,
    desc: "Get WhatsApp profile picture using number or reply",
    category: "main",
    filename: __filename,
  },
  async (bot, mek, m, { reply, from, args }) => {
    try {
      let jid;

      // If user replies to a message
      if (mek.quoted) {
        jid = mek.quoted.sender;
      }
      // If user provides a number
      else if (args && args[0]) {
        let number = args[0].replace(/[^0-9]/g, ""); // remove non-digit chars
        jid = number + "@s.whatsapp.net";
      }
      // Default: sender
      else {
        jid = m.sender;
      }

      // Fetch profile picture URL
      const ppUrl = await bot.profilePictureUrl(jid).catch(() => null);

      if (!ppUrl) {
        return reply("❌ Could not fetch profile picture or user has no DP.");
      }

      // Send profile picture
      await bot.sendMessage(
        from,
        { image: { url: ppUrl }, caption: 📷 Profile picture of @${jid.split("@")[0]} },
        { quoted: mek }
      );
    } catch (err) {
      console.error("GETDP ERROR:", err);
      reply("❌ Error fetching profile picture.");
    }
  }
);
