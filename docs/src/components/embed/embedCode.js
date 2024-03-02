import Chatbot from 'http://localhost:5678/web.js';

export function handleEmbedCode(initFunctionName, buttonID, execute = true) {
  const button = document.getElementById(buttonID);
  const initFunction = Chatbot[initFunctionName];

  if (execute) {
    embedCode();
    window.addEventListener('config-update', () => embedCode());
  } else {
    button.addEventListener('click', () => embedCode());
  }
  
  function embedCode() {
    // Get config from local storage
    const chatFlowConfig = {
      chatflowid: localStorage.getItem('chatflowid'),
      apiHost: localStorage.getItem('apiHost'),
    };
    const configComplete = chatFlowConfig.chatflowid && chatFlowConfig.apiHost;

    // If config is not complete, show a message and redirect user to settings
    if (!configComplete) {
      button.textContent = 'Configure chatflowID and apiHost in Settings';
      button.addEventListener('click', () => {
        button.textContent = 'Configure chatflowID and apiHost in Settings';
        window.location.href = '/settings/';
      });
      return;
    }

    // finally, execute the init function, if config is available
    initFunction(chatFlowConfig);

    // Show success message
    button.textContent = 'embed code executed ...';
    button.setAttribute('disabled', true);
  }
}
