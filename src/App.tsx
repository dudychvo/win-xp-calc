import { useRef, useState } from 'react';
import './App.scss';

export const App = () => {
  const [query, setQuery] = useState<string>('');

  const calcRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('btn')) return;

    isDragging.current = true;
    offset.current = {
      x: e.clientX - (calcRef.current?.offsetLeft ?? 0),
      y: e.clientY - (calcRef.current?.offsetTop ?? 0),
    };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !calcRef.current) return;
    calcRef.current.style.left = `${e.clientX - offset.current.x}px`;
    calcRef.current.style.top = `${e.clientY - offset.current.y}px`;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const handleCharClick = (char: string) => {
    setQuery((prev) => prev + char);
  };

  const handleClear = () => setQuery('');
  const handleBackspace = () => setQuery((prev) => prev.slice(0, -1));

  const handleToggleSign = () => {
    setQuery((prev) => {
      if (!prev || prev === '0') return prev;
      return prev.startsWith('-') ? prev.slice(1) : '-' + prev;
    });
  };

  const handleSqrt = () => {
    setQuery((prev) => {
      if (!prev) return prev;
      const num = parseFloat(prev);
      if (num < 0) return 'Error';
      return Math.sqrt(num).toString();
    });
  };

  const handleReciprocal = () => {
    setQuery((prev) => {
      if (!prev) return prev;
      const num = parseFloat(prev);
      if (num === 0) return 'Error';
      return (1 / num).toString();
    });
  };

  const handleEquals = () => {
    setQuery((prev) => {
      if (!prev) return prev;
      try {
        const result = new Function('return ' + prev)();

        if (result === undefined || isNaN(result) || !isFinite(result)) {
          return 'Error';
        }
        return String(result);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return 'Error';
      }
    });
  };

  return (
    <>
      <div
        className='monitor-frame'
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <main className='screen'>
          <div className='calculator' ref={calcRef}>
            <div className='nav' onMouseDown={onMouseDown}>
              <img
                src='/nav/bar.svg'
                alt='Bar'
                className='nav-background'
                draggable='false'
              />
              <img
                src='assets/nav/minimize.svg'
                alt='Minimize'
                className='btn min'
              />
              <img src='/nav/maximize.svg' alt='Maximize' className='max' />
              <img src='/nav/close.svg' alt='Close' className='btn close' />
            </div>
            <div className='container'>
              <img
                src='/container.svg'
                alt='Contianer'
                className='c-background'
              />
              <div className='c-nav'>
                <span>
                  <u>E</u>dit
                </span>
                <span>
                  <u>V</u>iew
                </span>
                <span>
                  <u>H</u>elp
                </span>
              </div>
              <div className='display'>
                <input
                  type='text'
                  readOnly
                  placeholder='0'
                  value={query || ''}
                />
              </div>
              <div className='keys-one'>
                <img
                  src='/keys-one/nothing.svg'
                  alt='Nothing'
                  className='nothing'
                />
                <img
                  src='/src/assets/keys-one/backspace.svg'
                  alt='Backspace'
                  className='btn backspace'
                  onClick={handleBackspace}
                />
                <img
                  src='/src/assets/keys-one/CE.svg'
                  alt='CE'
                  className='btn ce'
                  onClick={handleClear}
                />
                <img
                  src='/src/assets/keys-one/C.svg'
                  alt='C'
                  className='btn c'
                  onClick={handleClear}
                />
              </div>
              <div className='keys-two'>
                <div className='strange'>
                  <img
                    src='/src/assets/strange/MC.svg'
                    alt='MC'
                    className=' btn mc'
                  />
                  <img
                    src='/src/assets/strange/MR.svg'
                    alt='MR'
                    className=' btn mr'
                  />
                  <img
                    src='/src/assets/strange/MS.svg'
                    alt='MS'
                    className=' btn ms'
                  />
                  <img
                    src='/src/assets/strange/M+.svg'
                    alt='M+'
                    className=' btn m+'
                  />
                </div>
                <div className='numbers'>
                  <img
                    src='/src/assets/numbers/7.svg'
                    alt='7'
                    className='btn'
                    onClick={() => handleCharClick('7')}
                  />
                  <img
                    src='/src/assets/numbers/8.svg'
                    alt='8'
                    className='btn'
                    onClick={() => handleCharClick('8')}
                  />
                  <img
                    src='/src/assets/numbers/9.svg'
                    alt='9'
                    className='btn'
                    onClick={() => handleCharClick('9')}
                  />
                  <img
                    src='/src/assets/numbers/4.svg'
                    alt='4'
                    className='btn'
                    onClick={() => handleCharClick('4')}
                  />
                  <img
                    src='/src/assets/numbers/5.svg'
                    alt='5'
                    className='btn'
                    onClick={() => handleCharClick('5')}
                  />
                  <img
                    src='/src/assets/numbers/6.svg'
                    alt='6'
                    className='btn'
                    onClick={() => handleCharClick('6')}
                  />
                  <img
                    src='/src/assets/numbers/1.svg'
                    alt='1'
                    className='btn'
                    onClick={() => handleCharClick('1')}
                  />
                  <img
                    src='/src/assets/numbers/2.svg'
                    alt='2'
                    className='btn'
                    onClick={() => handleCharClick('2')}
                  />
                  <img
                    src='/src/assets/numbers/3.svg'
                    alt='3'
                    className='btn'
                    onClick={() => handleCharClick('3')}
                  />
                  <img
                    src='/src/assets/numbers/0.svg'
                    alt='0'
                    className='btn'
                    onClick={() => handleCharClick('0')}
                  />
                  <img
                    src='/src/assets/numbers/+:-.svg'
                    alt='+/-'
                    className='btn'
                    onClick={handleToggleSign}
                  />
                  <img
                    src='/src/assets/numbers/dot.svg'
                    alt='.'
                    className='btn'
                    onClick={() => handleCharClick('.')}
                  />
                </div>
                <div className='operators'>
                  <img
                    src='/src/assets/operators/devide.svg'
                    alt='/'
                    className='btn'
                    onClick={() => handleCharClick('/')}
                  />
                  <img
                    src='/src/assets/operators/sqrt.svg'
                    alt='sqrt'
                    className='btn'
                    onClick={handleSqrt}
                  />
                  <img
                    src='/src/assets/operators/multiply.svg'
                    alt='*'
                    className='btn'
                    onClick={() => handleCharClick('*')}
                  />
                  <img
                    src='/src/assets/operators/percent.svg'
                    alt='%'
                    className='btn'
                    onClick={() => handleCharClick('%')}
                  />
                  <img
                    src='/src/assets/operators/minus.svg'
                    alt='-'
                    className='btn'
                    onClick={() => handleCharClick('-')}
                  />
                  <img
                    src='/src/assets/operators/1x.svg'
                    alt='1/x'
                    className='btn'
                    onClick={handleReciprocal}
                  />
                  <img
                    src='/src/assets/operators/plus.svg'
                    alt='+'
                    className='btn'
                    onClick={() => handleCharClick('+')}
                  />
                  <img
                    src='/src/assets/operators/equals.svg'
                    alt='='
                    className='btn'
                    onClick={handleEquals}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
