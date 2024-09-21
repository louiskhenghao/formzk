# `useDeepCompareEffect`

A modified useEffect hook that is using deep comparison on its dependencies instead of reference equality.

## Usage

```TypeScript
import { useCounter } from 'react-use';
import { useDeepCompareEffect } from '@formzk/core';

const Demo = () => {
  const [count, {inc: inc}] = useCounter(0);
  const options = { step: 2 };

  useDeepCompareEffect(() => {
    inc(options.step)
  }, [options]);

  return (
    <div>
      <p>useDeepCompareEffect: {count}</p>
    </div>
  );
};
```

## Reference

```TypeScript
useDeepCompareEffect(effect: () => void | (() => void | undefined), deps: any[]);
```
