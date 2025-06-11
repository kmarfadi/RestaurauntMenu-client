import Player from 'lottie-react';
import pizzaAnimation from '../../assets/1fbvesCGBF.json';

export default function LottieLoader({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ width: 120, height: 120, margin: '0 auto', ...style }}>
      <Player
        autoplay
        loop
        animationData={pizzaAnimation}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}