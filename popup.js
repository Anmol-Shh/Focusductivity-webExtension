document.getElementById('set-timer').addEventListener('click', () => {
    const website = document.getElementById('website').value.trim();
    if (website) {
      const ruleId = Math.floor(Math.random() * 1000) + 1;  // Unique rule ID for each website
      const rule = {
        id: ruleId,
        priority: 1,
        action: { type: 'block' },
        condition: {
          urlFilter: `*://${website}/*`,
          resourceTypes: ['main_frame']
        }
      };
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [rule]
      }, () => {
        alert(`Blocked ${website}`);
      });
    }
  });
  
  document.getElementById('reset').addEventListener('click', () => {
    chrome.declarativeNetRequest.getDynamicRules((rules) => {
      const ruleIds = rules.map(rule => rule.id);
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: ruleIds
      }, () => {
        alert('All blocked websites have been reset.');
      });
    });
  });
  
  document.getElementById('set-timer').addEventListener('click', () => {
    const time = document.getElementById('time').value;
    alert(`Focus mode activated for ${time} minutes.`);
    setTimeout(() => {
      chrome.declarativeNetRequest.getDynamicRules((rules) => {
        const ruleIds = rules.map(rule => rule.id);
        chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: ruleIds
        }, () => {
          alert('Focus time is over! All websites are unblocked.');
        });
      });
    }, time * 60 * 1000);
  });
  