import jsfxr from 'jsfxr';

// Generate sounds
const placeParams = jsfxr.sfxr.generate('pickupCoin');
const winParams = jsfxr.sfxr.generate('powerUp');
const drawParams = jsfxr.sfxr.generate('explosion');

const placeSound = new jsfxr.SoundEffect(placeParams);
const winSound = new jsfxr.SoundEffect(winParams);
const drawSound = new jsfxr.SoundEffect(drawParams);

// Get data URIs
const placeDataURI = placeSound.generate().dataURI;
const winDataURI = winSound.generate().dataURI;
const drawDataURI = drawSound.generate().dataURI;

// Print data URIs
console.log(`place_data_uri: ${placeDataURI}`);
console.log(`win_data_uri: ${winDataURI}`);
console.log(`draw_data_uri: ${drawDataURI}`);