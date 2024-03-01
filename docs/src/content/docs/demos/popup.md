---
title: PopUp (Bubble)
description: A reference page in my new Starlight docs site.
---

Add a chat bubble to the lower right corner of your site, which will open the chat as a popup.

## Embed Code

<script type="module">
    const chatflowid = 'b07341b9-97b4-491e-a49e-8cf7da73d235';
    import Chatbot from 'http://localhost:5678/web.js';
    Chatbot.init({
        chatflowid: chatflowid,
        apiHost: 'http://localhost:3000',
    });
</script>

```html
<script type="module">
  import Chatbot from 'https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js';
  Chatbot.init({
    chatflowid: 'b07341b9-97b4-491e-a49e-8cf7da73d235',
    apiHost: 'http://localhost:3000',
  });
</script>
```
