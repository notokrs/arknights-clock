import {DataSettings, PathSettings} from './Interface';

const pathOffline: PathSettings = {
  locWallPath: './assets/img/time/',
  charWallPath: './assets/img/character/',
  logoPath: './assets/img/logo/',
};
const pathOnline: PathSettings = {
  locWallPath:
    'https://raw.githubusercontent.com/notokrs/arknights-clock-resources/master/assets/img/time/',
  charWallPath:
    'https://raw.githubusercontent.com/notokrs/arknights-clock-resources/master/assets/img/character/',
  logoPath:
    'https://raw.githubusercontent.com/notokrs/arknights-clock-resources/master/assets/img/logo/',
};
const dataOfflineEn: DataSettings = {
  locUrl: './data/location-en.json',
  charUrl: './data/character-en.json',
};
const dataOnlineEn: DataSettings = {
  locUrl:
    'https://raw.githubusercontent.com/notokrs/arknights-clock-resources/master/data/location-en.json',
  charUrl:
    'https://raw.githubusercontent.com/notokrs/arknights-clock-resources/master/data/character-en.json',
};

const dataOfflineId: DataSettings = {
  locUrl: './data/location-id.json',
  charUrl: './data/character-id.json',
};

const dataOnlineId: DataSettings = {
  locUrl:
    'https://raw.githubusercontent.com/notokrs/arknights-clock-resources/master/data/location-id.json',
  charUrl:
    'https://raw.githubusercontent.com/notokrs/arknights-clock-resources/master/data/character-id.json',
};

export {
  pathOffline,
  pathOnline,
  dataOfflineEn,
  dataOnlineEn,
  dataOfflineId,
  dataOnlineId,
};
