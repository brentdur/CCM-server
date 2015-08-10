/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 *
 * Seed file for developmental purposes
 */

'use strict';

var Event = require('../app/models/event');
var Talk = require('../app/models/talk');
var Msg = require('../app/models/message');
var User = require('../app/models/user');
var Group = require('../app/models/group');
var Location = require('../app/models/location');
var Topic = require('../app/models/topic');
var Signup = require('../app/models/signup');
var async = require('async');

var justPurge = null;

async.series([
    function(callback){
        Event.find({}).remove(function(){callback(null)});
    },
    function(callback){
        Talk.find({}).remove(function(){callback(null)});
    },
    function(callback){
        Msg.find({}).remove(function(){callback(null)});
    },
    function(callback){
        User.find({}).remove(function(){callback(null)});
    },
    function(callback){
        Group.find({}).remove(function(){callback(null)});
    },
    function(callback){
        Location.find({}).remove(function(){callback(null)});
    },
    function(callback){
        Topic.find({}).remove(function(){callback(null)});
    },
    function(callback){
        Signup.find({}).remove(function(){callback(justPurge)});
    },
    function(callback){
        Group.create(
            {
                name: 'admin',
                writeTalks: true,
                writeMsgs: true,
                writeEvents: true,
                writeSignups: true
            },
            {
                name: 'users',
                writeMsgs: true
            },
            {
                name: 'ministers'
            },
            function(){
                console.log('Finished starting groups');
                callback(null);
            });
    },
    function(callback){
        User.create(
        {
            name: 'admin',
            email: 'admin@brentondurkee.com',
            password: '123'
        },
        {
            name: 'user',
            email: 'user@brentondurkee.com',
            password: '123'
        },
        {
            name: 'minister',
            email: 'minister@brentondurkee.com',
            password: '123'
        },
        function(){
            console.log('Finished adding users');
            User.findOne({name: 'admin'}, function(err, user){
                Group.findOne({name: 'admin'}, function(err, group){
                    if(err) { return next(err); }
                    user.addGroup(group._id, function(err, number){
                        if(err) {return next(err);}
                        group.addUser(user._id, function(err, number){
                            if(err) {return next(err);}
                            console.log('Admin User Group Set');
                        });
                    });
                });
            });
            User.findOne({name: 'user'}, function(err, user){
                Group.findOne({name: 'users'}, function(err, group){
                    if(err) { return next(err); }
                    user.addGroup(group._id, function(err, number){
                        if(err) {return next(err);}
                        group.addUser(user._id, function(err, number){
                            if(err) {return next(err);}
                            console.log('User User Group Set');
                        });
                    });
                });
            });
            User.findOne({name: 'minister'}, function(err, user){
                Group.findOne({name: 'ministers'}, function(err, group){
                    if(err) { return next(err); }
                    user.addGroup(group._id, function(err, number){
                        if(err) {return next(err);}
                        group.addUser(user._id, function(err, number){
                            if(err) {return next(err);}
                            console.log('Minister User Group Set');
                        });
                    });
                });
            });
        });
        callback(null);
    },
    function(callback){
        Location.create(
            {
                name: 'Redeemer UWS',
                address: 'W83 Ministry Center, 150 W. 83rd St., New York, New York',
                lat: '40.786122', 
                lng: '-73.975738'
            },
            {
                name: 'Redeemer Offices',
                address: '1166 Avenue of the Americas, 16th Floor, New York, NY 10036',
                lat: '40.757029', 
                lng: '-73.982293'
            },
            {
                name: 'Redeemer Downtown',
                address: '120 W 14th St New York, NY 10011',
                lat: '40.737602',
                lng: '-73.998305'
            },
            function(){
                console.log('Finished adding pre-fab locations');
                callback(null);
            });
    },
    function(callback){
        Event.create(
        {
            title: 'first event',
            location: 'Reedemer West Side',
            date: 'September 14, 2015',
            description: 'This is the first event',
            lat: '40.786122', 
            lng: '-73.975738'
        }, 
        {
            title: 'second event',
            location: 'Church Offices',
            date: 'September 15, 2015',
            description: 'This is the second event',
            lat: '40.786122', 
            lng: '-73.975738'
        },
        {
            title: 'third event',
            location: 'Reedemer West Side',
            date: 'September 16, 2015',
            description: 'This is the third event',
            lat: '40.786122', 
            lng: '-73.975738'
        },
        {
            title: 'fourth event',
            location: 'Reedemer West Side',
            date: 'September 17, 2015',
            description: 'This is the fourth event',
            lat: '40.786122', 
            lng: '-73.975738'
        },
        {
            title: 'fifth event',
            location: 'church',
            date: 'September 18, 2015',
            description: 'This is the fifth event',
            lat: '40.786122', 
            lng: '-73.975738'
        },
        function(){
            console.log('Finished populating events');
            callback(null);
        });
    },
    function(callback){
        Talk.create(
        {
            author: 'Eric',
            date: 'September 1, 2015',
            subject: 'WLG - Sorrow',
            reference: 'John 1:1-16',
            fullVerse: 'full verse goes here',
            outline: [
                'Be sorry',
                'No Need',
                'He\'s got you'
            ]
        }, 
        {
            author: 'Tim',
            date: 'September 2, 2015',
            subject: 'SC - Sorrow in Relationships',
            reference: 'John 2:1-16',
            fullVerse: 'full verse goes here',
            outline: [
                'You will',
                'He/she will',
                'Deal with it',
                'It gets better'
            ]
        }, 
        {
            author: 'Michael',
            date: 'September 3, 2015',
            subject: 'WLG - Happiness',
            reference: 'John 3:1-16',
            fullVerse: 'full verse goes here',
            outline: [
                'Be happy',
                'God\'s happy',
                'You can be too',
                'Note A',
                'Note B',
            ]
        }, 
        {
            author: 'Eric',
            date: 'September 4, 2015',
            subject: 'SC - Dating',
            reference: 'John 4:1-16',
            fullVerse: 'full verse goes here',
            outline: [
                'Note A',
                'Note B',
                'Note C',
                'Note D',
                'Note E',
                'Note F'
            ]
        }, 
        {
            author: 'Eric',
            date: 'September 5, 2015',
            subject: 'WLG - Plans',
            reference: 'John 5:1-16',
            fullVerse: 'full verse goes here',
            outline: [
                'Note A',
                'Note B',
                'Note C',
                'Note D',
                'Note E',
                'Note F',
                'Note G',
                'Note H',
                'Note I'
            ]
        }, 
        function(){
            console.log('Finished populating talks');
            callback(null);
        });
    },
    function(callback){
        async.waterfall([
            function(callback) {
                Group.findOne({name: 'ministers'}, function(err, groupe){
                    callback(null, groupe._id);
                });
            },
            function(group, callback) {
                User.findOne({name: 'user'}, function(err, usere){
                    callback(null, usere._id, group);
                });
            }
        ], function (err, user, group) {
            Msg.create(
            {
                from: user,
                to: group,
                simpleTo: 'minister',
                subject: 'Hello',
                date: 'September 9, 2015',
                message: 'Hey guys, welcome to RUF'
            }, 
            {
                from: user,
                to: group,
                simpleTo: 'minister',
                subject: 'MT retreat',
                date: 'September 8, 2015',
                message: 'It\'s coming up'
            }, 
            {
                from: user,
                to: group,
                simpleTo: 'minister',
                subject: 'I miss you',
                date: 'September 7, 2015',
                message: 'Hey you'
            }, 
            {
                from: user,
                to: group,
                simpleTo: 'minister',
                subject: 'WLG cancelled',
                date: 'September 6, 2015',
                message: 'It\'s cancelled, get over it'
            }, 
            {
                from: user,
                to: group,
                simpleTo: 'minister',
                subject: '41411',
                date: 'September 5, 2015',
                message: 'Boom'
            }, 
            function(){
                console.log('Finished populating messages');
                callback(null);
            });
        });
    },
    function(callback){
        Topic.create(
        {
            name: 'Question',
            isAnon: true
        },  
        {
            name: 'More information',
            isAnon: false
        },
        {
            name: 'Security Pass',
            isAnon: false
        },
        function(){
            console.log('Finished populating topics');
            callback(null);
        });
    },
    function(callback){
        Signup.create(
        {
            name: 'Small Group',
            dateInfo: 'Every Wednesday at 7:00pm',
            location: 'The house',
            address: '75 Third Avenue, 10003',
            description: 'Our weekly small group event!'
        },  
        {
            name: 'Pot Luck',
            dateInfo: 'Sunday, 09/23/15',
            location: 'The other place',
            address: 'W83 Ministry Center, 150 W. 83rd St., New York, New York',
            description: 'Signup to bring something'
        }, 
        {
            name: 'Retreat',
            dateInfo: 'A weekened in September',
            location: 'That far away place',
            address: '3015 Lake Forest Drive, 30909',
            description: 'Meet in the smelly train station'
        }, 
        function(){
            console.log('Finished populating signups');
            callback(null);
        });
    }
],
// optional callback
function(err, results){
    console.log('done with all');
});

