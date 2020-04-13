class Challenge {
    constructor(data, impact, severeImpact) {
        this.data = data,
            this.impact = impact,
            this.severeImpact = severeImpact;
    }

    discardDecimal(number) {
        return parseInt(number);
    }

    challengeOne() {
        this.impact.currentlyInfected = (this.data.reportedCases) * 10;
        this.severeImpact.currentlyInfected = (this.data.reportedCases) * 50;

        this.impact.infectionsByRequestedTime = this.estimateInfected(this.data, this.impact);
        this.severeImpact.infectionsByRequestedTime = this.estimateInfected(this.data, this.severeImpact);

    }

    challengeTwo() {
        const fifteenP = this.discardDecimal(this.impact.infectionsByRequestedTime * 0.15);
        const severeFifteenP = this.discardDecimal(this.severeImpact.infectionsByRequestedTime * 0.15);

        this.impact.severeCasesByRequestedTime = fifteenP;
        this.severeImpact.severeCasesByRequestedTime = severeFifteenP;

        const availableBeds = this.discardDecimal(this.data.totalHospitalBeds * 0.35);

        this.impact.hospitalBedsByRequestedTime = availableBeds - this.impact.severeCasesByRequestedTime;
        this.severeImpact.hospitalBedsByRequestedTime = availableBeds - this.severeImpact.severeCasesByRequestedTime;
    }

    estimateInfected(data, type) {
        if (data.periodType == 'days') {
            data.timeToElapse = data.timeToElapse;
        } else if (data.periodType == 'weeks') {
            data.timeToElapse *= 7;
        } else if (data.periodType == 'months') {
            data.timeToElapse *= 30;
        } else {
            throw new Error(`${data.periodType} not a period time, expected: days, weeks or months`
                `${data.periodType} not a period time, expected: days, weeks or months`);
        }

        const factor = this.discardDecimal(data.timeToElapse / 3);
        let result = type.currentlyInfected * (Math.pow(2, factor));

        return result;
    }
}

export default Challenge;