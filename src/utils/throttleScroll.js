// "Funcao throttle e uma forma de não deixar a função ser chamada o tempo todo (várias vezes por segundo). Em vez disso, ela é chamada só a cada X milissegundos."

export function throttleScroll(callback, delay = 200) {
  let waiting = false;

  return function () {
    if (!waiting) {
      callback();
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, delay);
    }
  };
}
