import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buy-and-sell';
  user: any = null;

  constructor(
    public auth: AngularFireAuth,
    private router:Router
  ) { }

  signInClicked(): void {
    //  const userData =  this.auth.signInWithPopup(new firebase.GoogleAuthProvider());
    //   console.log("signInClicked",userData)
    const auth = getAuth();
    const provider = new firebase.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        this.user = result.user;
        //console.log("token", token);
        //console.log("user", user);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

      });
  }

  signOutClicked(): void {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/');
      this.user=null;
    });
  }
}


