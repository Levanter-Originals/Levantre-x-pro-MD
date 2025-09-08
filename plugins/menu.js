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

      const buttonMessage = {
        text: menuText.trim(),
        footer: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴇᴠᴀɴᴛᴇʀ ᴛᴇᴄʜɴᴏʟᴏɢʏ",
        buttons: [
          {
            buttonId: "downloadmenu", // when clicked, it triggers this ID
            buttonText: { displayText: "⬇ Download Menu" },
            type: 1,
          },
        ],
        headerType: 1,
      };

      await danuwa.sendMessage(from, buttonMessage, { quoted: mek });

    } catch (err) {
      console.error(err);
      await danuwa.sendMessage(from, { text: "❌ Error showing menu with button." }, { quoted: mek });
    }
  }
);

