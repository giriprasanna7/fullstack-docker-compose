import React, { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

const API_URL = "http://54.175.89.180:5000";
  const getContacts = async () => {
    try {
      const response = await fetch(`${API_URL}/contacts`);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const addContact = async (e) => {
    e.preventDefault();

    if (!name || !phone || !email) {
      alert("Please fill all fields");
      return;
    }

    try {
      await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone,
          email
        })
      });

      setName("");
      setPhone("");
      setEmail("");

      getContacts();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await fetch(`${API_URL}/contacts/${id}`, {
        method: "DELETE"
      });

      getContacts();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Contact Book</h1>

      <form onSubmit={addContact} className="contact-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Add Contact</button>
      </form>

      <h2>Contacts</h2>

      <div className="contacts">
        {contacts.map((contact) => (
          <div className="contact-card" key={contact._id}>
            <h3>{contact.name}</h3>
            <p>📞 {contact.phone}</p>
            <p>✉️ {contact.email}</p>

            <button onClick={() => deleteContact(contact._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
