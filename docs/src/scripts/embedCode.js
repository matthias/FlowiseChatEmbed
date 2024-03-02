export function handleEmbedCode( initFunction, button, execute = true ) {

  console.log('handleEmbedCode', initFunction, button, execute);
  return;

  if (execute) {
    window.addEventListener('load', () => embedCode());
    window.addEventListener('config-update', () => embedCode());
  } else {
    button.addEventListener('click', () => embedCode());
  }
  return;

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


