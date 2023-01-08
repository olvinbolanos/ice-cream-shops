import app from 'firebase/compat/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  yelpKey: process.env.REACT_APP_YELP_KEY,
  googleKey: process.env.REACT_APP_GOOGLE_KEY
};

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
    this.storage = app.storage()
    this.reauthenticate = app.auth.EmailAuthProvider
  }


  doCreateUserWithEmailAndPassword = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doSendEmailVerification = () => this.auth.sendEmailVerification()

  doSignOut = () => this.auth.signOut()

  doDeleteAccount = () => this.auth.delete()
 
  user = uid => this.db.collection(`users`).doc(uid)
  
  users = () => this.db.collection('users')
}
export default Firebase