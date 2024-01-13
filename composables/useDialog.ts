export const useDialog = () => {
  const dialogAboutOpen = useState("dialogAboutOpen", () => false);

  const resolvePromise = useState<(value?: void) => void>("resolvePromise");

  function setResolvePromise(resolve: any) {
    resolvePromise.value = resolve;
  }

  const ok = () => {
    resolvePromise.value();
  };

  const open = async () => {
    return new Promise<void>(async (resolve, reject) => {
      dialogAboutOpen.value = true;
      setResolvePromise(resolve);
    }).then(() => {
      dialogAboutOpen.value = false;
    });
  };

  return {
    open,
    ok,
  };
};
