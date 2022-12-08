import React from 'react';
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
/* Bootstrap */
import Button from 'react-bootstrap/Button';

const List = ({ items, removeItem, editItem }) => {
  return (
    <div>
        {items.map((item) => {
            const {id, title} = item;
            return (
                <div key={id} className="task-list">
                    <div><span className="task-name">{title}</span></div>
                    <div>
                        <Button variant="outline-success" type="button" onClick={() => editItem(id)}>
                            <BsPencilSquare />
                        </Button>
                        <Button className="ms-3" variant="outline-danger" type="button" onClick={() => removeItem(id)}>
                            <BsFillTrashFill />
                        </Button>
                    </div>
                </div>
            );
        })}
    </div>
  ); 
}

export default List;