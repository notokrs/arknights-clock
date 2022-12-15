import React from 'react';

// Engine
interface DataLoc<T> {
  title: string;
  desc: string;
  logo: string;
  images: T;
}

interface ImagesLoc {
  time: string;
  file: string;
}

interface DataChar<T> {
  name: string;
  realName: string;
  organization: string;
  desc: string;
  logo: string;
  images: T;
}

interface ImagesChar {
  file: string;
}

interface DataSettings {
  locUrl: string;
  charUrl: string;
}

interface PathSettings {
  locWallPath: string;
  charWallPath: string;
  logoPath: string;
}

//Chrome
interface BrowserSettings {
  loreLang?: string;
  dateLang?: string;
  offlineMode?: boolean;
}

// Props
interface TimeProps {
  dateLang?: string;
}

interface SettingsProp {
  settings: BrowserSettings;
  changeLoreLang: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  changeOfflineMode: () => void;
  changeDateLang: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface LogoProps {
  logo: string;
  title: string;
}

interface ToolbarProps extends SettingsProp {
  refresh: () => void;
}

interface WallpaperProps {
  images: string;
}

interface DescLocProps {
  title: string;
  desc: string;
}

interface DescCharProps {
  name: string;
  realName: string;
  desc: string;
}

export type {
  DataLoc,
  ImagesLoc,
  DataChar,
  ImagesChar,
  DataSettings,
  PathSettings,
  BrowserSettings,
  TimeProps,
  SettingsProp,
  LogoProps,
  ToolbarProps,
  WallpaperProps,
  DescLocProps,
  DescCharProps,
};
