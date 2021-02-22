import { FC, useEffect, useState, useRef, useCallback, useMemo } from 'react';
import './App.css';

let renderCount = 0;
let showRenderCount = false;
const logWithCount = (message?: any, ...optionalParams: any[]): void => {
  console.log.apply(console, ['LOG:', message, ...optionalParams, showRenderCount ? { renderCount } : '']);
}


const App: FC<{ initialCount?: number }> = ({ initialCount = 0}) => {
  ++renderCount;
  logWithCount('top of Component');

  const [count, setCount] = useState(initialCount);
  const [someData, setSomeData] = useState<Record<string, any> | null>(null);

  const someAsyncFunc = useCallback(() => {
    logWithCount('in first use-callback');
    setTimeout(() => {
      const data = {foo: 'bar' };
      setSomeData(data);
    }, 1000);
  }, []);

  useEffect(() => {
    logWithCount('in first use-effect');
  });

  // infinite loop
  // useEffect(() => {
  //   logWithCount('in second use-effect', { count });
  //   if (count) {
  //     someAsyncFunc();
  //   }
  //   if (someData) {
  //     logWithCount('some data',  { someData });  
  //   }
  // }, [count, someAsyncFunc, someData]);


  // infinite loop fixed
  // useEffect(() => {
  //   logWithCount('in second use-effect', { count });
  //   if (count && !someData) {
  //     someAsyncFunc();
  //   }
  //   if (someData) {
  //     logWithCount('some data',  { someData });  
  //   }
  // }, [count, someAsyncFunc, someData]);

  
  // separate useEffects
  // useEffect(() => {
  //   logWithCount('in second use-effect', { count });
  //   if (count) {
  //     someAsyncFunc();
  //   }
  // }, [count, someAsyncFunc]);
  //
  // useEffect(() => {
  //   if(someData) {
  //     logWithCount('in third use-effect',  { someData });
  //   }
  // }, [someData]);

  // non-exhaustive deps
  // useEffect(() => {
  //   logWithCount(count);
  // }, []);
  //
  // const countRef = useRef<number>(count);
  // countRef.current = count;
  // useEffect(() => {
  //   logWithCount(countRef.current);
  // }, []);


  // const someAsyncFuncNoCallback = () => {
  //   logWithCount('in first use-callback');
  //   setTimeout(() => {
  //     const data = {foo: 'bar' };
  //     setSomeData(data);
  //   }, 1000);
  // };
  //
  // useEffect(() => {
  //   logWithCount('someAsyncFuncNoCallback', someAsyncFuncNoCallback.toString);
  // }, [someAsyncFuncNoCallback]);
  //
  // useEffect(() => {
  //   logWithCount('someAsyncFunc',someAsyncFunc.toString);
  // }, [someAsyncFunc]);


  // unnecessary useMemo
  // const someNumberMemo = useMemo(() => {
  //   logWithCount('in use-memo');
  //   return count + 5;
  // }, [count]);
  //
  // useEffect(() => {
  //   logWithCount('in use-effect with memo number', someNumberMemo);
  // }, [someNumberMemo]);
  //
  // const someNumber = count + 5;
  //
  // useEffect(() => {
  //   logWithCount('in use-effect without memo number', someNumber);
  // }, [someNumber]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{count}</h1>
        <button onClick={() => setCount(count => ++count)}>Increment</button>
      </header>
    </div>
  );
}

export default App;
