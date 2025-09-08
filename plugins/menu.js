const { cmd } = require("../command");

cmd(
  {
    pattern: "menu",
    desc: "Displays menu",
    category: "main",
    filename: __filename,
  },
  async (danuwa, mek, m, { from, reply }) => {
    try {
      let menuText = `
「 ʟᴇᴠᴀɴᴛᴇʀ x ᴘʀᴏ ᴍᴅ 」

╭───────────
┊ 💠 *ᴘʀᴏғɪx  .*
┊ 💠 *ᴠᴇʀsɪᴏɴ ғour*
┊ 💠 *ᴏᴡɴᴇʀ ᴛʜᴇᴇᴋsʜᴀɴᴀ ᴏғᴄ*
┊ 💠 *sᴜᴄᴄᴇssғᴜʟʏ ᴄᴏɴɴᴇᴄᴛᴇᴅ*
╰───────────────────

╭───────────────
┊ 🔴 *ᴘᴜᴛ ᴛʜɪs ʟɪɴᴋ ᴀs ʏᴏᴜʀ sᴛᴀᴛᴜs.*
┊ 🔴 *ʟɪɴᴋ 👉🏻https://youtube.com/@levanteroriginals?si=3RTNDrNmoz0e-vMJ*  
┊          *sᴜʙsᴄʀɪʙᴇ ᴛʜɪs ᴄʜᴀɴɴᴇʟ
┊ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴇᴠᴀɴᴛᴇʀ                  ᴛᴇᴄʜɴᴏʟᴏɢʏ*
╰───────────────────
`;

      const buttons = [
        {
          buttonId: "downloadmenu", // button pattern
          buttonText: { displayText: "⬇ Download Menu" },
          type: 1,
        },
      ];

      const buttonMessage = {
        text: menuText.trim(),
        footer: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴇᴠᴀɴᴛᴇʀ ᴛᴇᴄʜɴᴏʟᴏɢʏ",
        buttons: buttons,
        headerType: 1,
      };

      await danuwa.sendMessage(from, buttonMessage, { quoted: mek });

    } catch (err) {
      console.error(err);
      reply("❌ Error showing menu with button.");
    }
  }
);
