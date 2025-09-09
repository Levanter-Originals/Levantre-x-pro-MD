const { cmd } = require("../command");
const yts = require("yt-search");
const { ytmp3 } = require("@vreden/youtube_scraper");

cmd(
  {
    pattern: "song",
    react: "🎶",
    desc: "Download Song",
    category: "download",
    filename: __filename,
  },
  async (
    danuwa,
    mek,
    m,
    {
      from,
      q,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("❌ Please provide a song name or YouTube link");

      // Search video
      const search = await yts(q);
      if (!search.videos || !search.videos.length) {
        return reply("❌ No results found!");
      }
      const data = search.videos[0];
      const url = data.url;

      // Send info
      let desc = `
🎶 Song Downloader
🎬 Title: ${data.title}
⏱ Duration: ${data.timestamp || "N/A"}
📅 Uploaded: ${data.ago}
👀 Views: ${data.views.toLocaleString()}
🔗 Watch Here: ${data.url}
      `;

      await danuwa.sendMessage(
        from,
        { image: { url: data.thumbnail }, caption: desc },
        { quoted: mek }
      );

      // Get MP3 download link
      const quality = "192";
      const songData = await ytmp3(url, quality);

      if (!songData || !songData.url) {
        return reply("❌ Failed to fetch download link.");
      }

      // Check duration (avoid live/long videos)
      let totalSeconds = 0;
      if (data.timestamp && data.timestamp.includes(":")) {
        let parts = data.timestamp.split(":").map(Number);
        totalSeconds =
          parts.length === 3
            ? parts[0] * 3600 + parts[1] * 60 + parts[2]
            : parts[0] * 60 + parts[1];
      }

      if (totalSeconds > 1800) {
        return reply("⏳ Sorry, audio files longer than 30 minutes are not supported.");
      }

      // Send as audio
      await danuwa.sendMessage(
        from,
        {
          audio: { url: songData.url },
          mimetype: "audio/mpeg",
          fileName: ${data.title}.mp3,
        },
        { quoted: mek }
      );

      // (Optional) also send as document
      await danuwa.sendMessage(
        from,
        {
          document: { url: songData.url },
          mimetype: "audio/mpeg",
          fileName: ${data.title}.mp3,
          caption: "🎶 Your song is ready!",
        },
        { quoted: mek }
      );

      return reply("✅ Download complete!");
    } catch (e) {
      console.log("SONG ERROR:", e);
      reply(❌ *Error:* ${e.message || e} 😞);
    }
  }
);
