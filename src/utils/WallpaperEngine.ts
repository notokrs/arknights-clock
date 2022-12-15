import {DataChar, DataLoc, ImagesChar, ImagesLoc} from './Interface';

function getDataLoc(
  data: DataLoc<ImagesLoc[]>[],
  wallpaperPath: string,
  logoPath: string
) {
  const hours = new Date().getHours();
  let result = {} as DataLoc<string>;

  if (hours >= 0 && hours <= 2) {
    result = randomResultLoc(data, 'midnight', wallpaperPath, logoPath);
  } else if (hours >= 3 && hours <= 5) {
    result = randomResultLoc(data, 'dawn', wallpaperPath, logoPath);
  } else if (hours >= 6 && hours <= 10) {
    result = randomResultLoc(data, 'morning', wallpaperPath, logoPath);
  } else if (hours >= 11 && hours <= 14) {
    result = randomResultLoc(data, 'day', wallpaperPath, logoPath);
  } else if (hours >= 15 && hours <= 17) {
    result = randomResultLoc(data, 'afternoon', wallpaperPath, logoPath);
  } else if (hours >= 18 && hours <= 19) {
    result = randomResultLoc(data, 'evening', wallpaperPath, logoPath);
  } else if (hours >= 20 && hours <= 23) {
    result = randomResultLoc(data, 'night', wallpaperPath, logoPath);
  }

  return result;
}

function randomResultLoc(
  data: DataLoc<ImagesLoc[]>[],
  time: string,
  wallpaperPath: string,
  logoPath: string
) {
  let dataIndex = Math.floor(Math.random() * data.length);
  let imgResult: string[] = [];
  let randomResult = {} as DataLoc<string>;

  if (Object.keys(data[dataIndex].images.length >= 1)) {
    data[dataIndex].images.forEach((data: ImagesLoc) => {
      if (data.time === time) {
        imgResult.push(data.file);
      }
    });
  } else {
    randomResultLoc(data, time, wallpaperPath, logoPath);
  }

  if (imgResult.length > 1) {
    let imgRandomIndex = Math.floor(Math.random() * imgResult.length);

    randomResult = makeResultLoc(
      data[dataIndex].title,
      data[dataIndex].desc,
      logoPath + data[dataIndex].logo,
      wallpaperPath + time + '/' + imgResult[imgRandomIndex]
    );
  }

  if (imgResult.length === 1) {
    randomResult = makeResultLoc(
      data[dataIndex].title,
      data[dataIndex].desc,
      logoPath + data[dataIndex].logo,
      wallpaperPath + time + '/' + imgResult[0]
    );
  }

  return randomResult;
}

function randomResultChar(
  data: DataChar<ImagesChar[]>[],
  wallpaperPath: string,
  logoPath: string
) {
  const dataIndex = Math.floor(Math.random() * data.length);
  let imgResult: string[] = [];
  let randomResult = {} as DataChar<string>;

  if (Object.keys(data[dataIndex].images.length >= 1)) {
    data[dataIndex].images.forEach((data: ImagesChar) => {
      imgResult.push(data.file);
    });
  } else {
    randomResultChar(data, wallpaperPath, logoPath);
  }

  let folderName: string[];
  if (imgResult.length > 1) {
    const imgRandomIndex = Math.floor(Math.random() * imgResult.length);
    folderName = imgResult[imgRandomIndex].split('_');

    randomResult = makeResultChar(
      data[dataIndex].name,
      data[dataIndex].realName,
      data[dataIndex].organization,
      data[dataIndex].desc,
      logoPath + data[dataIndex].logo,
      wallpaperPath + folderName[0] + '/' + imgResult[imgRandomIndex]
    );
  }

  if (imgResult.length === 1) {
    folderName = imgResult[0].split('_');

    randomResult = makeResultChar(
      data[dataIndex].name,
      data[dataIndex].realName,
      data[dataIndex].organization,
      data[dataIndex].desc,
      logoPath + data[dataIndex].logo,
      wallpaperPath + folderName[0] + '/' + imgResult[0]
    );
  }

  return randomResult;
}

function makeResultLoc(
  title: string,
  desc: string,
  logo: string,
  images: string
) {
  return {
    title,
    desc,
    logo,
    images,
  };
}

function makeResultChar(
  name: string,
  realName: string,
  organization: string,
  desc: string,
  logo: string,
  images: string
) {
  return {
    name,
    realName,
    organization,
    desc,
    logo,
    images,
  };
}

async function checkInternet() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1000);

  try {
    return await fetch('https://google.com', {
      method: 'HEAD',
      cache: 'no-store',
      mode: 'no-cors',
      signal: controller.signal,
    });
  } finally {
    return clearTimeout(timeoutId);
  }
}

export {getDataLoc, randomResultChar, checkInternet};
