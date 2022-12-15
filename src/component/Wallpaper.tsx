import {WallpaperProps} from '../utils/Interface';
import {Transition} from 'react-transition-group';
import {useState} from 'react';

function Wallpaper({...props}: WallpaperProps) {
  const [images, setImages] = useState(props.images);
  const transitionStyles = {
    entering: {opacity: 1},
    entered: {opacity: 1},
    exiting: {opacity: 0},
    exited: {opacity: 0},
    unmounted: {opacity: 0},
  };

  return (
    <Transition
      in={props.images === images}
      onExited={() => {
        setImages(props.images);
      }}
      timeout={500}
    >
      {(state) => (
        <div
          className="wallpaper"
          style={{
            background: `url(${images})`,
            ...transitionStyles[state],
          }}
        ></div>
      )}
    </Transition>
  );
}

export default Wallpaper;
