import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <h3>Leaf Lounge is a space for book lovers to connect, discuss, and share their personal reflections on what they read.</h3>
    </div>
  );
}

export default AboutPage;
