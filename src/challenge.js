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

    challengeThree() {
        const fivePercOfInfectedByTime = this.discardDecimal(this.impact.infectionsByRequestedTime * 0.05);
        const fivePercOfSevereInfectedByTime = this.discardDecimal(this.severeImpact.infectionsByRequestedTime * 0.05);

        const twoPercOfInfectedByTime = this.discardDecimal(this.impact.infectionsByRequestedTime * 0.02);
        const twoPercOfSevereInfectedByTime = this.discardDecimal(this.severeImpact.infectionsByRequestedTime * 0.02);

        this.impact.casesForICUByRequestedTime = fivePercOfInfectedByTime;
        this.severeImpact.casesForICUByRequestedTime = fivePercOfSevereInfectedByTime;

        this.impact.casesForVentilatorsByRequestedTime = twoPercOfInfectedByTime;
        this.severeImpact.casesForVentilatorsByRequestedTime = twoPercOfSevereInfectedByTime;

        this.impact.dollarsInFlight = this.estimateDailyIncome(this.data, this.impact);
        this.severeImpact.dollarsInFlight = this.estimateDailyIncome(this.data, this.severeImpact);
    }

    estimateInfected(data, type) {
        
        const days = this.computeDays(data);
        const factor = this.discardDecimal(days / 3);
        let result = type.currentlyInfected * (Math.pow(2, factor));

        return result;
    }

    estimateDailyIncome(data, type) {
        const days = this.computeDays(data);

        let amount = this.discardDecimal((type.infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD) / days);

        return amount;
    }

    computeDays(data) {
        let days;

        if (data.periodType == 'days') {
            days = data.timeToElapse;
        } else if (data.periodType == 'weeks') {
            days = data.timeToElapse * 7;
        } else if (data.periodType == 'months') {
            days = data.timeToElapse * 30;
        } else {
            throw new Error(data.periodType + "  not a period time, expected: days, weeks or months");
        }
        return days;
    }
}

export default Challenge;