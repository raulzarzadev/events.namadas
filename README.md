events.nadamas

events is an app that works together nadamas.app

## we use cypress as e2e test 

config cypress.env.json with (you should get this in firebase console)

```
 "firebaseAdminConfig": {
    "apiKey": "",
    "authDomain": "",
    "projectId": "",
    "storageBucket": "",
    "messagingSenderId": "",
    "appId": ""
  },
  "userId":""
```
and 

serviceAccountKey.json 

```
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": ",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
```

each element for testing is named as "data-test-id"

