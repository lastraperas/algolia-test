import React from 'react';
import { connectStats } from 'react-instantsearch-dom';
import { formatNumber } from '../../utils';

const SaveFiltersMobile = ({ nbHits, onClick }) => (
  <button className="button button-primary" onClick={onClick}>
    Ver {formatNumber(nbHits)} resultados
  </button>
);

export default connectStats(SaveFiltersMobile);
