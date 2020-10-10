import NormalDistribution from 'normal-distribution';

export class RandomWalkDistribution {
    constructor(trialsNumber) {
        this.times = trialsNumber;
        this.terms = 7;
    }

    getPDF(x) {
        let value = 0;
        for (let i = 0; i < this.terms; i++) {
            let standardDeviation = Math.sqrt(this.times / Math.pow(2, i));
            let normalDistribution = new NormalDistribution(0, standardDeviation);
            value += normalDistribution.pdf(x) / Math.pow(2, i);
        }
        return value;
    }
}