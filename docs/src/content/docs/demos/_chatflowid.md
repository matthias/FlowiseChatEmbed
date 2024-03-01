---
title: Chaflow ID
description: A reference page in my new Starlight docs site.
---

Work In Progress - test code

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
