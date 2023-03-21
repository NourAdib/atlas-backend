# Base image
FROM node:18

WORKDIR /usr/src/app

ENV DATABASE_HOST xzodia-sql-db.app.mh1.us
ENV DATABASE_NAME atlas
ENV DATABASE_USERNAME root
ENV DATABASE_PASSWORD 12345
ENV SECRET NQknzbhGSblaLZxnMp/jXwFN1DAIp/5dhvKtUTVBkrior/fszfjpGluV59rd/4iEN7EhkxbOQe4847RKLRB36G0PBM8hZnnHboDuIugiXF/rlVBYh3R8hlVAuxxDIVXYBS1/T6F901C6mJ81RsdbbOA8QIl+rdI8mVphC9GC4G7UU8JY3matqVT/5GYrYBEcz711VjZ6LvhkgSemYwjAyBeEAYt287jSPyNcD9SoJm4Iwcymepm2tnOviEHPl5d3wDn+/gaAG++HLao4szwp3eRbmHJKgUG3uiR8Y7TCC8pLmDLGnGUJRgIObrd92BJNXzkbOGPTU6P3W54TSbDe+A  
ENV SESSION_DRIVER cookie
ENV FIREBASE_TYPE service_account
ENV FIREBASE_PROJECT_ID atlas-6183a
ENV FIREBASE_PRIVATE_KEY_ID c2313c6ec8dfa6f6deb4e51e054839e21cce231e
ENV FIREBASE_CLIENT_EMAIL firebase-adminsdk-90b70@atlas-6183a.iam.gserviceaccount.com
ENV FIREBASE_CLIENT_ID 112149626117271189264
ENV FIREBASE_AUTH_URI https://accounts.google.com/o/oauth2/auth
ENV FIREBASE_TOKEN_URI https://oauth2.googleapis.com/token
ENV FIREBASE_AUTH_PROVIDER_X509_CERT_URL https://www.googleapis.com/oauth2/v1/certs
ENV FIREBASE_BUCKET_ID atlas-6183a.appspot.com
ENV FIREBASE_CLIENT_X509_CERT_URL https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-90b70%40atlas-6183a.iam.gserviceaccount.com
ENV STRIPE_TEST_KEY sk_test_51MTfTFB4qQTC27ucin4gOTKx8rKV6dVBCyBizW6M8BdpF4iJBmc8juFoN0BIVMgKkyQ9mrKRoB7xZYFAxMJLo0WF001OkMAXgN
ENV STRIPE_WEBHOOK_SECRET whsec_7633fd6fb117600ea85b8e0ab42010467dbc516ab4199986d62c46162eb2debd

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 3000

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]