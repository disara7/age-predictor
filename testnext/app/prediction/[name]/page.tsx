import Navbar from '../../components/Navbar';
import { useEffect } from 'react';

const getPredictedAge = async (name: string) => {
  const res = await fetch(`https://api.agify.io/?name=${name}`);
  return res.json();
};

interface Params {
  params: { name: string };
}
export default async function Page({ params }: Params) {
  // Await the params before using them
  const awaitedParams = await Promise.resolve(params);
  const { name } = awaitedParams;

  // Fetch the predicted age for the given name
  const ageData = await getPredictedAge(name);

  return (
    <div>
      <div>
        <Navbar/>
        <div>Personal info:</div>
        <div>Age: {ageData?.age ? ageData.age : 'Age not available'}</div>
      </div>
    </div>
  );
}
