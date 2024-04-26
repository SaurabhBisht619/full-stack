import React, { useEffect, useState } from "react";

const Todo = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
  });

  async function fetchProduct() {
    const res = await fetch("/api/products");
    const result = await res.json();
    setProducts(result);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchProduct();
    if (!form.name || !form.price) {
      return;
    }
    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "/application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchProduct();
        setForm({
          name: "",
          price: "",
        });
      });
  }

  function updateForm(e, field) {
    if (field === "name") {
      setForm({ ...form, name: e.target.value });
    } else if (field === "price") {
      setForm({ ...form, price: e.target.value });
    }
  }

  function handleDelete(id) {
    fetch(`/api/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        fetchProduct();
      });
  }

  return (
    <div>
      <div className="formSection">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateForm(e, "name")}
            name=""
            id=""
            placeholder="Enter Name"
          />
          <input
            type="text"
            value={form.price}
            onChange={(e) => updateForm(e, "price")}
            name=""
            id=""
            placeholder="Enter Price"
          />
          <button>Submit</button>
        </form>
      </div>
      {products.length == 0 ? (
        <div>Loading</div>
      ) : (
        <div>
          <div className="product">
            {products.map((item) => {
              return (
                <div key={item.id}>
                  <div className="name">{item.name}</div>
                  <div className="price">${item.price}</div>
                  <div className="delete" onClick={() => handleDelete(item.id)}>
                    X
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
