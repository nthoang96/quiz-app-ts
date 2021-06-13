import Login from "../containers/Login";

export default function withLogin(WrappedComponent: React.ComponentType) {
  return function () {
    return (
      <>
        <WrappedComponent />
        <Login />
      </>
    );
  };
}
