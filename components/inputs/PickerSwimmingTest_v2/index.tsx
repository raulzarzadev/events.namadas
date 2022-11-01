import Icon from '@comps/Icon';
import { ReactNode, useEffect, useState } from 'react';
import { DISTANCES, STYLES } from './SWIMMING_TESTS';
import { TestType } from './tests.model';
export interface PickerSwimmingTestType {
  tests?: TestType[];
  setTests?: (tests: TestType[]) => void;
  disabled?: boolean;
  compact?: boolean;
}
export default function PickerSwimmingTests({
  tests,
  setTests = () => {},
  disabled = false,
  compact = true,
}: PickerSwimmingTestType) {
  const [form, setForm] = useState<TestType[] | []>([]);

  // const handleAddTest = (test: TestType) => {
  //   if (testsAlreadyExist(test)) {
  //     const cleaned = form.filter(
  //       ({ distance, style }) =>
  //         !(test.distance === distance && style === test.style)
  //     );
  //     setTests(cleaned);
  //     setForm(cleaned);
  //   } else {
  //     setTests([...form, test]);
  //     setForm([...form, test]);
  //   }
  // };

  useEffect(() => {
    if (tests) {
      const distances = tests?.map(({ distance }) => parseInt(`${distance}`));
      setDistances([...new Set(distances)]);
    }
  }, [tests]);

  useEffect(() => {
    if (tests) {
      setForm(formatTest(tests));
    }
    return () => {
      setForm([]);
    };
  }, [tests]);

  const testsAlreadyExist = (test: { distance: any; style: any }) => {
    return !!form.find(
      ({ distance, style }) =>
        distance === test.distance && style === test.style
    );
  };

  const formatTest = (tests: TestType[]) =>
    tests.map((test) => {
      return { ...test, distance: parseInt(`${test.distance}`) };
    });

  const [newDistance, setNewDistance] = useState(50);

  const [distances, setDistances] = useState<number[]>([]);

  const handleChangeOptions = ({ target: { value, name } }: any) => {
    setNewDistance(parseInt(value));
  };

  const handleAddDistance = (distance: number) => {
    if (!distances.includes(distance)) setDistances([...distances, distance]);
  };
  const handleRemoveDistance = (distance: number) => {
    const filteredDistance = [...distances].filter((item) => item !== distance);
    handleRemoveDistanceTests(distance);
    setDistances(filteredDistance);
  };

  const handleRemoveDistanceTests = (distance: number) => {
    const testsRemoved = [...form].filter((test) => {
      return test.distance !== distance;
    });
    setForm(testsRemoved);
    setTests(testsRemoved);
    // console.log(testsRemoved)
  };

  const handleRemoveTest = (test: TestType) => {
    const testRemoved = [...form]?.filter(
      ({ distance, style }) =>
        !(distance === test.distance && style === test.style)
    );
    setForm(testRemoved);
    setTests(testRemoved);
  };

  const handleAddTest = (test: TestType) => {
    const testAdded = [...form, test];
    setForm(testAdded);
    setTests(testAdded);
  };

  return (
    <div>
      <div className="flex justify-evenly">
        <div className="flex items-center">
          <label className="label">
            <span className="label-text">Distance</span>
          </label>
          <input
            name="poolSize"
            type="number"
            className="input input-bordered w-14 input-xs mx-auto"
            onChange={handleChangeOptions}
            value={newDistance}
            min={0}
            max={99999}
            step={1}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddDistance(newDistance);
            }}
          >
            <Icon name="plus" />
          </button>
        </div>
      </div>
      <div className="flex w-full p-1 max-w-md mx-auto">
        <div className="flex flex-col w-16">
          <Cell size={compact ? 'md' : 'lg'} style="title">
            <div className="flex flex-col">
              <span className="text-right text-xs sm:text-sm">Style</span>
              <span className="text-right text-xs sm:text-sm">Distance</span>
            </div>
          </Cell>
          {distances.map((distance) => (
            <Cell key={distance} style="normal" size={compact ? 'sm' : 'lg'}>
              <span className={'flex justify-end w-full'}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveDistance(distance);
                  }}
                >
                  <Icon name="delete" size="xs" />
                </button>
                <span className='w-8 text-end'>
              {distance}
                </span>
              </span>{' '}
            </Cell>
          ))}
        </div>
        {STYLES.map(({ id: styleId, label, largeLabel }) => (
          <div key={styleId} className="flex flex-col w-1/6 ">
            <Cell size={compact ? 'md' : 'lg'} style="title">
              <div className="hidden sm:block">{largeLabel}</div>
              <div className="sm:hidden">{label}</div>
            </Cell>
            {distances.map((distance) => (
              <Cell size={compact ? 'sm' : 'lg'} style="normal" key={distance}>
                <div
                  className={`w-full h-full flex justify-center items-center p-1 `}
                >
                  <button
                    className={`w-full h-full  flex justify-center items-center ${
                      testsAlreadyExist({ distance, style: styleId })
                        ? 'bg-success text-success-content'
                        : ''
                    }`}
                    disabled={disabled}
                    onClick={(e) => {
                      e.preventDefault();
                      testsAlreadyExist({ distance, style: styleId })
                        ? handleRemoveTest({ distance, style: styleId })
                        : handleAddTest({ distance, style: styleId });
                    }}
                  >
                    {testsAlreadyExist({ distance, style: styleId }) ? (
                      <span>
                        <Icon name="done" size="xs" />
                      </span>
                    ) : (
                      <span>
                        <Icon name="cross" size="xs" />
                      </span>
                    )}
                  </button>
                </div>
              </Cell>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

interface PickerCell {
  children: ReactNode;
  style: 'normal' | 'title';
  size: 'sm' | 'md' | 'lg';
}
const Cell = ({ children, style = 'normal', size = 'md' }: PickerCell) => {
  const styling = {
    title: `font-bold  text-sm`,
    normal: `font-normal`,
  };
  const sizing = {
    sm: `h-6 text-xs`,
    md: `h-8 text-sm`,
    lg: `h-10`,
  };
  return (
    <div
      className={`
    ${styling[style]} ${sizing[size]} w-full  flex justify-center items-center `}
    >
      {children}
    </div>
  );
};
