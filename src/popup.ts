document.addEventListener('DOMContentLoaded', () => {
  // Show config info
  chrome.storage.sync.get('configs', (data) => {
    const activeConfig = data.configs?.find((config: any) => config.isActive);
    if (!activeConfig) {
      alert('No active configuration found!');
      return;
    }
    (document.getElementById('configInfo') as HTMLDivElement).innerHTML = `
      <div class="text-red-400">
        Remote API: ${activeConfig.apiUrl}
      </div>
      <div class="text-blue-400">
        Note: ${activeConfig.note || '-'}
      </div>
    `
  });

  // set extension options link like: chrome-extension://mfkadgfffcilleioicojholjblemhdne/options.html
  (document.getElementById('optionsLink') as HTMLAnchorElement).href = `chrome-extension://${chrome.runtime.id}/options.html`

  // 填充当前标签页的信息
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    (document.getElementById('url') as HTMLInputElement).value = currentTab.url || '';
    (document.getElementById('title') as HTMLInputElement).value = currentTab.title || '';
  });

  // 提交表单数据到 API
  document.getElementById('submitBtn')?.addEventListener('click', (e) => {
    e.preventDefault();

    const url = (document.getElementById('url') as HTMLInputElement).value;
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const note = (document.getElementById('note') as HTMLInputElement).value;
    const tags = (document.getElementById('tags') as HTMLInputElement).value.split(',');

    chrome.storage.sync.get('configs', (data) => {
      const activeConfig = data.configs?.find((config: any) => config.isActive);
      if (!activeConfig) {
        alert('No active configuration found!');
        return;
      }

      fetch(activeConfig.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${activeConfig.bearerToken} `
        },
        body: JSON.stringify({ link: { url, title, note, tags } })
      })
        .then(response => response.json())
        .then(data => {
          const flashMessage = document.getElementById('flashMessage') as HTMLElement;
          flashMessage.classList.remove('hidden');
          flashMessage.textContent = `Page submitted successfully! ID: ${data.id} `;
        })
        .catch(error => {
          console.error('Error:', error);
          const flashMessage = document.getElementById('flashMessage') as HTMLElement;
          flashMessage.classList.remove('hidden');
          flashMessage.textContent = `Error submitting page: ${error.message} `;
        });
    });
  });
});
