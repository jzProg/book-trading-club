const firebaseConfigProperties = {
  data() {
    return {
      config: {
        apiKey: 'YOUR_API_KEY',
        authDomain: 'YOUR_AUTH_DOMAIN',
        databaseURL: 'YOUR_DB_URL',
        projectId: 'YOUR_PROJECT_ID',
        storageBucket: 'YOUR_STORAGE_BUCKET',
        messagingSenderId: 'YOUR_SENDER_KEY',
      }
    }
  }
}

export default firebaseConfigProperties;
