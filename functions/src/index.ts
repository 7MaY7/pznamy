// import * as functions from 'firebase-functions';

// const admin = require('firebase-admin');
// admin.initializeApp();

// const SENDGRID_API_KEY = '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';

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(SENDGRID_API_KEY);

// exports.welcomeEmail = functions.firestore.document('Users/{userId}')
//     .onCreate((snap, context) => {
//         const user = snap.data();
//         console.log(user);
//         const msg = {
//             to: 'ang.pzn@gmail.com',
//             from: 'an.maksymiv@gmail.com',
//             subject: 'Welcome to COFOZ',
//             templateId: '9687017c-d3f0-434d-996f-75b0c6099e7b',
//             substitutionsWrappers: ['{{', '}}'],
//             substitutions: {
//                 name: user.name
//             }
//         };
//         return sgMail.send(msg)
//     });


// import * as functions from 'firebase-functions';

// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);

// const SENDGRID_API_KEY = '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';


// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(SENDGRID_API_KEY);

// exports.firestoreEmail = functions.firestore
//     .document('tours/{tourId}')
//     .onCreate(event => {
//         console.log(event);
//         const tourId = event.params.tourId;
//         const db = admin.firestore();

//         return db.collection('tours').doc(tourId)
//             .get()
//             .then(doc => {
//                 const tour = doc.data()

//                 const msg = {
//                     to: 'ang.pzn@gmail.com',
//                     from: 'test@gmail.com',
//                     templateId: '9687017c-d3f0-434d-996f-75b0c6099e7b',
//                     substitutionWrappers: ['{{', '}}'],
//                     substitutions: {
//                         country: tour.country
//                     }
//                 };

//                 return sgMail.send(msg);
//             })
//             .then(() => console.log('email sent!') )
//             .catch(err => console.log(err) )
//     });