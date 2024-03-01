---
title: Configure
description: A reference page in my new Starlight docs site.
---

Add a chat bubble to the lower right corner of your site, which will open the chat as a popup.

## Chat Endpoint

```javascript
Chatbot.init({
  chatflowid: '<chatflowid>',
  apiHost: 'http://localhost:3000',
});
```

## Configuration

```javascript
Chatbot.init({
  chatflowid: "'<chatflowid>'",
  apiHost: 'http://localhost:3000',
  chatflowConfig: {
    // topK: 2
  },
  theme: {
    button: {
      backgroundColor: '#3B81F6',
      right: 20,
      bottom: 20,
      size: 'medium',
      iconColor: 'white',
      customIconSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
    },
    chatWindow: {
      welcomeMessage: 'Hello! This is custom welcome message',
      // etc ...
    },
  },
});
```

## Configure

<form id="chatflowid-form">
    <fieldset class="border border-gray-200 p-4 rounded-md">
        <legend class="text-lg font-medium text-gray-700 dark:text-gray-300">Chatflow Configuration</legend>
        <div class="row row-auto">
            <label
                for="chatflowid"
            >
                Chatflow ID
            </label>
            <input
                id="chatflowid"
                placeholder="Enter your Chatflow ID"
            />
            <p class="hint">Hint: You can find your Chatflow ID in the settings.</p>
        </div>
        <input type="submit" value="Update" />
    </fieldset>
</form>
<script>
    const configForm = document.getElementById('chatflowid-form');
    configForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const chatflowIdValue = document.getElementById('chatflowid').value;
        console.log(chatflowIdValue);
        window.chatflowid = chatflowIdValue;
    })
</script>
