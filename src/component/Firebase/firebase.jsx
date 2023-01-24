import app from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'




const config = {
  apiKey: "AIzaSyDDBex_RGsto2t38lKsB4GTEAGcxvf8ATw",
  authDomain: "notes-app-c0183.firebaseapp.com",
  databaseURL: "https://notes-app-c0183.firebaseio.com",
  projectId: "notes-app-c0183",
  storageBucket: "notes-app-c0183.appspot.com",
  messagingSenderId: "563617119233",
  appId: "1:563617119233:web:a8cfdb8d82a86eda",
  yelpKey: "PnRdOKRmHRpmECP-0W77hciytB1Zz_-ErKkRw5wjCVZe6GdAUnugblsI_gzf7gUws9hGHhrWder7PjXBWVlJTuU6KzSj7bgGnlqfnSclasAlo5iaIMZtJznpqXy-Y3Yx",
  googleKey:  "AIzaSyDDBex_RGsto2t38lKsB4GTEAGcxvf8ATw"
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