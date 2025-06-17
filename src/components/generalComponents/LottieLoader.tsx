import { useEffect, useRef } from 'react';
import Player, { LottieRefCurrentProps } from 'lottie-react';
import pizzaAnimation from '../../assets/loadingLottieAsset4.json';

export default function LottieLoader({ style }: { style?: React.CSSProperties }) {
  const playerRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setSpeed(1.5);
    }
  }, []);

  return (
    <div style={{ width: 120, height: 120, margin: '0 auto', ...style }}>
      <Player
        autoplay
        loop
        lottieRef={playerRef}
        animationData={pizzaAnimation}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}