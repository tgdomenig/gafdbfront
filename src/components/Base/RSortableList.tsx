import { Select } from "antd"
import './styles.css'
import { useEffect, useState } from "react";

type SortableListProps<T> = {
  items: T[],
  onChange: (sortedItems: T[]) => void,
  render: (item: T) => JSX.Element
}

export function RSortableList<T>({items, onChange, render}: SortableListProps<T>) {

  const n = items.length;

  useEffect(() => {
    const range = Array.from(Array(n).keys());
    setOptions(range.map(i => ({label: i+1, value: i})));
  }, [items])

  const [options, setOptions] = useState<{label: number, value: number}[]>([]);

  const shuffleItems = (toIx: number, fromIx: number) => { 

    const newIxs = shuffleIxs(options.map(opt => opt.value), fromIx, toIx);
    
    onChange(newIxs.map(ix => items[ix]))
  }

  if (items.length > 0) {
    return(
      <div>
        {items.map((item: T, i: number) => 
          <div key={"sortableList-" + i} >
            <div className={'itc-row'}>
              <Select style={{height: 32, margin: 0 }}options={options} value={i} onChange={(j: number) => shuffleItems(j, i)} />
              <div>{render(item)}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
  else {
    return( <div />);
  }
}

function shuffleIxs(range: number[], fromIx: number, toIx: number) {
  if (fromIx < toIx) {
    return(
      range.map(i => (i < fromIx || i > toIx) ? i : (i === toIx) ? fromIx : i + 1)
    );
  }
  else {
    return(
      range.map(i => (i < toIx || i > fromIx) ? i : (i === toIx) ? fromIx : i - 1)
    );
  }
}