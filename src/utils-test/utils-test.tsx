import {MemoryHistory, createMemoryHistory} from 'history';
import HistoryRouter from '../components/'
function withHistory (component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter></>
  )
}

export {withHistory};
