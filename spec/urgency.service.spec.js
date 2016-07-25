let expect = require('chai').expect;
let urgency = require('../client/urgency.service');
let fake = require('./fakeData');

describe('urgency.service', function() {
  it('should accept an empty task list', function() {
    let tasks = urgency.prioritizeTasks([]);
    expect(tasks.recent).to.deep.equal([]);
    expect(tasks.urgent).to.deep.equal([]);
    expect(tasks.overdue).to.deep.equal([]);
  });
  it('should return recently completed tasks', function() {
    let tasks = urgency.prioritizeTasks(fake.allTasks);
    let recentTaskNames = tasks.recent.map(t => t.name);
    expect(recentTaskNames).to.deep.equal(['take out trash', 'pay bills']);
  });
  it('should return urgent tasks', function() {
    let tasks = urgency.prioritizeTasks(fake.allTasks);
    let urgentTaskNames = tasks.urgent.map(t => t.name);
    expect(urgentTaskNames).to.deep.equal(['walk the dogs', 'clean the dishes']);
  });
  it('should return overdue tasks', function() {
    let tasks = urgency.prioritizeTasks(fake.allTasks);
    let overdueTaskNames = tasks.overdue.map(t => t.name);
    expect(overdueTaskNames).to.deep.equal(['wash the car']);
  });
  it('should correctly identify overdue tasks', function() {
    let overdueTask = {
      name: 'this is critical',
      dueBy: 0,
      interval: 10000
    }
    let tasks = urgency.prioritizeTasks([overdueTask]);
    let overdueTaskNames = tasks.overdue.map(t => t.name);
    expect(overdueTaskNames).to.deep.equal(['this is critical']);
  });
});
