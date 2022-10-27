import React,{useState, useEffect} from 'react'; 
import Button from 'react-bootstrap/Button';



export default function Counter() {

    const [counter, setCounter] = useState(0)

    function increment(){
        setCounter (counter +1)
    }

    function decrement(){
        setCounter (counter -1)
    }

    return (
        <div className='counter'>
            <h1 className='counter-txt'>{counter}</h1>
            <Button variant="contained" className='counter-btn' onClick={increment}>Agree to help</Button>
        </div>
    )


}