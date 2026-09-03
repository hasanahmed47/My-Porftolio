import {
  useEffect,
  useState,
} from "react";


let hasNavigated =
  false;


function useFirstRoute() {
  const [
    isFirstRoute,
    setIsFirstRoute,
  ] = useState(
    true
  );


  useEffect(() => {
    let previousPath =
      window.location.pathname;


    const update =
      () => {
        const newPath =
          window.location.pathname;


        if (
          !hasNavigated &&
          newPath !==
            previousPath
        ) {
          hasNavigated =
            true;

          setIsFirstRoute(
            false
          );
        }


        previousPath =
          newPath;
      };


    window.addEventListener(
      "popstate",
      update
    );

    window.addEventListener(
      "route-change",
      update
    );


    return () => {
      window.removeEventListener(
        "popstate",
        update
      );

      window.removeEventListener(
        "route-change",
        update
      );
    };
  }, []);


  return {
    isFirstRoute,
  };
}


export default useFirstRoute;