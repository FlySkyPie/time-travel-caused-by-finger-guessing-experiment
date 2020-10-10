import * as fs from 'fs';
import { RandomWalkDistribution } from './RandomWalkDistribution';

if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
}

if (!fs.existsSync('./data/formular')) {
    fs.mkdirSync('./data/formular');
}

let max = 4700,
    resolution = 20,
    step = max / resolution,
    trialTimesPerPeople = 1000000,
    distribution = new Map(),
    randomWalkDistribution = new RandomWalkDistribution(trialTimesPerPeople);

for (let i = 0; i < resolution; i++) {
    let x = step * i;
    distribution.set(x, randomWalkDistribution.getPDF(x));
}

let string = "";
distribution.forEach((value, key) => {
    string += key.toString() + "," + value.toString() + "\n";
});

fs.writeFile("./data/formular/data.txt", string, (err) => {
    if (err) return console.log(err);
});