import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useSignal } from '@preact/signals';

const fakeify = (name: string) => {
  return {
    name,
    age: Math.ceil(Math.random() * 75),
  };
};

const Name = ({ name, onComplete }) => {
  const [fake, setFake] = useState(fakeify(name));

  useEffect(() => {
    const fi = fakeify(name);
    setFake(fi);
    setTimeout(() => {
      onComplete(fi);
    }, 1000);
  }, [name, onComplete]);
  console.log('NAME');
  return <h1>{name} is my name</h1>;
};

const Info = ({ info }) => {
  console.log('INFO');
  return <h3>... and my age is {info.age}</h3>;
};

function App() {
  // const [name, setName] = useState('empty');
  const name = useSignal('empty');
  const info = useSignal(undefined);

  useEffect(() => {
    setTimeout(() => {
      // setName('evan');
      name.value = 'evan';
    }, 1000);
  }, []);
  console.log('APP');
  return (
    <div>
      <Name
        name={name}
        onComplete={(x) => {
          info.value = x;
        }}
      />
      {!!info.value && <Info info={info.value} />}
    </div>
  );
}

render(<App />, document.getElementById('app') as HTMLElement);
