import { createContext } from 'react';
import { bikesData } from '../../data/bikes';
const BikesContext = createContext(bikesData);

export default BikesContext;
