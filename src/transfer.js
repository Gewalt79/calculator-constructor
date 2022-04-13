export const move = (source, destination, droppableSource, droppableDestination) => {
  console.log(source); //массив откуда
  console.log(destination); //массив куда
  console.log(droppableSource); //из изменного массива откуда берем объект получаем объект
  console.log(droppableDestination); //получаем массив куда закидываем и индекс места куда закидываем

  const sourceClone = Array.from(source); //копия массива из которого передается объект
  const destClone = Array.from(destination); //копия места куда будет перемещен объект
  const [removed] = sourceClone.splice(droppableSource.index, 1); //достает объект который мы удаляем

  const result = {};

  if (removed.index === '1') {
    //если объект который мы перемещаем является дисплеем
    removed.transfered = true;
    destClone.splice(0, 0, removed);
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
  } else {
    if (destClone[0] && destClone[0].index === '1' && droppableDestination.index === 0) {
      // если первый объект в массиве существует является дисплеем и цель перемещения является место дисплея
      removed.transfered = true;
      destClone.splice(droppableDestination.index + 1, 0, removed);
      result[droppableSource.droppableId] = sourceClone;
      result[droppableDestination.droppableId] = destClone;
    } else {
      removed.transfered = true;
      destClone.splice(droppableDestination.index, 0, removed); //добавляет объект коотрый мы перемещаем в копию масиива который является целью перемещения
      result[droppableSource.droppableId] = sourceClone; //массиву откуда забрали объект присваиваем копию
      result[droppableDestination.droppableId] = destClone;
    }
  }
  return result;
};

export const reorder = (items, startIndex, endIndex) => {
  //перемещение внутри столбика
  const result = Array.from(items);
  const [removed] = result.splice(startIndex, 1);

  if (removed.index === '1') {
    result.splice(0, 0, removed);
  } else {
    if (result[0].index === '1' && endIndex === 0) {
      result.splice(endIndex + 1, 0, removed);
    } else {
      result.splice(endIndex, 0, removed);
    }
  }
  return result;
};
