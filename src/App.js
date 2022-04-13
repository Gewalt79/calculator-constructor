import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { move, reorder } from './transfer'
import { items } from './items'
import Placeholder from './components/Placeholder';

import './App.css';

export default function App() {
  const queryAttr = 'data-rbd-drag-handle-draggable-id';
  const destinationQuertAttr = 'data-rbd-droppable-id';

  const [state, setState] = useState(items);
  const [placeholderProps, setPlaceholderProps] = useState({});

  const getDraggedDom = (draggableId) => {
    //получаем объект который переносим
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);
    return draggedDOM;
  };

  const getDestinationDom = (dropabbleId) => {
    //получаем место куда переносим объект
    const domQuery = `[${destinationQuertAttr}='${dropabbleId}']`;
    const destinationDOm = document.querySelector(domQuery);
    return destinationDOm;
  };

  const handleDragStart = (event) => {
    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) return;

    let objectY = parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop);
    setPlaceholderProps({
      objectY,
      objectX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft),
    });
  };

  const handleDragUpdate = (event) => {
    if (!event.destination) return;

    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) return;

    const destinationIndex = event.destination.index;
    const sourceIndex = event.source.index;

    const childrenArray = [...draggedDOM.parentNode.children];
    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);

    const droppedDom = getDestinationDom(event.destination.droppableId);
    const destinationChildrenArray = [...droppedDom.children];

    let updatedArray;
    if (draggedDOM.parentNode === droppedDom) {
      updatedArray = [
        ...childrenArray.slice(0, destinationIndex),
        movedItem,
        ...childrenArray.slice(destinationIndex + 1),
      ];
    } else {
      updatedArray = [
        ...destinationChildrenArray.slice(0, destinationIndex),
        movedItem,
        ...destinationChildrenArray.slice(destinationIndex + 1),
      ];
    }

    let objectY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      objectY,
      objectX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft),
    });
  };

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    const sourceInd = +source.droppableId; //индекс массива откуда перемещают объект
    const destInd = +destination.droppableId; //индекс массива куда перемещают объект

    if (sourceInd === destInd) {
      const items = reorder(state[sourceInd], source.index, destination.index);
      const newState = [...state];
      newState[sourceInd] = items;

      setState(newState);
    } else {
      const result = move(state[sourceInd], state[destInd], source, destination);
      const newState = [...state];

      newState[sourceInd] = result[sourceInd];
      newState[destInd] = result[destInd];

      setState(newState);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <DragDropContext
          onDragStart={handleDragStart}
          onDragUpdate={handleDragUpdate}
          onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable isDropDisabled={ind === 0 ? true : false} key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  className={snapshot.isDraggingOver && !el[0] ? 'dropzone active' : 'dropzone'}
                  ref={provided.innerRef}
                  {...provided.droppableProps}>
                  {el.map((item, index) => (
                    <Draggable key={item.index} draggableId={`${item.index}`} index={index}>
                      {(provided, snapshot) => (
                        <div
                          className={item.transfered ? 'dropped' : 'grabbable'}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {snapshot.isDraggingOver && (
                    <div
                      style={{
                        left: placeholderProps.objectX,
                        top: placeholderProps.objectY,
                        position: 'absolute',
                      }}>
                      <Placeholder />
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
