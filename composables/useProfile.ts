export const useProfile = () => {
  const editProfileOpen = useState("editProfileOpen", () => false);

  const resolvePromise = useState<(value?: void) => void>(
    "editProfileResolvePromise"
  );

  function setResolvePromise(resolve: any) {
    resolvePromise.value = resolve;
  }

  const ok = () => {
    resolvePromise.value();
  };

  const open = async () => {
    return new Promise<void>(async (resolve, reject) => {
      editProfileOpen.value = true;
      setResolvePromise(resolve);
    }).then(() => {
      editProfileOpen.value = false;
    });
  };

  return {
    open,
    ok,
  };
};
