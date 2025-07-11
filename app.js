document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addForm");
  const itemsDiv = document.getElementById("items");

  const userID = localStorage.getItem("anonUser") || (() => {
    const id = "user" + Math.floor(Math.random() * 100000);
    localStorage.setItem("anonUser", id);
    return id;
  })();

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const price = document.getElementById("price").value;
      const desc = document.getElementById("desc").value;
      const photo = document.getElementById("photo").files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const item = {
          id: Date.now(),
          title,
          price,
          desc,
          photo: reader.result,
          user: userID
        };
        const items = JSON.parse(localStorage.getItem("items") || "[]");
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
        window.location.href = "index.html";
      };
      if (photo) reader.readAsDataURL(photo);
    });
  }

  if (itemsDiv) {
    const items = JSON.parse(localStorage.getItem("items") || "[]");
    items.reverse().forEach(item => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = \`
        <h2>\${item.title}</h2>
        <p>💰 \${item.price} грн</p>
        <p>\${item.desc}</p>
        \${item.photo ? '<img src="' + item.photo + '">' : ''}
        <p>👤 \${item.user}</p>
        <a class="chat-btn" href="#">Чат</a>
      \`;
      itemsDiv.appendChild(div);
    });
  }
});