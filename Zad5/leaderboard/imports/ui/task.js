import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';
 
import './task.html';
 

//Definicja funkcji update i delete na kolekcji tasks
Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Tasks.remove(this._id);
  },
  'click .vote-up'() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {
      $set: { voterate: this.voterate+1 },
    });
  },
  'click .vote-down'() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {
      $set: { voterate: this.voterate-1 },
    });
  },
});

