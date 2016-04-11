chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

function testDate(d) {
  if (Object.prototype.toString.call(d) === "[object Date]") {
    if (isNaN(d.getTime())) {
      return false;
    }
    return true;
  }
  return false;
}

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {

    // Get an array of all tasks in this page
    var tasks = document.querySelectorAll('.single-task');
    var this_week = [];
    var next_week = [];

    var today = new Date();

    const WEEK = 60*60*24*7;
    const TWO_WEEKS = WEEK * 2;

    // Loop through all tasks and see if they belong to this_week or next_week
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var task_date = new Date(task.querySelector('.due-date .date').innerHTML);

        if (!testDate(task_date)) {
            continue;
        }

        var task_diff = (task_date.getTime() - today.getTime()) / 1000;

        if (task_diff <= WEEK) {
            this_week.push(task);
        } else if (task_diff <= TWO_WEEKS) {
            next_week.push(task);
        }
    }

    var domInfo = {
      this_week: this_week.length,
      next_week: next_week.length,
      total: tasks.length,
    };

    response(domInfo);
  }
});