// User.find({}).remove(function(){
     // User.create(
     //    {
     //        name: 'admin',
     //        email: 'admin@brentondurkee.com',
     //        password: '123'
     //    },
     //    {
     //        name: 'user',
     //        email: 'user@brentondurkee.com',
     //        password: '123'
     //    },
     //    {
     //        name: 'minister',
     //        email: 'minister@brentondurkee.com',
     //        password: '123'
     //    },
     //    function(){
     //        console.log('Finished adding users');
     //        User.findOne({name: 'admin'}, function(err, user){
     //            Group.findOne({name: 'admin'}, function(err, group){
     //                if(err) { return next(err); }
     //                user.addGroup(group._id, function(err, number){
     //                    if(err) {return next(err);}
     //                    group.addUser(user._id, function(err, number){
     //                        if(err) {return next(err);}
     //                        console.log('Admin User Group Set');
     //                    });
     //                });
     //            });
     //        });
     //        User.findOne({name: 'user'}, function(err, user){
     //            Group.findOne({name: 'users'}, function(err, group){
     //                if(err) { return next(err); }
     //                user.addGroup(group._id, function(err, number){
     //                    if(err) {return next(err);}
     //                    group.addUser(user._id, function(err, number){
     //                        if(err) {return next(err);}
     //                        console.log('User User Group Set');
     //                    });
     //                });
     //            });
     //        });
     //        User.findOne({name: 'minister'}, function(err, user){
     //            Group.findOne({name: 'ministers'}, function(err, group){
     //                if(err) { return next(err); }
     //                user.addGroup(group._id, function(err, number){
     //                    if(err) {return next(err);}
     //                    group.addUser(user._id, function(err, number){
     //                        if(err) {return next(err);}
     //                        console.log('Minister User Group Set');
     //                    });
     //                });
     //            });
     //        });
     //    });
