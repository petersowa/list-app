# Animated Todo Sample App

Simple todo app using CSS and style Animation in ReactJS with minimal libraries. Demonstrates the use of Animate container components to manage CSS transition state.

## Animate Component

Props needed are "hide: true || false". CSS class needs to be configured with "show" class.

### container class

.swing {
perspective: 100px;
}

### out state css

.swing li {
opacity: 0;
transform: rotateY(-90deg);
transition: all 0.5s cubic-bezier(0.36, -0.64, 0.34, 1.76);
}

### in state css

.swing li.show {
opacity: 1;
line-height: 1.5rem;
transform: none;
transition: all 0.5s cubic-bezier(0.36, -0.64, 0.34, 1.76);
}

## AnimateStyle Component

Props needed are "hide: true || false", "in" style, "out" style.

This component needs props passed with the "in" style and the "out" style. The element to be animated also needs to be contained in an initial Animation container to support perspective animation.

### container class

.swing {
perspective: 100px;
}

### in style - passed as prop to AnimateStyle

out = {
opacity: 0;
transform: rotateY(-90deg);
transition: all 0.5s cubic-bezier(0.36, -0.64, 0.34, 1.76);
}

### out style - passed as prop to AnimateStyle

in = {
opacity: 1;
line-height: 1.5rem;
transform: none;
transition: all 0.5s cubic-bezier(0.36, -0.64, 0.34, 1.76);
}
