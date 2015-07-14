/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Event = require('../app/models/event');
var Talk = require('../app/models/talk');
var Msg = require('../app/models/message');
var User = require('../app/models/user');
var Group = require('../app/models/group');

User.find({}).remove(function(){
     User.create(
        {
            name: 'admin',
            email: 'admin@brentondurkee.com',
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
        });
 });

Group.find({}).remove(function(){
    Group.create(
        {
            name: 'admin'
        },
        {
            name: 'users'
        },
        function(){
            console.log('Finished starting groups');
        });
 });



Event.find({}).remove(function(){
    Event.create(
        {
            title: 'first event',
            location: 'Reedemer West Side',
            date: 'September 14, 2015',
            description: 'This is the first event'
        }, 
        {
            title: 'second event',
            location: 'Church Offices',
            date: 'September 15, 2015',
            description: 'This is the second event'
        },
        {
            title: 'third event',
            location: 'Reedemer West Side',
            date: 'September 16, 2015',
            description: 'This is the third event'
        },
        {
            title: 'fourth event',
            location: 'Reedemer West Side',
            date: 'September 17, 2015',
            description: 'This is the fourth event'
        },
        {
            title: 'fifth event',
            location: 'church',
            date: 'September 18, 2015',
            description: 'This is the fifth event'
        },
        function(){
            console.log('Finished populating events');
        });
});

Talk.find({}).remove(function(){
    Talk.create(
        {
            author: 'Eric',
            date: 'September 1, 2015',
            subject: 'WLG - Sorrow',
            reference: 'John 1:1-16',
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
        });
});

Msg.find({}).remove(function(){
    Msg.create(
        {
            from: 'Michael',
            to: 'all',
            subject: 'Hello',
            date: 'September 9, 2015',
            message: 'Hey guys, welcome to RUF'
        }, 
        {
            from: 'Michael',
            to: 'ministry team',
            subject: 'MT retreat',
            date: 'September 8, 2015',
            message: 'It\'s coming up'
        }, 
        {
            from: 'Michael',
            to: 'you',
            subject: 'I miss you',
            date: 'September 7, 2015',
            message: 'Hey you'
        }, 
        {
            from: 'Michael',
            to: 'all',
            subject: 'WLG cancelled',
            date: 'September 6, 2015',
            message: 'It\'s cancelled, get over it'
        }, 
        {
            from: 'Michael',
            to: 'all',
            subject: '41411',
            date: 'September 5, 2015',
            message: 'Boom'
        }, 
        function(){
            console.log('Finished populating messages');
        });
});
