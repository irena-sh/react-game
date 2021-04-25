import { useEffect, useState } from "react";
import { fetchMode } from "./fetchMode";

function App() {
  const [mode, setModes] = useState([]);
  const [currentMode, setCurrentMode] = useState([]);
  const [fields, setFields] = useState([]);
  const [start, setStart] = useState({
    field: 0,
  });

  useEffect(() => {
    fetchMode().then(mode => {
      const data = Object.keys(mode).map((n, i) => { 
        return {
          name: n,
          field: mode[n].field,
        }
      })

      setModes(data)
    });
  }, [])
  
  const handleSelectMode = (event) => {
    const index = event.target.options.selectedIndex;
    const value = {
      name: index === 0 ? 'none' : mode[index - 1].name,
      field: index === 0 ? 0 : mode[index - 1].field,
    }

    setStart(value)
  }

  const handleStart = () => {
    const fields = start.name !== 'none' ?
      Array(start.field * start.field).fill({ hover: false }) :
      [];

    setFields(fields);
    setCurrentMode(start);
  }

  const handleHover = (event) => {
    const item = event.target;
    const num = Number(item.dataset.item);
    const data = [...fields];

    data[num] = { fill: !data[num].fill, id: num }
    setFields(data)
  }

  return (
    <section className="App">
      <div className="container">
        <h1>React Game With Hooks</h1>
        <div className="select-mode">
          <select onChange={handleSelectMode}>
            <option key="value-0" value="0">Pick mode</option>
            {mode.length > 0 && (
              mode.map((element, i) => <option value={element.name} key={i}>{element.name}</option>)
            )}
          </select>
          <button disabled={start.name !== 'none' ? false : 'disabled'} type="button" onClick={handleStart}>START</button>
        </div>
        <div className="stats">
          <div className={`board ${currentMode.name}`}>
            {fields.length > 0 && (
              fields.map((element, index) =>
                <div
                  key={`board-item-${index}`}
                  data-item={index}
                  onMouseEnter={handleHover}
                  className={`board-item ${element.fill === true ? 'blue' : ''}`}>  
                </div>
              )
            )}
          </div>
          <div className="selected-items">
            {fields.length > 0 && (
              fields.filter(e => e.fill).map((element, index) =>
                <span key={`span-${index}`}>
                  {`row-${Math.trunc(element.id / currentMode.field) + 1} col-${(element.id) % currentMode.field + 1}`}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
