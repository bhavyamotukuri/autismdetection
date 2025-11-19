// chatbot.js

document.addEventListener("DOMContentLoaded", () => {
  const chatIcon = document.getElementById("chat-icon");
  const chatBox = document.querySelector(".chat-box");
  const chatBody = document.getElementById("chat-body");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");

  chatIcon.addEventListener("click", () => {
    chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";
  });

  const responses = {
    hello: "Hello! How can I assist you today?",
    hi: "Hi there! Need help with autism resources or specialists?",
    autism: "Autism is a developmental disorder. I can provide info about doctors, clinics, therapies, or screenings.",
    clinic: "You can check our 'Contacts' page for autism clinics and specialists in India.",
    doctor: "We have a list of autism specialists on our Contacts page.",
    specialist: "Visit the Contacts page to find autism specialists near you.",
    mchat: "M-CHAT is a screening tool for toddlers. You can access it on our M-CHAT page.",
    therapy: "Therapies like behavioral therapy, occupational therapy, speech therapy, and sensory therapy help children with autism.",
    behavioral: "Behavioral therapy helps improve social, communication, and learning skills for autistic children.",
    occupational: "Occupational therapy helps with daily skills and sensory challenges.",
    speech: "Speech therapy helps improve communication skills.",
    support: "You can find local support groups, therapists, and online communities for guidance.",
    counseling: "Counseling helps parents and children cope with autism challenges.",
    contact: "You can find contact details for specialists and clinics on our Contacts page.",
    india: "Our resources are mainly focused on Indian cities like Mumbai, Delhi, Bengaluru, Chennai, and Kolkata.",
    mumbai: "You can find autism specialists in Mumbai on the Contacts page.",
    delhi: "You can find autism specialists in Delhi on the Contacts page.",
    bengaluru: "You can find autism specialists in Bengaluru on the Contacts page.",
    chennai: "You can find autism specialists in Chennai on the Contacts page.",
    kolkata: "You can find autism specialists in Kolkata on the Contacts page.",
    early: "Early intervention is crucial for children with autism. Our listed clinics provide early therapy services.",
    diagnosis: "Autism can be diagnosed by developmental pediatricians, child neurologists, and psychiatrists.",
    assessment: "Screening tools like M-CHAT help identify autism in toddlers early.",
    resources: "You can explore resources on our News, Videos, and Contacts pages.",
    news: "Check the News page for the latest articles on autism research, therapies, and awareness.",
    videos: "Our Videos page contains informative content about autism and therapies.",
    help: "Sure! You can ask me about autism, doctors, clinics, therapies, M-CHAT, or support groups.",
    appointment: "Please call the clinic directly to schedule an appointment. Contact info is on the Contacts page.",
    symptoms: "Common autism symptoms include difficulty in communication, social interaction, repetitive behaviors, and sensory sensitivities.",
    development: "Monitoring developmental milestones early is important. M-CHAT can help screen toddlers for autism.",
    learning: "Many therapies focus on enhancing learning, social, and communication skills.",
    parent: "Parents can find guidance, therapy suggestions, and support groups on our website.",
    online: "We also provide links to online resources, videos, and educational material for autism support."
  };

  // Default fallback reply
  const defaultReply = "I am here to help! Ask me about autism, clinics, doctors, therapies, M-CHAT, or support.";

  // Function to add message to chat
  function addMessage(message, sender = "user") {
    const msgDiv = document.createElement("div");
    msgDiv.className = sender === "user" ? "user-message" : "bot-message";
    msgDiv.textContent = message;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function getBotReply(input) {
    input = input.toLowerCase();
    for (let key in responses) {
      if (input.includes(key)) {
        return responses[key];
      }
    }
    return defaultReply;
  }
  sendBtn.addEventListener("click", () => {
    const userText = chatInput.value.trim();
    if (!userText) return;
    addMessage(userText, "user");
    const botReply = getBotReply(userText);
    setTimeout(() => addMessage(botReply, "bot"), 300);
    chatInput.value = "";
  });

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
  });
});
