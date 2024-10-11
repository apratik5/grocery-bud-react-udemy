import { useState } from "react";
import Form from "./Form";
import { nanoid } from "nanoid";
import Items from "./Items";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const defaultList = JSON.parse(localStorage.getItem('list') || '[]');
  const [items, setItems] = useState(defaultList);

  const addItem = (itemName) => {
    const newItem = {
      name: itemName,
      completed: false,
      id: nanoid()
    }

    const newItems = [...items, newItem];
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success('Item added successfully');
  }

  const removeItem = (itemId) => {
    const newItems = items.filter((item) => item.id !== itemId)
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success('Item removed successfully');
  }

  const setLocalStorage = (items) => {
    localStorage.setItem('list', JSON.stringify(items));
  }

  const editItem = (itemId) => {
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        const newItem = { ...item, completed: !item.completed }
        return newItem;
      }
      return item;
    });
    setItems(newItems);
    setLocalStorage(newItems);
  }

  return (
    <section className="section-center">
      <ToastContainer position="top-center" />
      <Form addItem={addItem} />
      <Items removeItem={removeItem} items={items} editItem={editItem} />
    </section>
  );
};

export default App;
