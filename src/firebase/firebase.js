//* dumps all named exports from package
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBLyWN8J4BgscEVicTvGftaHnhAzf8i7NM",
    authDomain: "expensify-b2350.firebaseapp.com",
    databaseURL: "https://expensify-b2350.firebaseio.com",
    projectId: "expensify-b2350",
    storageBucket: "",
    messagingSenderId: "102841276495",
    appId: "1:102841276495:web:9acc52d36f8c7a4137323a"
};

firebase.initializeApp(config);

//Firebase has lot of functionalities
//We can get database features using database() method
const database = firebase.database();

export { firebase, database as default};