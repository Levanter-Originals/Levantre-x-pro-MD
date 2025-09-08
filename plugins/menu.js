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

      await danuwa.sendMessage(from, {
        text: menuText.trim(),
        footer: "Select one option below 👇",
        buttons: [
          { buttonId: "select_menu", buttonText: { displayText: "📂 Select Menu" }, type: 1 }
        ],
        headerType: 4
      });
    } catch (err) {
      console.error(err);
      reply("❌ Error showing menu.");
    }
  }
);

// --- Extra handler for "Select Menu" button ---
cmd(
  {
    pattern: "select_menu",
    desc: "Show extra menu options",
    category: "main",
    filename: __filename,
  },
  async (danuwa, mek, m, { from }) => {
    await danuwa.sendMessage(from, {
      text: "📋 Choose an option:",
      footer: "Select your menu 👇",
      buttons: [
        { buttonId: "download_menu", buttonText: { displayText: "⬇ Download Menu" }, type: 1 },
        { buttonId: "owner_menu", buttonText: { displayText: "👑 Owner Menu" }, type: 1 }
      ],
      headerType: 4
    });
  }
);
