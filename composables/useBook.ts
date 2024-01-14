export const useBook = () => {
  const useBookOpen = useState("useBookOpen", () => false);
  const selectedBook = useState<any>("selectedBook", () => ({}));
  const clicked = useState("clicked", () => false);

  const resolvePromise = useState<(value?: void) => void>("useBookOpenPromise");

  function setResolvePromise(resolve: any) {
    resolvePromise.value = resolve;
  }

  function ok() {
    resolvePromise.value();
  }

  async function open(newSelectedBook: any) {
    selectedBook.value = newSelectedBook;
    return new Promise<void>(async (resolve, reject) => {
      useBookOpen.value = true;
      setResolvePromise(resolve);
    }).then(() => {
      useBookOpen.value = false;
    });
  }

  function getSelectedBook() {
    return selectedBook.value;
  }

  function useEventBus() {
    function triggerClick() {
      clicked.value = !clicked.value;
    }

    return {
      triggerClick,
    };
  }

  return {
    open,
    ok,
    getSelectedBook,
    useEventBus,
  };
};
