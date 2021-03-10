import {useEffect, useState} from 'react';

export default function List({URL, criteria}) {
    const [items, setItems] = useState([]);
    const [item, setItem] = useState('');
    const [amount, setAmount] = useState('');
    const [editItem, setEditItem] = useState(null);
    const [editAmount, setEditAmount] = useState('')
    const [editDescription, setEditDescription] = useState('');
  
    useEffect(() => {
      let status = 0;
      let address = URL + 'index.php'

      if (criteria != null) {
        address = URL + 'search.php/' + criteria;
      }

      fetch(address)
      .then(res => {
        status = parseInt(res.status);
        return res.json();
      })
      .then(
        (res) => {
          if(status === 200) {
          setItems(res);
        } else {
          alert(res.error);
        }
        }, (error) => {
          alert(error)
        }
      )
    }, [criteria])
  
    function save(e) {
      e.preventDefault();
  
      let status = 0;
      fetch(URL + 'create.php',{
        method: 'POST',
        headers: {
          'Accept': 'application(json)',
          'Content-type':'application(json)',
        },
        body: JSON.stringify({
          description: item,
          amount: amount
        })
      })
      .then(res => {
        status = parseInt(res.status);
        return res.json();
      })
      .then(
        (res) => {
          if(status ===200) {
            setItems(items => [...items,res]);
            setItem('');
            setAmount('');
          } else {
            alert(res.error);
          }
          }, (error) => {
            alert(error)
          }
      )
    }
  
    function remove(id) {
      let status = 0;
      fetch(URL + 'delete.php',{
        method: 'POST',
        headers: {
          'Accept': 'application(json)',
          'Content-type':'application(json)',
        },
        body: JSON.stringify({
          id: id
        })
      })
      .then(res => {
        status = parseInt(res.status);
        return res.json();
      })
      .then(
        (res) => {
          if(status ===200) {
            const newListWithoutRemoved = items.filter((item) => item.id !== id);
            setItems(newListWithoutRemoved);
          } else {
            alert(res.error);
          }
          }, (error) => {
            alert(error)
          }
      )
    }
  
    function setEditedItem(item) {
      setEditItem(item);
      setEditDescription(item?.description);
      setEditAmount(item?.amount);
    }
  
    function update(e) {
      e.preventDefault();
      let status = 0;
      fetch(URL + 'update.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type':'application/json',
        },
        body: JSON.stringify({
          id: editItem.id,
          description: editDescription,
          amount: editAmount
        })
      })
      .then(res => {
        status = parseInt(res.status);
        return res.json();
      })
      .then(
        (res) => {
          if(status ===200) {
            items[(items.findIndex(item => item.id === editItem.id))].description = editDescription;
            items[(items.findIndex(item => item.id === editItem.id))].amount = editAmount;
            setItems([...items]);
            setEditItem(null);
            setEditDescription('');
            setEditAmount('');
          } else {
            alert(res.error);
          }
          }, (error) => {
            alert(error)
          }
      )
    }
  
    return (
      <>
        <div className="container">
          <h3>Shopping list</h3>
          <form onSubmit={save}>
            <div>
              <label>New item</label>&nbsp;
              <input value={item} onChange={e=> setItem(e.target.value)}></input>
            </div>
            <div>
              <label>Amount</label>&nbsp;
              <input value={amount} onChange={e=> setAmount(e.target.value)}></input>
            </div>
            <button>Save</button>
          </form>
          <ol>
            {items.map(item => (
              <li key={item.id}>
                {editItem?.id !== item.id &&
                item.description
                } &nbsp;   
                {editItem?.id !== item.id &&
                  item.amount
                } pcs.
                {editItem?.id === item.id &&
                  <form onSubmit={update}>
                    <input value={editDescription} onChange={e=> setEditDescription(e.target.value)} />
                    <input value={editAmount} onChange={e=> setEditAmount(e.target.value)} />
                    <button>Save</button>
                    <button type="button" onClick={() => setEditedItem(null)}>Cancel</button>
                  </form>
                } &nbsp; &nbsp;
                <a className="delete" onClick={() => remove(item.id)} href="#">Delete</a>&nbsp;
                {editItem === null &&
                <a className="edit" onClick={() => setEditedItem(item)} href="#">Edit</a>
                } 
              </li>
            ))}
          </ol>
        </div>
      </>
    );
}