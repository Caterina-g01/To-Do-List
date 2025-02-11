import { useState } from 'react'
import './App.css'
import Input from './components/Input/Input'

interface IComment {
  id: number,
  title: string
}

function App() {
  const [value, setValue] = useState<string>("");
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [error, setError] = useState<string>("");
  const handleValueChange = (newValue: string) => {
    setValue(newValue);
  };

  const addComment = () => {
    const newComment = {
      id: Math.random(),
      title: value
    }
    if(value.length < 3) {
      setError("new error");
      return
    } 
    setComments([...comments || [], newComment]);
    setValue("")
  }

  const deleteAllComments = () => {
    setComments([]);
  }

  const deleteComment = (id: number) => {
    setComments((comments) => comments?.filter(comment => comment.id !== id) || []);
    console.log("click")
  }

  const editComment = (id: number, newTitle: string) => {
    setComments((comments) => comments?.map(comment => comment.id === id ? {...comment, title: newTitle} : comment) || []);
  }

  return (
    <div className='container'>
        <div className='input-container'>
    <Input value={value} handleChange={handleValueChange}/>
    <div className='btns-container'>
    <button onClick={addComment}>Add</button>
    <button onClick={deleteAllComments}>Delete All</button>
    </div>
    </div>
   
    {comments?.map((comment) => {
      return (
        <div className="comment" key={comment.id}>
      <div>{comment.title}</div>
      <div className='btns-container'>
      <button onClick={() => editComment(comment.id, comment.title)} >Edit</button>
      <button onClick={() => deleteComment(comment.id)}>Delete</button>
      </div>
      </div>
    )
    }
    )}
    {error}
    </div>
  )
}

export default App
