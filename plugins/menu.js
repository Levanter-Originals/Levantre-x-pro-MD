const { cmd } = require("../command");
const axios = require("axios"); // URL එකෙන් audio download කරන්න

cmd(
{
  pattern: "menu",
  desc: "Displays menu",
  category: "main",
  filename: __filename,
},
async (danuwa, mek, m, { from }) => {
  try {
    // ===== Menu text + buttons =====
    let menuText = `「 ʟᴇᴠᴀɴᴛᴇʀ x ᴘʀᴏ ᴍᴅ 」

╭───────────
┊ 💠 ᴘʀᴏғɪx  .
┊ 💠 ᴠᴇʀsɪᴏɴ ғour
┊ 💠 ᴏᴡɴᴇʀ ᴛʜᴇᴇᴋsʜᴀɴᴀ ᴏғᴄ
┊ 💠 sᴜᴄᴄᴇssғᴜʟʏ ᴄᴏɴɴᴇᴄᴛᴇᴅ
╰───────────────────
╭───────────
┊  ➊ ʙᴜɢ ᴍᴇɴᴜ
┊  ➋ ᴏᴡɴᴇʀ ᴍᴇɴᴜ
┊  ➌ ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ
╰─────────────────
╭──────────────
┊ 🔴 ᴘᴜᴛ ᴛʜɪs ʟɪɴᴋ ᴀs ʏᴏᴜʀ sᴛᴀᴛᴜs.
┊ 🔴 ʟɪɴᴋ 👉🏻https://youtube.com/@levanteroriginals?si=3RTNDrNmoz0e-vMJ
┊          sᴜʙsᴄʀɪʙᴇ ᴛʜɪs ᴄʜᴀɴɴᴇʟ
┊ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴇᴠᴀɴᴛᴇʀ                  ᴛᴇᴄʜɴᴏʟᴏɢʏ
╰───────────────────`;

    const templateButtons = [  
      { index: 1, quickReplyButton: { displayText: "⬇ Download Menu", id: "downloadmenu" } },  
      { index: 2, urlButton: { displayText: "📺 YouTube", url: "https://youtube.com/@levanteroriginals" } }  
    ];  

    // ===== Send menu message with buttons =====
    await danuwa.sendMessage(from, {  
      text: menuText.trim(),
      footer: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴇᴠᴀɴᴛᴇʀ ᴛᴇᴄʜɴᴏʟᴏɢʏ",
      templateButtons: templateButtons
    }, { quoted: mek });

    // ===== Send audio from GitHub raw URL separately =====
    const audioUrl = "https://github.com/Levanter-Originals/Levantre-x-pro-MD/raw/refs/heads/main/LoGo/%F0%9D%97%A5%F0%9D%97%98%F0%9D%97%97%20%F0%9D%97%97%F0%9D%97%A5%F0%9D%97%94%F0%9D%97%9A%F0%9D%97%A2%F0%9D%97%A1%20%F0%93%86%A9%EA%A8%84%EF%B8%8E%F0%93%86%AA.mp3";
    
    const response = await axios.get(audioUrl, { responseType: "arraybuffer" });

    await danuwa.sendMessage(from, {  
      audio: Buffer.from(response.data),
      mimetype: "audio/mp4",
      ptt: true // true = voice note, false = normal audio
    }, { quoted: mek });

  } catch (err) {  
    console.error(err);  
    await danuwa.sendMessage(from, { text: "❌ Error showing menu or audio." }, { quoted: mek });  
  }
});
