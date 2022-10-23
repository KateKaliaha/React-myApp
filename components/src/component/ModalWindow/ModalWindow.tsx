import { ModalWindowProps } from 'data/types';
import React from 'react';
import { ModalCard } from './ModalCard/ModalCard';
import './ModalWindow.css';

export function ModalWindow({ closeModalWindow, movie }: ModalWindowProps): JSX.Element {
  return (
    <div className={'active-modal'} onClick={closeModalWindow} data-testid="modal">
      <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" data-testid="close-btn" onClick={closeModalWindow}>
          X
        </button>
        <ModalCard movie={movie} />
      </div>
    </div>
  );
}
