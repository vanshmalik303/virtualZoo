// src/components/ZooBanner.jsx
import { zooAudio } from '../utils/soundEffects';

export default function ZooBanner({
  timeOfDay,
  animals,
  onFeedAll,
  onCleanAll
}) {
  const hungryCount = animals.filter(a => a.hunger < 50).length;
  const dirtyCount = animals.filter(a => a.cleanliness < 50).length;
  const unhappyCount = animals.filter(a => a.happiness < 50).length;

  const greetings = {
    day: '☀️ Good day, Head Zookeeper! The sun is shining across the enclosures.',
    sunset: '🌅 Golden Hour at Safari Haven. Animals are relaxing as evening arrives.',
    night: '🌙 Starry night at the Sanctuary. Some residents are tucking in for sleep.'
  };

  const handleBatchFeed = () => {
    zooAudio.playFeedSound();
    onFeedAll();
  };

  const handleBatchClean = () => {
    zooAudio.playCleanSound();
    onCleanAll();
  };

  return (
    <div className={`zoo-banner banner-${timeOfDay}`}>
      <div className="banner-text-col">
        <h2 className="banner-greeting">{greetings[timeOfDay]}</h2>
        <div className="banner-alerts">
          {hungryCount > 0 && (
            <span className="banner-chip alert-hunger">
              🍖 {hungryCount} {hungryCount === 1 ? 'animal needs' : 'animals need'} feeding
            </span>
          )}
          {dirtyCount > 0 && (
            <span className="banner-chip alert-clean">
              🧼 {dirtyCount} {dirtyCount === 1 ? 'habitat needs' : 'habitats need'} sweeping
            </span>
          )}
          {unhappyCount > 0 && (
            <span className="banner-chip alert-unhappy">
              ❤️ {unhappyCount} {unhappyCount === 1 ? 'animal needs' : 'animals need'} play time
            </span>
          )}
          {hungryCount === 0 && dirtyCount === 0 && unhappyCount === 0 && (
            <span className="banner-chip alert-perfect">
              ✨ All animals are well-fed, joyful, and clean!
            </span>
          )}
        </div>
      </div>

      <div className="banner-quick-actions">
        {hungryCount > 0 && (
          <button className="quick-action-pill" onClick={handleBatchFeed}>
            🍖 Quick Feed All ({hungryCount})
          </button>
        )}
        {dirtyCount > 0 && (
          <button className="quick-action-pill" onClick={handleBatchClean}>
            ✨ Quick Clean All ({dirtyCount})
          </button>
        )}
      </div>
    </div>
  );
}
