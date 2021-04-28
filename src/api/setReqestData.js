import axios from 'axios';

const template = require('app/resourse/template');

export function getAccessUserDetail() {
  return axios.get('https://geolocation-db.com/json/f9902210-97f0-11eb-a459-b997d30983f1').then((res) => {
    return res.data;
  });
}

export function facebookSetData(result) {
  const profile = template;
  const profileResult = result.additionalUserInfo.profile;
  profile.profile.name = profileResult.name;
  profile.profile.age = profileResult.age_range.min;
  profile.profile.birthday = profileResult.birthday;
  profile.profile.gender = profileResult.gender;
  profile.profile.email = profileResult.email;
  profile.profile.picture = profileResult.picture.data.url;
  profile.profile.provider = {
    facebookId: result.additionalUserInfo.providerId,
  };
  profile.profile.platform.website.version = '1.0.0';
  profile.profile.platform.website.is = true;

  profile.profile.socialId = {
    facebookId: profileResult.id,
  };

  (async () => {
    profile.profile.accessDevice = await getAccessUserDetail();
  })();
  return profile;
}

export function googleSetData(result) {
  const profile = template;
  const profileResult = result.additionalUserInfo.profile;
  profile.profile.email = profileResult.email;
  profile.profile.name = profileResult.name;
  profile.profile.locale = profileResult.locale;
  profile.profile.picture = profileResult.picture;
  profile.profile.platform.website.version = '1.0.0';
  profile.profile.platform.website.is = true;
  profile.profile.socialId = {
    googleId: profileResult.id,
  };
  profile.profile.provider = {
    googleId: result.additionalUserInfo.providerId,
  }(async () => {
    profile.profile.accessDevice = await getAccessUserDetail();
  })();
  return profile;
}
