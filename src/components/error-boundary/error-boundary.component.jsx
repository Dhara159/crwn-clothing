import React from 'react';

import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText } from './error-boundary.styles'

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  };

  componentDidCatch(error, info) {
    console.error(error);
  }

  render() {
    return this.state.hasErrored ?
      (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl='https://i.imgur.com/g3hgqe8.png' />
          <ErrorImageText> Oops, you found a broken page <span role='img' area-label='error-display'> &#9888; </span> </ErrorImageText>
        </ErrorImageOverlay>
      ) :
      this.props.children;
  }
};

export default ErrorBoundary;