import React, { Component } from "react";
import Carousel from "../components/Carousel";
import uuidv4 from "uuid";
import { config } from "react-spring";
import { Test } from "./Test";

let slides: Slide[] = [
  {
    key: uuidv4(),
    content: <Test />
  },
  {
    key: uuidv4(),
    content: <Test />
  },
  {
    key: uuidv4(),
    content: <Test />
  },
  {
    key: uuidv4(),
    content: <Test />
  },
  {
    key: uuidv4(),
    content: <Test />
  },
  {
    key: uuidv4(),
    content: <Test />
  },
  {
    key: uuidv4(),
    content: <Test />
  },
  {
    key: uuidv4(),
    content: <Test />
  }
];

export default class Example extends Component {
  state = {
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle
  };

  onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: parseInt(e.target.value, 10) || 0
    });
  };

  render() {
    return (
      <div style={{ width: "80%", height: "500px", margin: "0 auto" }}>
        <Carousel
          slides={slides}
          goToSlide={this.state.goToSlide}
          offsetRadius={this.state.offsetRadius}
          showNavigation={this.state.showNavigation}
          animationConfig={this.state.config}
        />
        <div
          style={{
            margin: "0 auto",
            marginTop: "2rem",
            width: "50%",
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <div>
            <label>Go to slide: </label>
            <input name="goToSlide" onChange={this.onChangeInput} />
          </div>
          <div>
            <label>Offset Radius: </label>
            <input name="offsetRadius" onChange={this.onChangeInput} />
          </div>
          <div>
            <label>Show navigation: </label>
            <input
              type="checkbox"
              checked={this.state.showNavigation}
              name="showNavigation"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({ showNavigation: e.target.checked });
              }}
            />
          </div>
          <div>
            <button
              onClick={(e: React.MouseEvent) => {
                this.setState({ config: config.gentle });
              }}
              disabled={this.state.config === config.gentle}
            >
              Gentle Transition
            </button>
          </div>
          <div>
            <button
              onClick={(e: React.MouseEvent) => {
                this.setState({ config: config.slow });
              }}
              disabled={this.state.config === config.slow}
            >
              Slow Transition
            </button>
          </div>
          <div>
            <button
              onClick={(e: React.MouseEvent) => {
                this.setState({ config: config.wobbly });
              }}
              disabled={this.state.config === config.wobbly}
            >
              Wobbly Transition
            </button>
          </div>
          <div>
            <button
              onClick={(e: React.MouseEvent) => {
                this.setState({ config: config.stiff });
              }}
              disabled={this.state.config === config.stiff}
            >
              Stiff Transition
            </button>
          </div>
        </div>
      </div>
    );
  }
}
