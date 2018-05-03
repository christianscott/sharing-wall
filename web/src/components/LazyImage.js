import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Img = styled.img`
  display: block;
  max-width: 100%;

  ${props => (props.shouldFadeIn ? `animation: ${fadeIn} 0.5s ease;` : "")};
`;

export default class LazyImage extends React.Component {
  state = { imageIsLoaded: false };

  /** @type {HTMLImageElement} */
  image = null;

  shouldFadeIn = true;

  componentDidMount() {
    this.image = new Image();
    this.image.addEventListener("load", this.handleImageLoad);
    this.image.src = this.props.src;

    if (this.image.complete) {
      this.shouldFadeIn = false;
    }
  }

  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleImageLoad);
  }

  render() {
    const { src, alt, ...rest } = this.props;

    return this.state.imageIsLoaded ? (
      <Img shouldFadeIn={this.shouldFadeIn} src={src} alt={alt} {...rest} />
    ) : null;
  }

  handleImageLoad = () => this.setState({ imageIsLoaded: true });
}
