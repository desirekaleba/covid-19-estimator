import Challenge from './challenge';

const impact = {};
const severeImpact = {};

const covid19ImpactEstimator = (data) => {
  const challenge = new Challenge(data, impact, severeImpact);
  challenge.challengeOne();
  challenge.challengeTwo();
  challenge.challengeThree();

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
