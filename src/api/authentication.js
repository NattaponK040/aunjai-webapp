import { auth, firebase } from 'app/repository/firebase';
import { facebookSetData, googleSetData } from 'app/api/setReqestData';
import { callFacebookRegisterApi, callGoogleRegisterApi } from 'app/api/register-api';

export async function LoginWithFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  await auth.signInWithPopup(provider).then(
    async (result) => {
      const token = await auth?.currentUser?.getIdToken(true);
      if (token) {
        localStorage.setItem('@sessionId', token);
        console.log(token);
        // const profile = validateProfile(result.additionalUserInfo.providerId, result.additionalUserInfo.profile.id, token)
        // if (profile) {
        //
        // } else {
        const tempData = facebookSetData(result);
        console.log(tempData);
        await callFacebookRegisterApi(tempData, token);
        // }
      }
    },
    function (error) {
      console.log(error);
    },
  );
}

export async function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider).then(
    async (result) => {
      const token = await auth?.currentUser?.getIdToken(true);
      if (token) {
        localStorage.setItem('@sessionId', token);
        // const profile = validateProfile(result.additionalUserInfo.providerId, result.additionalUserInfo.profile.id, token)
        // if (profile) {
        //
        // } else {
        const body = googleSetData(result);
        await callGoogleRegisterApi(body, token);
        // }
      }
    },
    function (error) {
      if (error) console.log(error);
    },
  );
}

export async function loginWithEmailPassword(email, password) {
  if (email && password) {
    return;
  }
  await auth.signInWithEmailAndPassword(email, password).then((user) => {
    user.user.getIdToken(true).then(
      async (token) => {
        if (token) {
          localStorage.setItem('@sessionId', token);
        }
      },
      function (error) {
        if (error) console.log(error);
      },
    );
  });
  // const provider = new firebase.auth.();
  // await auth.signInWithPopup(provider).then(
  //     async (result) => {
  //         const token = await auth?.currentUser?.getIdToken(true);
  //         if (token) {
  //             localStorage.setItem("@sessionId", token);
  //             // const profile = validateProfile(result.additionalUserInfo.providerId, result.additionalUserInfo.profile.id, token)
  //             // if (profile) {
  //             //
  //             // } else {
  //             const body = googleSetData(result);
  //             await callGoogleRegisterApi(body, token)
  //             // }
  //         }
  //     },
  //     function (error) {
  //         console.log(error);
  //     }
  // );
}
