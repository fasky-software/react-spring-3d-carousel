import React, { Component } from "react";
import styled from "@emotion/styled";
import { Spring } from "react-spring/renderprops";

const SlideContainer = styled.div`
  position: absolute;
  height: 100%;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;

  img {
    object-fit: scale-down;
    display: block;
    max-height: 100%;
  }
`;

interface IProps {
  content: JSX.Element;
  offsetRadius: number;
  index: number;
  animationConfig: object;
}

interface IState {
  animationfinished: boolean;
}

export default class Slide extends Component<IProps, IState> {
  state: IState = {
    animationfinished: false
  };

  offsetFromCenter: any;
  totalPresentables: any;
  distanceFactor: any;

  componentWillMount() {
    const { index, offsetRadius } = this.props;
    let offsetFromCenter = index - offsetRadius;

    this.setState({
      animationfinished: Math.abs(offsetFromCenter / (offsetRadius + 1)) === 0
    });
  }

  render() {
    const { index, offsetRadius, animationConfig, content } = this.props;
    let offsetFromCenter = index - offsetRadius;
    const totalPresentables = 2 * offsetRadius + 1;
    const distanceFactor = 1 - Math.abs(offsetFromCenter / (offsetRadius + 1));
    const translateXoffset =
      50 * (Math.abs(offsetFromCenter) / (offsetRadius + 1));
    let translateX = -50;

    if (offsetRadius !== 0) {
      if (index === 0) {
        translateX = 0;
      } else if (index === totalPresentables - 1) {
        translateX = -100;
      }
    }

    if (offsetFromCenter > 0) {
      translateX += translateXoffset;
    } else if (offsetFromCenter < 0) {
      translateX -= translateXoffset;
    }

    return (
      <Spring
        onStart={() => this.setState({ animationfinished: false })}
        onRest={() => this.setState({ animationfinished: true })}
        to={{
          transform: `translateY(-50%) translateX(${translateX}%) scale(${distanceFactor})`,
          left: `${
            offsetRadius === 0
              ? 50
              : 50 + (offsetFromCenter * 50) / offsetRadius
          }%`,
          opacity: distanceFactor * distanceFactor
        }}
        config={animationConfig}
      >
        {style => (
          <SlideContainer
            style={{
              ...style,
              zIndex: Math.abs(Math.abs(offsetFromCenter) - 2)
            }}
          >
            {React.cloneElement(content, {
              ...content.props,
              animationfinished: this.state.animationfinished
            })}
          </SlideContainer>
        )}
      </Spring>
    );
  }
}

// export default function Slide({
//   content,
//   offsetRadius,
//   index,
//   animationConfig
// }: IProps) {
//   const offsetFromCenter = index - offsetRadius;
//   const totalPresentables = 2 * offsetRadius + 1;
//   const distanceFactor = 1 - Math.abs(offsetFromCenter / (offsetRadius + 1));
//   const [animationFinished, setAnimationFinished] = useSlidedHook(
//     Math.abs(offsetFromCenter / (offsetRadius + 1)) === 0,
//     useState
//   );
//   //const [animationFinished, setAnimationFinished] = useState<boolean>(false);
//   //   const [animationFinished, setAnimationFinished] = useState<boolean>(
//   //     Math.abs(offsetFromeCnter / (offsetRadius + 1)) === 0
//   //   );

//   const translateXoffset =
//     50 * (Math.abs(offsetFromCenter) / (offsetRadius + 1));
//   let translateX = -50;

//   if (offsetRadius !== 0) {
//     if (index === 0) {
//       translateX = 0;
//     } else if (index === totalPresentables - 1) {
//       translateX = -100;
//     }
//   }

//   if (offsetFromCenter > 0) {
//     translateX += translateXoffset;
//   } else if (offsetFromCenter < 0) {
//     translateX -= translateXoffset;
//   }

//   return (
//     <Spring
//       onStart={() => setAnimationFinished(false)}
//       onRest={() => setAnimationFinished(true)}
//       to={{
//         transform: `translateY(-50%) translateX(${translateX}%) scale(${distanceFactor})`,
//         left: `${
//           offsetRadius === 0 ? 50 : 50 + (offsetFromCenter * 50) / offsetRadius
//         }%`,
//         opacity: distanceFactor * distanceFactor
//       }}
//       config={animationConfig}
//     >
//       {style => (
//         <SlideContainer
//           style={{ ...style, zIndex: Math.abs(Math.abs(offsetFromCenter) - 2) }}
//         >
//           {React.cloneElement(content, {
//             ...content.props,
//             animationfinished: animationFinished
//           })}
//         </SlideContainer>
//       )}
//     </Spring>
//   );
// }
