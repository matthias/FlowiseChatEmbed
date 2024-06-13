import Chatbot from '/wp-content/themes/waff/assets/dist/scripts/vendor/chatbot-ui.js';
export function initChatBot(id) {
  console.log('chatbot.js loaded');
  var chatConfig = {
    chatflowid: 'e3d9bbb2-ab94-4728-a829-9dd08773ed01',
    apiHost: 'https://waffchat.onrender.com',
    theme: {
      chatWindow: {
        showTitle: true,
        welcomeMessage: 'Ich bin der Pflegebot des waff. Welche Fragen hast du an mich?',
        errorMessage: 'FEHLER: Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
        backgroundColor: 'transparent',
        botMessage: {
          showAvatar: true,
          avatarSrc: 'assets/waff-chat-logo.svg',
        },
        textInput: {
          placeholder: 'Stelle mir deine Frage...',
          maxChars: 250,
          maxCharsWarningMessage: 'Die Frage darf maximal 250 Zeichen lang sein.',
        },
        footer: {
          textColor: '#999',
          text: 'HINWEIS: Antworten des waff Chatbots sind unverbindlich und können Fehler enthalten. ',
          company: 'waff',
          companyLink: 'https://www.waff.at',
        },
      },
    },
  };
  if (id) {
    chatConfig.id = id;
  }
  window.chatbot = Chatbot.initModal(chatConfig);
}
