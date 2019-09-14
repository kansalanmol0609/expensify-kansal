//ref method gives reference to particular part of the database
//If we doesn't given an argument, it gives root reference
//Set method is used to set value at that reference
//Set can take any type of data u want- string, object, number
//Set overwrite the database
//set method also returns a promise
//   database.ref().set({
//     name: 'Anmol Kansall',
//     age: 26,
//     isSingle: true,
//     location: {
//         city: 'Raman',
//         country: 'India'
//     }
//   }).then(() => {
//       console.log('Data is saved!')
//   }).catch((e) => {
//       console.log('This failed: ', e)
//   })

//To change only age
//   database.ref('age').set(27);
//   database.ref('location/city').set('Bathinda');

//If reference doesn't exist, it adds it automatically
//   database.ref('attributes').set({
//       height: 73,
//       weight: 150
//   });

//Removing Data from firebase
//  database.ref().remove()
//     .then(() => {
//         console.log('Data was removed');
//     }).catch((e) => {
//         console.log('Error occurred while removing: ', e);
//     })

//We can also remove data using set by passing null
// database.ref('isSingle').set(null);

//Updating data from firebase
//update method must be called with an object
//we can also add brand-new properties
//and also delete some attribute by setting them to null
//To update nested object: - see below 'location'
// database.ref().update({
//     name: 'Kansal',
//     age:20,
//     job: 'Software Engineer',
//     isSingle: null,
//     "location/city" : "Bathinda" 
// });

//Read data from firebase

//once method is used to fetch data only once
// database.ref()
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     }).catch((e) => {
//         console.log('Error fetching data ', e)
//     })

//on method runs again and again every single time data changes
// we do not use promises here since promises can be only resolved or rejected single time
//We have 'subsrcibed' to changes.
// 3rd argument is used to see error
// const onValueChange = database.ref().on('value', (snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
// }, (e) => {
//     console.log('Error fetching data: ', e);
// })

// setTimeout(() => {
//     database.ref('age').set(29);
// }, 3500)

// //off method is used to remove subscriptions
// //to remove all subs, pass no argument
// //but to remove a particular sub, pass the function
// setTimeout(() => {
//     database.ref().off( 'value' , onValueChange);
// }, 7000);

// setTimeout(() => {
//     database.ref('age').set(30);
// }, 10500);


//Array Data in firebase
//firebase doesn't store array data type

const notes = [{
    id: '12',
    title: 'First note',
    body: 'This is my note'
}, {
    id: '12de',
    title: 'Second note',
    body: 'This is my note'
}]

// database.ref('notes').set(notes);

//Firebase stores the array like this i.e. object
// const firebaseNotes = {
//     notes: {
//         0: {
//             id: '12',
//             title: 'First note',
//             body: 'This is my note'
//         },
//         1: {
//             id: '12de',
//         title: 'Second note',
//         body: 'This is my note'
//         }
//     }
// }

//Instead use push
// database.ref('notes').push({
//     title: 'Course Topics',
//     body: 'React Native'
// });

// database.ref('expenses').push({
//     description: 'Rent',
//     note: '',
//     amount: 109500,
//     createdAt: 18979837498
// });

// database.ref('expenses').push({
//     description: 'Coffee',
//     note: '',
//     amount: 10,
//     createdAt: 1897983
// });

// database.ref('expenses').push({
//     description: 'Food',
//     note: '',
//     amount: 100,
//     createdAt: 98378
// });

//Reading data from array
// database.ref('expenses')
//     .once('value')
//     .then( snapshot => {
//         const expenses = [];

//         snapshot.forEach( (childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });

//         console.log(expenses);
//     });

// database.ref('expenses')
//     .on('value' , snapshot => {
//         const expenses = [];

//         snapshot.forEach( (childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });
//         console.log(expenses);
//     });

//Other type of subscriptions to on method
//child_removed
// database.ref('expenses').on('child_removed', snapshot => {
//     //snapshot.key -- key of the child deleted
//     //snapshot.val() -- value of the child deleted
//     console.log(snapshot.key, snapshot.val());
// })

// //child_changed
// database.ref('expenses').on('child_changed', snapshot => {
//     console.log(snapshot.key, snapshot.val());
// })

// //child_added -- fires one time for each data
// // and also for new expenses
// database.ref('expenses').on('child_added', snapshot => {
//     console.log(snapshot.key, snapshot.val());
// })