import axios from 'axios';

export async function callFacebookRegisterApi(body, token) {
  await axios
    .post('http://localhost:8080/register-facebook', body, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function callGoogleRegisterApi(body, token) {
  await axios
    .post('http://localhost:8080/register-google', body, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function callRegisterAccountAPI(body) {
  await axios
    .post('http://localhost:8080/register-email', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function validateProfile(provider, id, token) {
  await axios
    .post(
      '',
      {
        provider: provider,
        id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
