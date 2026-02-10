const chatContainer = document.getElementById('chat-container');
chatContainer.innerHTML = `<input id="userInput" placeholder="Ask something..." />
  <button onclick="sendToBot()">Send</button>
  <div id="chatLog"></div>`;

async function sendToBot() {
  const userText = document.getElementById("userInput").value;
  document.getElementById("chatLog").innerHTML += `<p><b>You:</b> ${userText}</p>`;
  
  const res = await fetch('http://localhost:3000/chat', {

    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText })
  });
  
  const data = await response.json();
  document.getElementById("chatLog").innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;
}
