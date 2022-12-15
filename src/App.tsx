import {ChakraProvider} from '@chakra-ui/react';
import axios from 'axios';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Browser from 'webextension-polyfill';

// Style
import './style/style.css';

// Component
import DescriptionChar from './component/description/DescChar';
import DescriptionLoc from './component/description/DescLoc';
import Loader from './component/Loader';
import Logo from './component/Logo';
import Time from './component/Time';
import Toolbar from './component/toolbar/Toolbar';
import Wallpaper from './component/Wallpaper';

// Utils
import './utils/FontAwesome';
import {
  DataChar,
  DataLoc,
  DataSettings,
  PathSettings,
  BrowserSettings,
} from './utils/Interface';
import {
  dataOfflineEn,
  dataOfflineId,
  dataOnlineEn,
  dataOnlineId,
  pathOffline,
  pathOnline,
} from './utils/Variables';
import {
  checkInternet,
  getDataLoc,
  randomResultChar,
} from './utils/WallpaperEngine';

function App() {
  const [random, setRandom] = useState(Math.floor(Math.random() * 2));
  const [resultLoc, setResultLoc] = useState({} as DataLoc<string>);
  const [resultChar, setResultChar] = useState({} as DataChar<string>);
  const [loading, setLoading] = useState(true);

  // Chrome
  const pathSettings = useRef({} as PathSettings);
  const dataSettings = useRef({} as DataSettings);
  const [settings, setSettings] = useState({} as BrowserSettings);

  //Function
  const refresh = () => {
    setResultChar({} as DataChar<string>);
    setResultLoc({} as DataLoc<string>);

    if (random === 0) {
      setRandom(1);
    } else {
      setRandom(0);
    }
  };
  const changeLoreLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = event.target;
    Browser.storage.sync.set({loreLang: value}).then(() => {
      setSettings((prevSettings) => ({
        ...prevSettings,
        loreLang: value,
      }));
    });
  };
  const changeDateLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = event.target;
    Browser.storage.sync.set({dateLang: value}).then(() => {
      setSettings((prevSettings) => ({
        ...prevSettings,
        dateLang: value,
      }));
    });
  };
  const changeOfflineMode = () => {
    Browser.storage.sync.set({offlineMode: !settings.offlineMode}).then(() => {
      setSettings((prevSettings) => ({
        ...prevSettings,
        offlineMode: !prevSettings.offlineMode,
      }));
    });
  };
  const getWallpaper = useCallback(
    (dataSettings: DataSettings, pathSettings: PathSettings) => {
      if (random === 0) {
        axios
          .get(dataSettings.locUrl)
          .then((response: any) => {
            setResultLoc(
              getDataLoc(
                response.data,
                pathSettings.locWallPath,
                pathSettings.logoPath
              )
            );
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        axios
          .get(dataSettings.charUrl)
          .then((response: any) => {
            setResultChar(
              randomResultChar(
                response.data,
                pathSettings.charWallPath,
                pathSettings.logoPath
              )
            );
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [random]
  );
  const langSet = (loreLang?: string, isOnline?: boolean) => {
    if (isOnline) {
      switch (loreLang) {
        case 'en':
          dataSettings.current = dataOnlineEn;
          break;
        case 'id':
          dataSettings.current = dataOnlineId;
          break;
      }
    } else {
      switch (loreLang) {
        case 'en':
          dataSettings.current = dataOfflineEn;
          break;
        case 'id':
          dataSettings.current = dataOfflineId;
          break;
      }
    }
  };

  useEffect(() => {
    Browser.storage.sync
      .get({loreLang: 'en', dateLang: 'en', offlineMode: false})
      .then((result) => {
        setSettings({
          loreLang: result.loreLang,
          dateLang: result.dateLang,
          offlineMode: result.offlineMode,
        });
      });
  }, []);
  useEffect(() => {
    const getData = async () => {
      if (settings.offlineMode === true) {
        pathSettings.current = pathOffline;
        langSet(settings.loreLang, false);
      } else {
        await checkInternet()
          .then(() => {
            pathSettings.current = pathOnline;
            langSet(settings.loreLang, true);
          })
          .catch(() => {
            pathSettings.current = pathOffline;
            langSet(settings.loreLang, false);
          });
      }

      if (Object.keys(dataSettings.current).length >= 1) {
        getWallpaper(dataSettings.current, pathSettings.current);
      }
    };

    getData();
  }, [getWallpaper, settings.loreLang, settings.offlineMode]);

  // Component
  const time = <Time dateLang={settings.dateLang} />;
  const toolbar = (
    <Toolbar
      refresh={refresh}
      settings={settings}
      changeLoreLang={changeLoreLang}
      changeOfflineMode={changeOfflineMode}
      changeDateLang={changeDateLang}
    />
  );
  let logo: JSX.Element;
  let desc: JSX.Element;
  let wallpaper: JSX.Element;

  if (random === 0) {
    logo = <Logo logo={resultLoc.logo} title={resultLoc.title} />;
    desc = <DescriptionLoc title={resultLoc.title} desc={resultLoc.desc} />;
    wallpaper = <Wallpaper images={resultLoc.images} />;
  } else {
    logo = <Logo logo={resultChar.logo} title={resultChar.organization} />;
    desc = (
      <DescriptionChar
        name={resultChar.name}
        realName={resultChar.realName}
        desc={resultChar.desc}
      />
    );
    wallpaper = <Wallpaper images={resultChar.images} />;
  }

  if (loading) return <Loader />;
  return (
    <div className="show">
      <ChakraProvider>
        {time}
        {toolbar}
        {logo}
        {desc}
        {wallpaper}
      </ChakraProvider>
    </div>
  );
}

export default App;
