const { cmd } = require("../command");

cmd(
  {
    pattern: "menu",
    desc: "Displays menu",
    category: "main",
    filename: __filename,
  },
  async (
    danuwa,
    mek,
    m,
    {
      from,
      reply
    }
  ) => {
    try {
      let menuText = `
「 ʟᴇᴠᴀɴᴛᴇʀ x ᴘʀᴏ ᴍᴅ 」

╭───────────
┊ 💠 ᴘʀᴏғɪx  .
┊ 💠 ᴠᴇʀsɪᴏɴ ғour
┊ 💠 sᴜᴄᴄᴇssғᴜʟʏ ᴄᴏɴɴᴇᴄᴛᴇᴅ
┊ 💠 ᴏᴡɴᴇʀ ᴛʜᴇᴇᴋsʜᴀɴᴀ ᴏғᴄ
╰───────────────────

╭───────────────
┊ 🔴 ᴘᴜᴛ ᴛʜɪs ʟɪɴᴋ ᴀs ʏᴏᴜʀ sᴛᴀᴛᴜs.
┊ 🔴 *ʟɪɴᴋ 👉🏻https://youtube.com/@levanteroriginals?si=3RTNDrNmoz0e-vMJ*  
┊          sᴜʙsᴄʀɪʙᴇ ᴛʜɪs ᴄʜᴀɴɴᴇʟ
┊ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴇᴠᴀɴᴛᴇʀ                  ᴛᴇᴄʜɴᴏʟᴏɢʏ
╰───────────────────
      `;

      await reply(menuText.trim());
    } catch (err) {
      console.error(err);
      reply("❌ Error showing menu.");
    }
  }
);
