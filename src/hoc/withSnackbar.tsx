import * as React from "react";
import Snackbar from "../containers/Snackbar";

export default function withSnackbar(WrappedComponent: React.ComponentType) {
  return function () {
    return (
      <>
        <WrappedComponent />
        <Snackbar />
      </>
    );
  };
}
