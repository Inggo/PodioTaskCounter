// Update the relevant fields with the new data
function setDOMInfo(info) {
  document.getElementById('this_week').innerHTML = info.this_week;
  document.getElementById('next_week').innerHTML = info.next_week;
  document.getElementById('total').innerHTML = info.total;
}

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        setDOMInfo);
  });
});