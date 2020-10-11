import * as fs from 'fs';

if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
}

if (!fs.existsSync('./data/experiment')) {
    fs.mkdirSync('./data/experiment');
}

/**
 * 
 * @param {map<number, number>|array<number>} data 
 * @param {string} fileName 
 */
function saveData(data, fileName) {
    let string = "";
    data.forEach((value, key) => {
        string += key.toString() + ", " + value.toString() + "\n";
    });

    fs.writeFile(fileName, string, (err) => {
        if (err) return console.log(err);
    });
}

let peopleAmount = 1000,
    trialTimesPerPeople = 1000000,
    testTimes = 3;

for (let j = 1; j <= testTimes; j++) {
    console.log(`run test: ${j.toString()}/${testTimes}`);

    let array = new Array(peopleAmount).fill(0);
    let times = peopleAmount * trialTimesPerPeople;
    for (let i = 0; i < times; i++) {
        if (i % Math.floor(times / 100) === 0) {
            process.stdout.write('.');
        }
        let randIndex = Math.floor(Math.random() * 1000),
            randTrial = Math.floor(Math.random() * 100);

        array[randIndex] += (randTrial >= 50) ? 1 : -1;
        array[randIndex] = (array[randIndex] < 0) ? 0 : array[randIndex];
    }
    process.stdout.write("\n");

    array.sort((a, b) => (b - a))
    saveData(array, "./data/experiment/data" + j.toString() + ".txt");

    let max = Math.max(...array),
        delta = Math.ceil(max / 20),
        statistic = new Map();

    array.forEach(value => {
        let index = Math.floor(value / delta) * delta;
        if (statistic.has(index)) {
            let value = statistic.get(index) + 1;
            statistic.set(index, value);
        } else {
            statistic.set(index, 1);
        }
    })

    statistic.forEach((value, key) => {
        statistic.set(key, value / peopleAmount);
    });

    saveData(statistic, "./data/experiment/distribution" + j.toString() + ".txt");
}