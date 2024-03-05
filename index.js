/**
 * Fetches the lyrics for a given song title from azlyrics.com.
 * @param {string} title - The title of the song to fetch lyrics for.
 * @returns {Promise<object>} A promise that resolves to an object containing the title and lyrics of the song.
 * @throws {Error} If fetching lyrics fails or no lyrics are found for the given title.
 */
async function getLyrics(title) {
  try {
    const res = await fetch(
      `https://search.azlyrics.com/suggest.php?q=${encodeURIComponent(title)}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch search results. Status: ${res.status}`);
    }

    const search = await res.json();

    if (!search || !search.songs || search.songs.length === 0) {
      throw new Error(`No songs found for "${title}"`);
    }

    const r = await fetch(search.songs[0].url);

    if (!r.ok) {
      throw new Error(`Failed to fetch lyrics. Status: ${r.status}`);
    }

    const htmlText = await r.text();
    const indexOfComment = htmlText.indexOf(
      "Usage of azlyrics.com content by any third-party lyrics provider is prohibited by our licensing agreement. Sorry about that."
    );
    const startIndex = htmlText.lastIndexOf("<div", indexOfComment);
    const endIndex = htmlText.indexOf("</div>", indexOfComment) + 6;
    const lyrics = htmlText
      .substring(startIndex, endIndex)
      .replace(/<!--[^>]*-->/g, "")
      .replace(/<br>/g, "")
      .replace(/<\/?div[^>]*>/g, "")
      .trim();

    return {
      title: search.songs[0].autocomplete,
      lyrics: lyrics,
    };
  } catch (error) {
    throw new Error(`Failed to get lyrics for "${title}": ${error.message}`);
  }
}

module.exports = { getLyrics };