import React, { useEffect, useState } from "react";
import Todo from "../components/Todo";
import Button from "../components/Button";

const Home = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [todo, setTodo] = useState({
    id: "",
    name: "",
  });
  const [isEditedTodo, setIsEditedTodo] = useState(null);
  const [loading, setLoading] = useState({
    isLoading: false,
    isAddLoading: false,
    isEditLoading: false,
    isDeleteLoading: false,
    isModalOpen: false,
  });

  const fetchData = () => {
    setLoading({ ...loading, isLoading: true });

    fetch("https://63171ab1cb0d40bc414c1674.mockapi.io/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodoItems(data);
        setLoading({ ...loading, isLoading: false });
        setTodo({
          id: "",
          name: "",
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();

    return () => {
      setTodoItems([]);
      setTodo({
        id: "",
        name: "",
      });
      setIsEditedTodo(null);
    };
  }, []);

  const handleAddTodo = () => {
    setLoading({ ...loading, isAddLoading: true });

    const body = {
      name: todo.name,
    };

    if (todo.name.length >= 3)
      fetch("https://63171ab1cb0d40bc414c1674.mockapi.io/todos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((response) => {
        if (response) {
          fetchData();
        }
        setLoading({ ...loading, isAddLoading: false });
      });
  };

  const handleCheckTodoItem = (todo) => {
    if (todo) {
      setIsEditedTodo(todo);
      setLoading({ ...loading, isModalOpen: true });
    }
  };

  const editModal = () => {
    setLoading({ ...loading, isEditLoading: true });

    if (isEditedTodo) {
      fetch(
        `https://63171ab1cb0d40bc414c1674.mockapi.io/todos/${Number(
          isEditedTodo.id
        )}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(isEditedTodo),
        }
      ).then((response) => {
        if (response) {
          fetchData();
        }
        setLoading({ ...loading, isEditLoading: false, isModalOpen: false });
        setIsEditedTodo(null);
      });
    }
  };

  const handleDeleteTodoItem = (id) => {
    setLoading({ ...loading, isDeleteLoading: true });

    fetch(`https://63171ab1cb0d40bc414c1674.mockapi.io/todos/${Number(id)}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response) {
        fetchData();
      }
      setLoading({ ...loading, isDeleteLoading: false });
    });
  };

  return (
    <>
      {isEditedTodo?.id ? (
        <div className="modal">
          <div className="todo-content">
            <form>
              <input
                type="text"
                placeholder="Todo ekle"
                value={isEditedTodo.name}
                onChange={(e) =>
                  setIsEditedTodo({ ...isEditedTodo, name: e.target.value })
                }
              />
              <div className="multi-button-content">
                <Button
                  type="button"
                  className="edit-button"
                  onClick={editModal}
                  disabled={loading.isEditLoading}
                  text="Düzenle"
                />
                <Button
                  type="button"
                  className="delete-button"
                  onClick={() => setIsEditedTodo(null)}
                  disabled={loading.isEditLoading}
                  text="İptal"
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          <form>
            <input
              type="text"
              placeholder="Todo ekle"
              value={todo.name}
              onChange={(e) => setTodo({ ...todo, name: e.target.value })}
            />
            <Button
              type="button"
              className="edit-button"
              disabled={!todo && loading.isAddLoading}
              onClick={handleAddTodo}
              text="Ekle"
            />
          </form>
          {todoItems.length && !loading.isLoading ? (
            todoItems?.map((item, index) => (
              <Todo
                key={index}
                todo={item}
                handleCheckTodoItem={handleCheckTodoItem}
                handleDeleteTodoItem={handleDeleteTodoItem}
                deleteLoading={loading.isDeleteLoading}
              />
            ))
          ) : (
            <form>Listeye görev ekleyin...</form>
          )}
        </>
      )}
    </>
  );
};

export default Home;
