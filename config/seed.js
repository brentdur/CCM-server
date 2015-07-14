/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Event = require('../app/models/event');
var Talk = require('../app/models/talk');
var Msg = require('../app/models/message');
var User = require('../app/models/user');

User.find({}).remove(function(){
     console.log('Finished deleting users');
 });

Event.find({}).remove(function(){
    Event.create(
        {
            title: 'first event',
            location: 'Reedemer West Side',
            date: 'June 14, 2015',
            description: 'This is the first event'
        }, 
        {
            title: 'second event',
            location: 'Church Offices',
            date: 'June 15, 2015',
            description: 'This is the second event'
        },
        {
            title: 'third event',
            location: 'Reedemer West Side',
            date: 'June 16, 2015',
            description: 'This is the third event'
        },
        {
            title: 'fourth event',
            location: 'Reedemer West Side',
            date: 'June 17, 2015',
            description: 'This is the fourth event'
        },
        {
            title: 'fifth event',
            location: 'church',
            date: 'June 18, 2015',
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
            date: 'June 1, 2015',
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
            date: 'June 2, 2015',
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
            date: 'June 3, 2015',
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
            date: 'June 4, 2015',
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
            date: 'June 5, 2015',
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
            date: 'June 9, 2015',
            message: 'Hey guys, welcome to RUF'
        }, 
        {
            from: 'Michael',
            to: 'ministry team',
            subject: 'MT retreat',
            date: 'June 8, 2015',
            message: 'It\'s coming up'
        }, 
        {
            from: 'Michael',
            to: 'you',
            subject: 'I miss you',
            date: 'June 7, 2015',
            message: 'Hey you'
        }, 
        {
            from: 'Michael',
            to: 'all',
            subject: 'WLG cancelled',
            date: 'June 6, 2015',
            message: 'It\'s cancelled, get over it'
        }, 
        {
            from: 'Michael',
            to: 'all',
            subject: '41411',
            date: 'June 5, 2015',
            message: 'Boom'
        }, 
        function(){
            console.log('Finished populating messages');
        });
});
