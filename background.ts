// console.log("Extension installed");
// chrome.runtime.onInstalled.addListener(() => {
//   console.log('Slink Collector extension installed');
// });

// This callback WILL NOT be called for "_execute_action"
chrome.commands.onCommand.addListener((command, tab) => {
  console.log(`Command "${command}" called and tab: "${tab.url}"`);

  if (command === "collect") {
    console.log(`creating link from url: "${tab.url}"`);
    const link_obj = {
      title: tab.title,
      url: tab.url,
    };

    chrome.storage.sync.get("configs", (data) => {
      const activeConfig = data.configs?.find((config: any) => config.isActive);
      if (!activeConfig) {
        alert("No active configuration found!");
        // should open option page???
        return;
      }

      fetch(activeConfig.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeConfig.bearerToken}`,
        },
        body: JSON.stringify({ link: link_obj }),
      })
        .then((response) => {
          response.json();
        })
        .then((data) => {
          // todo check whether collected ?? or update??
          // response data: undefined
          console.log(`response data: ${JSON.stringify(data)}`);
          chrome.scripting.executeScript(
            {
              target: { tabId: tab.id },
              args: [tab.url, tab.title],
              func: (url: string, title: string) => {
                // NOTE: this log in content page console
                console.log(
                  `${title} collected with url: ${url} from contents console`
                );

                // TODO: check if alert is allowed in config
                // alert(`"${url}" collected!`);

                // make background color of page yellow
                const color = "yellow";
                // Store the original background color
                const originalColor = document.body.style.backgroundColor;
                // Change the background color
                document.body.style.backgroundColor = color;
                // Restore the original background color after the specified duration
                setTimeout(() => {
                  document.body.style.backgroundColor = originalColor;
                }, 300);
              },
            },
            () => {
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
              } else {
                // NOTE: this log in extension console
                console.log(
                  "Script executed successfully in chrome-extension console"
                );
              }
            }
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }
});

chrome.runtime.onInstalled.addListener((reason) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    checkCommandShortcuts();
  }
});

// Only use this function during the initial install phase. After
// installation the user may have intentionally unassigned commands.
function checkCommandShortcuts() {
  console.log("check extension commands");
  chrome.commands.getAll((commands) => {
    let missingShortcuts = [];

    for (let { name, shortcut } of commands) {
      if (shortcut === "") {
        missingShortcuts.push(name);
      }
    }

    if (missingShortcuts.length > 0) {
      // Update the extension UI to inform the user that one or more
      // commands are currently unassigned.
      console.log(`command "${missingShortcuts}" missing shortcuts!`);
    }
  });
}
