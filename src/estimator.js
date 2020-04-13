import Challenge from './challenge.js';

const impact = {}, severeImpact = {};

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
