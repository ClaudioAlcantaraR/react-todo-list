import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
/* Bootstrap */
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return [];
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Comprobamos si el el campo esta vacío o no 
    if(!name) {
      // Mostramos un error alert si el el campo esta vacío
      showAlert(true, 'danger', 'Por favor, escribe una tarea');
    } else if(name && isEditing) {
      // deal with edit
      setList(
        list.map((item) => {
          if(item.id === editID){
            return {...item, title: name};
          }
          return item;        
      })
    )
    setName('');
    setEditID(null);
    setIsEditing(false);
    showAlert(true, 'success', 'Tarea editada');
    } else {
      // Llamamos la alerta de exito y el mensaje
      showAlert(true, 'success', 'Tarea añadida a la lista');
      const newItem = {id: new Date().getTime().toString(), title: name};
      setList([...list, newItem]);
      setName('');
    }
  }

  // Creamos la constante (logica) que maneja las alertas
  const showAlert = (show = false, type = '', msg = '' ) => {
    setAlert({show:show, type, msg})
  }

  // Limpiamos la lista de tareas
  const clearList = () => {
    showAlert(true, 'danger', 'Lista vacia');
    setList([]);
  }

  // Funcionalidad para remover tareas individuales
  const removeItem = (id) => {
    showAlert(true, 'danger', 'Tarea eliminada');
    setList(list.filter((item) => item.id !== id));
  }

  // Editamos la tarea añadida
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  // Guardamos los datos en los Local Storage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <Container className="main-container">
      <h3>Mi lista de tareas</h3>
      <Form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>} 
        <Col className="add-task-container">
          <Form.Control type="text" placeholder="Añade una tarea" value={name} onChange={(e) => setName(e.target.value)} />
          <Button type="submit" className="submit-button" variant="dark">
            {isEditing ? 'Editar' : 'Añadir'}
          </Button>
        </Col>
      </Form>
      {list.length > 0 && (
        <Col>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <Button onClick={clearList} className="clear-all-button" variant="outline-danger">
            Borrar todas las tareas
          </Button>
        </Col>
      )}
    </Container>  
  );
}

export default App;