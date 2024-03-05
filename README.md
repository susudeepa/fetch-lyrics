# Fetch Lyrics

Easily fetch song lyrics from azlyrics.com!

## Installation

You can install the package via npm:

```bash
npm install fetch-lyrics
```

## Usage

```javascript
const getLyrics = require('fetch-lyrics');

// Example 1: Get lyrics for a specific song
getLyrics('Bohemian Rhapsody').then((lyrics) => {
    console.log(lyrics);
  // {
  //   title: '"Bohemian Rhapsody"  - Queen',
  //   lyrics: 'Is this the real life?\n' +
  //     'Is this just fantasy?\n' +
  //     'Caught in a landslide\n' +
  //     'No escape from reality\n' +
  //     ...
  // }
}).catch((error) => {
  console.error(error);
});
```

The function `getLyrics` takes a song title as an argument and returns a Promise that resolves to an object containing the title and lyrics of the song.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
