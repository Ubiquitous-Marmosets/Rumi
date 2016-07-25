module.exports = {
  prioritizeTasks
};

/**
 * @typedef PrioritizedTasks
 * @type {object}
 * @property {Task[]} recent An array of recently completed tasks
 * @property {Task[]} urgent An array of urgent tasks
 * @property {Task[]} overdue An array of overdue tasks
 */

/**
 * Prioritizes tasks according to their due date and interval length
 * @param  {object[]} allTasks      An array of all tasks
 * @return {PrioritizedTasks}       An object grouping tasks by priority
 */
function prioritizeTasks(allTasks) {
  let tasks = { recent: [], urgent: [], overdue: [] };
  let now = Date.now();

  allTasks.forEach(t => {
    let timeLeft = Date.parse(t.dueBy) - now;

    if (timeLeft < 0) {
      return tasks.overdue.push(t);
    } else if (timeLeft < t.interval / 2) {
      return tasks.urgent.push(t);
    } else {
      return tasks.recent.push(t);
    }
  });

  return tasks;
}
