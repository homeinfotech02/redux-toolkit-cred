import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount, ResetAmout } from '../../features/counter/counterSlice';
import { useState } from 'react';

const Counter = () => {
    const [amount, setAmount] = useState(0)

    const count = useSelector((state) => state.counter.value);

    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(increment())

    }

    const handleDecrement = () => {
        dispatch(decrement())
    }

    const handleReset = () => {
        dispatch(ResetAmout(5))
    }

    const handleIncrementByAmout = () => {
        dispatch(incrementByAmount(amount))
    }

    return (
        <div>
            <button onClick={handleIncrement}> + </button>
            <p>Count: {count}</p>
            <button onClick={handleDecrement}> - </button>
            <br />
            <br />
            <button onClick={handleReset}> Reset </button>
            <br />
            <br />
            <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} />
            <br />
            <br />
            <button onClick={handleIncrementByAmout}> Increment by Amout </button>
        </div>
    )
}

export default Counter