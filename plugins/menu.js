const { cmd, commands } = require("../command");

cmd(
  {
    pattern: "menu",
    alise: ["getmenu"],
    desc: "get cmd list",
    category: "main",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      const config = await readEnv();
      let menu = {
        main: "",
        download: "",
        group: "",
        owner: "",
        convert: "",
        search: "",
      };

      for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern && !commands[i].dontAddCommandList) {
          menu[
            commands[i].category
          ] += ${config.PREFIX}${commands[i].pattern}\n;
        }
      }

      let madeMenu = `「 ʟᴇᴠᴀɴᴛᴇʀ x ᴘʀᴏ ᴍᴅ 」

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
╰───────────────────`;

      await robin.sendMessage(
        from,
        {
          image: {
            url: "https://raw.githubusercontent.com/Levanter-Originals/Levantre-x-pro-MD/refs/heads/main/LoGo/Connected.jpg",
          },
          caption: madeMenu,
          buttons: [
            {
              buttonId: "download_menu",
              buttonText: { displayText: "📥 Download Menu" },
              type: 1,
            },
            {
              buttonId: "owner_menu",
              buttonText: { displayText: "👑 Owner Menu" },
              type: 1,
            },
          ],
          headerType: 4,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
      reply(${e});
    }
  }
);

// 📥 Download Menu
cmd(
  {
    pattern: "download_menu",
    dontAddCommandList: true,
  },
  async (robin, mek, m, { from, reply }) => {
    try {
      const config = await readEnv();
      let menu = {
        download: "",
      };
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern && commands[i].category === "download") {
          menu.download += ${config.PREFIX}${commands[i].pattern}\n;
        }
      }
      await reply("📥 Download Menu \n\n" + menu.download);
    } catch (e) {
      reply("❌ Error showing Download Menu");
    }
  }
);

// 👑 Owner Menu
cmd(
  {
    pattern: "owner_menu",
    dontAddCommandList: true,
  },
  async (robin, mek, m, { from, reply }) => {
    try {
      const config = await readEnv();
      let menu = {
        owner: "",
      };
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern && commands[i].category === "owner") {
          menu.owner += ${config.PREFIX}${commands[i].pattern}\n;
        }
      }
      await reply("👑 Owner Menu \n\n" + menu.owner);
    } catch (e) {
      reply("❌ Error showing Owner Menu");
    }
  }
);
