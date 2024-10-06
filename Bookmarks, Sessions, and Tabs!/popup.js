document.addEventListener('DOMContentLoaded', function() {
    const sortButton = document.getElementById('sortButton');
    const tabList = document.getElementById('tabList');
  
    // Function to update tab list
    function updateTabList() {
      chrome.tabs.query({}, tabs => {
        tabList.innerHTML = '';
        tabs.forEach(tab => {
          const li = document.createElement('li');
          li.textContent = tab.title;
          tabList.appendChild(li);
        });
      });
    }
  
    // Initial tab list update
    updateTabList();
  
    // Event listener for sort button
    sortButton.addEventListener('click', function() {
      chrome.tabs.query({}, tabs => {
        // Sort tabs by domain
        tabs.sort((a, b) => {
          const domainA = new URL(a.url).hostname;
          const domainB = new URL(b.url).hostname;
          return domainA.localeCompare(domainB); 
        });
  
        // Update tab positions in browser
        tabs.forEach((tab, index) => {
          chrome.tabs.move(tab.id, {index}); 
        });
  
        // Update tab list UI
        updateTabList();
      });
    });
  });