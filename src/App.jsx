import "./App.css";
import allContacts from "./contacts.json"
import { useState } from "react";

const fiveContacts = allContacts.slice(0, 5)

function App() {
  console.log(fiveContacts)
  
  
  const [contact, setContact] = useState(fiveContacts)
  
  function handleRandomContact() { 
    const copy = [...contact]
    const remainingContacts = allContacts.filter(item => !contact.includes(item))
    if(!remainingContacts.length) return;
    copy.unshift(remainingContacts[Math.floor(Math.random() * remainingContacts.length)])
    setContact(copy)
  }

  function handleSortByName() {
    const copy = [...contact]
    copy.sort((a,b) => a.name.localeCompare(b.name))
    setContact(copy)
  } 

  function handleSortByPopularity() {
    const copy = [...contact]
    copy.sort((a,b) => b.popularity - a.popularity)
    setContact(copy)
  } 


  function handleDelete(id) {
    setContact(contact.filter((contact) => contact.id !== id))
  }

  return (
  <div className="App">
  <h1>IronContacts</h1>
  <div className="buttons">
  <button onClick={handleRandomContact}>Add Random Contact</button>
  <button onClick={handleSortByName}>Sort by Name</button>
  <button onClick={handleSortByPopularity}>Sort by Popularity</button>
  </div>

  <table className="contact-table">
  <thead>
    <tr>
      <th>Picture</th>
      <th>Name</th>
      <th>Popularity</th>
      <th>Won Oscar</th>
      <th>Won Emmy</th>
      <th>Actions</th>
    </tr>
  </thead>
    <tbody>
    {contact.map( contact => {
      return (
        <tr key={contact.name}>
          <td><img src={contact.pictureUrl} alt="" /></td>
          <td>{contact.name}</td>
          <td>{contact.popularity.toFixed(2)}</td>
          <td>{contact.wonOscar ? '🏆' : ''}</td>
          <td>{contact.wonEmmy ? '🏆' : ''}</td>
          <td><button onClick={() => {handleDelete(contact.id)}}>Delete</button></td>
        </tr>
      )
    })}
    </tbody>
  </table>
  </div>
  );
}
export default App;
