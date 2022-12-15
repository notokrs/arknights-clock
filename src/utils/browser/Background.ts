import {BrowserSettings} from '../Interface';
import Browser from 'webextension-polyfill';

const settings: BrowserSettings = {
  loreLang: 'en',
  dateLang: 'en',
  offlineMode: false,
};

Browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    Browser.storage.sync.set(settings);
  }
});

export {};
