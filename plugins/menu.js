const { cmd } = require("../command");

cmd(
  {
    pattern: "menu",
    desc: "Displays menu",
    category: "main",
    filename: __filename,
  },
  async (danuwa, mek, m, { from }) => {
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

      const templateButtons = [
        { index: 1, quickReplyButton: { displayText: "⬇ Download Menu", id: "downloadmenu" } },
        { index: 2, urlButton: { displayText: "📺 YouTube", url: "https://youtube.com/@levanteroriginals" } }
      ];

      const buttonMessage = {
        text: menuText.trim(),
        footer: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴇᴠᴀɴᴛᴇʀ ᴛᴇᴄʜɴᴏʟᴏɢʏ",
        templateButtons: templateButtons
      };

      await danuwa.sendMessage(from, buttonMessage, { quoted: mek });

    } catch (err) {
      console.error(err);
      await danuwa.sendMessage(from, { text: "❌ Error showing menu with button." }, { quoted: mek });
    }
  }
);
