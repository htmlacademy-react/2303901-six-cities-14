import {useSelector} from 'react-redux';
import type {State} from '../types/type-store';

const useAppSelector = useSelector<State>;

export {useAppSelector};

