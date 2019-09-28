import React, { FunctionComponent, Fragment } from "react";
interface ITestProps {
  animationfinished?: boolean;
}

export const Test: FunctionComponent<ITestProps> = props => {
  return (
    <Fragment>
      <p>{props!.animationfinished!.toString()}</p>
    </Fragment>
  );
};
