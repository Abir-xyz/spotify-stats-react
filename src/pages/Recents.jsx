import { useDataContext } from '../context/UserData';

const Recents = () => {
  const { recentTracks } = useDataContext();
  console.log(recentTracks.items);

  return <div>Recents</div>;
};
export default Recents;
