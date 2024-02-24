const urls = [
    '*://*.facebook.com/',
    '*://*.twitter.com/',
    '*://*.youtube.com/',
    '*://*.instagram.com/'
  ]
  
  let active = {};
  
  const getActiveTab = () => {
    return new Promise(resolve => {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, activeTab => {
        resolve(activeTab[0]);
      });
    });
  }
  
  const setActive = async () => {
    const activeTab = await getActiveTab();
    if (activeTab) {
      const { url } = activeTab;
      // check if the tab's url is among the arrays of url
      let host = new URL(url).hostname;
      host = host.replace('www.', '').replace('.com', '');
      if (urls.some(each => each.includes(host))) {
        // set the site and current time
        let fullDate = new Date()
        active = {
            name: host,
            date: fullDate.getDate() + '-' + fullDate.toLocaleString('default', { month: 'short' }) + '-' + fullDate.getFullYear(),
            time: String(fullDate.getHours()).padStart(2, '0') + ':' + String(fullDate.getMinutes()).padStart(2, '0') + ':' + String(fullDate.getSeconds()).padStart(2, '0'),
            full_date: fullDate
            
        };
        console.log(`${active.name} visited at ${active.time}, ${active.date}`);
      }
    }
  }



chrome.tabs.onUpdated.addListener((tabId, changeDetails, tab) => {
    setActive()
  });

chrome.tabs.onActivated.addListener(() => {
    setActive()
});

chrome.windows.onFocusChanged.addListener(window => {
    setActive()
  });