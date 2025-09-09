const { cmd } = require("../command");

cmd(
  {
    pattern: 'vv',
    fromMe: true,
    desc: 'Unlock View-Once media (photo/video/audio)',
    category: 'whatsapp',
    filename: __filename,
  },
  async (levanter, mek, m, { reply, from, isOwner }) => {
    try {
      if (!mek.quoted) {
        return reply('❌ *Reply to a “View Once” photo/video/audio using .vv*');
      }

      const qmsg = mek.quoted.message || mek.quoted;
      const viewOnce =
        qmsg.viewOnceMessageV2 ||
        qmsg.viewOnceMessageV2Extension ||
        qmsg.viewOnce;

      if (!viewOnce) {
        return reply('⚠ That message is not a View Once media!');
      }

      const real = viewOnce.message;

      if (real.imageMessage) {
        await levanter.sendMessage(
          from,
          { image: real.imageMessage, caption: '📷 Unlocked Image' },
          { quoted: mek }
        );
      } else if (real.videoMessage) {
        await levanter.sendMessage(
          from,
          { video: real.videoMessage, caption: '🎥 Unlocked Video' },
          { quoted: mek }
        );
      } else if (real.audioMessage) {
        await levanter.sendMessage(
          from,
          {
            audio: real.audioMessage,
            mimetype: 'audio/mpeg',
            ptt: false,
          },
          { quoted: mek }
        );
      } else {
        return reply('❌ Unsupported media type!');
      }
    } catch (err) {
      console.error('VV PLUGIN ERROR', err);
      reply('❌ Error unlocking media!');
    }
  }
);
