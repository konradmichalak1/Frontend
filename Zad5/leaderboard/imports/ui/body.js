import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

 
//Zwracanie listy tasków
// Template.body.helpers({
//   tasks() {
//     return Tasks.find({});
//   },
// });

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});


//Zwracanie listy tasków
//Sprawdzany jest status pola sort i zwracana jesdt lista zależnie od jego wartosci
Template.body.helpers({
  tasks() {
    const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
          // If hide completed is checked, filter tasks
          return Tasks.find({}, { sort: { voterate: 1 } });
          //return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
        }
      // Otherwise, return all of the tasks
      // Show newest tasks at the top
      return Tasks.find({}, { sort: { voterate: -1 } });
    },
    incompleteCount() {
        return Tasks.find({ checked: { $ne: true } }).count();
    },
});

//Create dodawanie nowego taska
Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element - event.target is form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Tasks.insert({
      text,
      voterate: 0,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.text.value = '';
  },
  //Obsluga eventu sortowania
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});