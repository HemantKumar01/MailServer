## Reset Password Mailing Server
### Usage
1) Run `npm install`
2) create a .env file with the following variables:
```
EMAIL= host_email
PASSWORD =password
```
if you are not using gmail as a provider, edit `transporterConfig` in mail.js.

if you are using gmail, you will need to enable less secure apps in your gmail settings.
Normal gmail password will not work here (https://support.google.com/accounts/answer/185833?visit_id=638354788869578449-3453718785&p=InvalidSecondFactor&rd=1). Get the password from 
Manage Your Google Account -> Security -> 2 Step Verification -> App Passwords 

3) Run `node mail.js` and head over to localhost:3000/

### Database integration
integrate your DB in node js and customize the functions in `db.js`