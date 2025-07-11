document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chatBox");
  const form = document.getElementById("chatForm");
  const msgInput = document.getElementById("message");

  const userID = localStorage.getItem("anonUser") || (() => {
    const id = "user" + Math.floor(Math.random() * 100000);
    localStorage.setItem("anonUser", id);
    return id;
  })();

  const chatKey = "chat";
  const messages = JSON.parse(localStorage.getItem(chatKey) || "[]");

  function renderMessages() {
    chatBox.innerHTML = "";
    messages.forEach(msg => {
      const div = document.createElement("div");
      div.className = "msg";
      div.innerHTML = `<strong>${msg.user}:</strong> ${msg.text}`;
      chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const text = msgInput.value.trim();
    if (text) {
      messages.push({ user: userID, text });
      localStorage.setItem(chatKey, JSON.stringify(messages));
      msgInput.value = "";
      renderMessages();
    }
  });

  renderMessages();
});