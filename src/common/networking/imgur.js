import { authorize } from 'react-native-app-auth';

const authConfig = {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  serviceConfiguration: {
    authorizationEndpoint: "https://api.imgur.com/oauth2/authorize",
    tokenEndpoint: "https://api.imgur.com/oauth2/token"
  },
  redirectUrl: "com.epitcture://imgur/oauth"
}

export async function getAlbumImages(loginfo, albumId) {
  return fetch("https://api.imgur.com/3/album/" + albumId + "/images", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + loginfo.accessToken
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson.data;
  })
  .catch((error) => {
    console.error(error);
  });
}

export async function getImage(loginfo, imageHash) {
  return fetch("https://api.imgur.com/3/image/" + imageHash, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + loginfo.accessToken
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson.data;
  })
  .catch((error) => {
    console.error(error);
  });
}

export async function getUserFavorites(loginfo) {
  return fetch("https://api.imgur.com/3/account/me/favorites", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + loginfo.accessToken
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson.data;
  })
  .catch((error) => {
    console.error(error);
  });
}

export async function getUserImages(loginfo) {
  return fetch("https://api.imgur.com/3/account/me/images", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + loginfo.accessToken
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson.data;
  })
  .catch((error) => {
    console.error(error);
  });
}

export async function getUserAlbums(loginfo) {
  return fetch("https://api.imgur.com/3/account/me/albums", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + loginfo.accessToken
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson.data;
  })
  .catch((error) => {
    console.error(error);
  });
}

export async function favoriteAlbum(loginfo, albumId) {
  return fetch("https://api.imgur.com/3/album/" + albumId + "/favorite", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + loginfo.accessToken
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson.data;
  })
  .catch((error) => {
    console.error(error);
  });
}

export async function login() {
  let retval = {};
  try {
    const result = await authorize(authConfig);
    retval.accessToken = result.accessToken;
    retval.accessTokenExpirationDate = result.accessTokenExpirationDate;
    retval.accountUsername = result.tokenAdditionalParameters.account_username;
    retval.refreshToken = result.refreshToken;
  } catch (error) {
    console.error(error);
    retval.error = error;
  }
  return retval;
}

export async function searchGallery(loginfo, query) {
  return fetch("https://api.imgur.com/3/gallery/search?q=" + query, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + loginfo.accessToken
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson.data;
  })
  .catch((error) => {
    console.error(error);
  });
}

export async function uploadImageToAlbum(loginfo, albumId, image) {
  let data = new FormData();
  data.append('image', {
    name: image.fileName,
    type: image.type,
    uri: image.uri
  });
  data.append('album', albumId);
  data.append('type', image.type);
  data.append('title', image.fileName);
  return fetch("https://api.imgur.com/3/upload/", {
    method: "POST",
    headers: {
      Accept: "multipart/form-data",
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer " + loginfo.accessToken
    },
    body: data
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson.data;
  })
  .catch((error) => {
    console.error(error);
  });
}
