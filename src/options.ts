interface Config {
  apiUrl: string;
  bearerToken: string;
  note?: string;
  isActive: boolean;
}

function saveConfig(config: Config, callback: () => void) {
  chrome.storage.sync.get('configs', (data) => {
    const configs: Config[] = data.configs || [];
    configs.push(config);
    chrome.storage.sync.set({ configs }, callback);
  });
}

function updateConfigList(newConfigs: Config[], callback?: () => void) {
  chrome.storage.sync.set({ configs: newConfigs }, callback);
}

function deleteConfig(index: number, callback: () => void) {
  chrome.storage.sync.get('configs', (data) => {
    const configs: Config[] = data.configs || [];
    configs.splice(index, 1);
    chrome.storage.sync.set({ configs }, callback);
  });
}

function setActiveConfig(index: number) {
  chrome.storage.sync.get('configs', (data) => {
    const configs: Config[] = data.configs || [];
    configs.forEach((config, i) => {
      config.isActive = i === index;
    });
    chrome.storage.sync.set({ configs }, renderConfigList);
  });
}

function renderConfigList() {
  chrome.storage.sync.get('configs', (data) => {
    const configs: Config[] = data.configs || [];
    const configList = document.getElementById('configList') as HTMLElement;
    configList.innerHTML = '';

    configs.forEach((config, index) => {
      const listItem = document.createElement('div');
      listItem.className = 'p-4 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex justify-between items-center cursor-move';
      listItem.draggable = true;
      listItem.dataset.index = index.toString();

      listItem.addEventListener('dragstart', (e) => {
        e.dataTransfer?.setData('text/plain', index.toString());
      });

      listItem.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      listItem.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedIndex = parseInt(e.dataTransfer?.getData('text/plain') || '-1', 10);
        if (draggedIndex !== index) {
          const temp = configs[draggedIndex];
          configs[draggedIndex] = configs[index];
          configs[index] = temp;
          updateConfigList(configs, renderConfigList);
        }
      });

      const apiUrl = document.createElement('div');
      apiUrl.textContent = `API URL: ${config.apiUrl}`;
      listItem.appendChild(apiUrl);

      const bearerToken = document.createElement('div');
      bearerToken.textContent = `Bearer Token: ${config.bearerToken.slice(0, config.bearerToken.length / 2)}****`;
      listItem.appendChild(bearerToken);

      const note = document.createElement('div');
      note.textContent = `Note: ${config.note || ''}`;
      listItem.appendChild(note);

      const buttonsDiv = document.createElement('div');
      buttonsDiv.className = 'space-x-2 flex items-center';

      const setActiveButton = document.createElement('button');
      setActiveButton.textContent = config.isActive ? 'Active' : 'Set Active';
      setActiveButton.className = config.isActive ? 'btn btn-primary' : 'btn';
      setActiveButton.addEventListener('click', () => setActiveConfig(index));
      buttonsDiv.appendChild(setActiveButton);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'btn btn-error';
      deleteButton.addEventListener('click', () => deleteConfig(index, renderConfigList));
      buttonsDiv.appendChild(deleteButton);

      const cloneButton = document.createElement('button');
      cloneButton.textContent = 'Fork';
      cloneButton.className = 'btn btn-secondary';
      cloneButton.addEventListener('click', () => {
        (document.getElementById('apiUrl') as HTMLInputElement).value = config.apiUrl;
        (document.getElementById('bearerToken') as HTMLInputElement).value = config.bearerToken;
        (document.getElementById('note') as HTMLInputElement).value = config.note || '';
      });
      buttonsDiv.appendChild(cloneButton);

      listItem.appendChild(buttonsDiv);
      configList.appendChild(listItem);
    });
  });
}

document.getElementById('submitBtn')?.addEventListener('click', () => {
  const apiUrl = (document.getElementById('apiUrl') as HTMLInputElement).value;
  const bearerToken = (document.getElementById('bearerToken') as HTMLInputElement).value;
  const note = (document.getElementById('note') as HTMLInputElement).value;

  const config: Config = {
    apiUrl,
    bearerToken,
    note,
    isActive: false,
  };

  saveConfig(config, () => {
    renderConfigList();
    (document.getElementById('flashMessage') as HTMLElement).classList.remove('hidden');
    setTimeout(() => {
      (document.getElementById('flashMessage') as HTMLElement).classList.add('hidden');
    }, 3000);
  });

  (document.getElementById('apiUrl') as HTMLInputElement).value = 'http://localhost:4000/api/links';
  (document.getElementById('bearerToken') as HTMLInputElement).value = '';
  (document.getElementById('note') as HTMLInputElement).value = '';
});

document.getElementById('resetBtn')?.addEventListener('click', () => {
  (document.getElementById('apiUrl') as HTMLInputElement).value = 'http://localhost:4000/api/links';
  (document.getElementById('bearerToken') as HTMLInputElement).value = '';
  (document.getElementById('note') as HTMLInputElement).value = '';
});

// Initialize config list on page load
document.addEventListener('DOMContentLoaded', renderConfigList);