//  });

// Group.find({}).remove(function(){
//     Group.create(
//         {
//             name: 'admin',
//             writeTalks: true,
//             writeMsgs: true,
//             writeEvents: true,
//             writeSignups: true
//         },
//         {
//             name: 'users',
//             writeMsgs: true
//         },
//         {
//             name: 'ministers'
//         },
//         function(){
//             console.log('Finished starting groups');
//         });
//  });
 
 


// Location.find({}).remove(function(){
//     Location.create(
//         {
//             name: 'Redeemer UWS',
//             address: 'W83 Ministry Center, 150 W. 83rd St., New York, New York',
//             lat: '40.786122', 
//             lng: '-73.975738'
//         },
//         {
//             name: 'Redeemer Offices',
//             address: '1166 Avenue of the Americas, 16th Floor, New York, NY 10036',
//             lat: '40.757029', 
//             lng: '-73.982293'
//         },
//         {
//             name: 'Redeemer Downtown',
//             address: '120 W 14th St New York, NY 10011',
//             lat: '40.737602',
//             lng: '-73.998305'
//         },
//         function(){
//             console.log('Finished adding pre-fab locations');
//         });
// });



// Event.find({}).remove(function(){
    // Event.create(
    //     {
    //         title: 'first event',
    //         location: 'Reedemer West Side',
    //         date: 'September 14, 2015',
    //         description: 'This is the first event',
    //         lat: '40.786122', 
    //         lng: '-73.975738'
    //     }, 
    //     {
    //         title: 'second event',
    //         location: 'Church Offices',
    //         date: 'September 15, 2015',
    //         description: 'This is the second event',
    //         lat: '40.786122', 
    //         lng: '-73.975738'
    //     },
    //     {
    //         title: 'third event',
    //         location: 'Reedemer West Side',
    //         date: 'September 16, 2015',
    //         description: 'This is the third event',
    //         lat: '40.786122', 
    //         lng: '-73.975738'
    //     },
    //     {
    //         title: 'fourth event',
    //         location: 'Reedemer West Side',
    //         date: 'September 17, 2015',
    //         description: 'This is the fourth event',
    //         lat: '40.786122', 
    //         lng: '-73.975738'
    //     },
    //     {
    //         title: 'fifth event',
    //         location: 'church',
    //         date: 'September 18, 2015',
    //         description: 'This is the fifth event',
    //         lat: '40.786122', 
    //         lng: '-73.975738'
    //     },
    //     function(){
    //         console.log('Finished populating events');
    //     });
// });

// Talk.find({}).remove(function(){
    // Talk.create(
    //     {
    //         author: 'Eric',
    //         date: 'September 1, 2015',
    //         subject: 'WLG - Sorrow',
    //         reference: 'John 1:1-16',
    //         fullVerse: 'full verse goes here',
    //         outline: [
    //             'Be sorry',
    //             'No Need',
    //             'He\'s got you'
    //         ]
    //     }, 
    //     {
    //         author: 'Tim',
    //         date: 'September 2, 2015',
    //         subject: 'SC - Sorrow in Relationships',
    //         reference: 'John 2:1-16',
    //         fullVerse: 'full verse goes here',
    //         outline: [
    //             'You will',
    //             'He/she will',
    //             'Deal with it',
    //             'It gets better'
    //         ]
    //     }, 
    //     {
    //         author: 'Michael',
    //         date: 'September 3, 2015',
    //         subject: 'WLG - Happiness',
    //         reference: 'John 3:1-16',
    //         fullVerse: 'full verse goes here',
    //         outline: [
    //             'Be happy',
    //             'God\'s happy',
    //             'You can be too',
    //             'Note A',
    //             'Note B',
    //         ]
    //     }, 
    //     {
    //         author: 'Eric',
    //         date: 'September 4, 2015',
    //         subject: 'SC - Dating',
    //         reference: 'John 4:1-16',
    //         fullVerse: 'full verse goes here',
    //         outline: [
    //             'Note A',
    //             'Note B',
    //             'Note C',
    //             'Note D',
    //             'Note E',
    //             'Note F'
    //         ]
    //     }, 
    //     {
    //         author: 'Eric',
    //         date: 'September 5, 2015',
    //         subject: 'WLG - Plans',
    //         reference: 'John 5:1-16',
    //         fullVerse: 'full verse goes here',
    //         outline: [
    //             'Note A',
    //             'Note B',
    //             'Note C',
    //             'Note D',
    //             'Note E',
    //             'Note F',
    //             'Note G',
    //             'Note H',
    //             'Note I'
    //         ]
    //     }, 
    //     function(){
    //         console.log('Finished populating talks');
    //     });
// });
// var group;
// Group.findOne({name: 'ministers'}, function(err, groupe){
//     group = groupe._id;
// });
// var user;
// User.findOne({name: 'user'}, function(err, usere){
//     user = usere._id;
// });

// Msg.find({}).remove(function(){
    // Msg.create(
    //     {
    //         from: user,
    //         to: group,
    //         simpleTo: 'minister',
    //         subject: 'Hello',
    //         date: 'September 9, 2015',
    //         message: 'Hey guys, welcome to RUF'
    //     }, 
    //     {
    //         from: user,
    //         to: group,
    //         simpleTo: 'minister',
    //         subject: 'MT retreat',
    //         date: 'September 8, 2015',
    //         message: 'It\'s coming up'
    //     }, 
    //     {
    //         from: user,
    //         to: group,
    //         simpleTo: 'minister',
    //         subject: 'I miss you',
    //         date: 'September 7, 2015',
    //         message: 'Hey you'
    //     }, 
    //     {
    //         from: user,
    //         to: group,
    //         simpleTo: 'minister',
    //         subject: 'WLG cancelled',
    //         date: 'September 6, 2015',
    //         message: 'It\'s cancelled, get over it'
    //     }, 
    //     {
    //         from: user,
    //         to: group,
    //         simpleTo: 'minister',
    //         subject: '41411',
    //         date: 'September 5, 2015',
    //         message: 'Boom'
    //     }, 
    //     function(){
    //         console.log('Finished populating messages');
    //     });
// });

// Topic.find({}).remove(function(){
    // Topic.create(
    //     {
    //         name: 'Question',
    //         isAnon: true
    //     },  
    //     {
    //         name: 'More information',
    //         isAnon: false
    //     },
    //     {
    //         name: 'Security Pass',
    //         isAnon: false
    //     },
    //     function(){
    //         console.log('Finished populating topics');
    //     });
// });

// Signup.find({}).remove(function(){
    // Signup.create(
    //     {
    //         name: 'Small Group',
    //         dateInfo: 'Every Wednesday at 7:00pm',
    //         location: 'The house',
    //         address: '75 Third Avenue, 10003',
    //         description: 'Our weekly small group event!'
    //     },  
    //     {
    //         name: 'Pot Luck',
    //         dateInfo: 'Sunday, 09/23/15',
    //         location: 'The other place',
    //         address: 'W83 Ministry Center, 150 W. 83rd St., New York, New York',
    //         description: 'Signup to bring something'
    //     }, 
    //     {
    //         name: 'Retreat',
    //         dateInfo: 'A weekened in September',
    //         location: 'That far away place',
    //         address: '3015 Lake Forest Drive, 30909',
    //         description: 'Meet in the smelly train station'
    //     }, 
    //     function(){
    //         console.log('Finished populating signups');
    //     });
// });

