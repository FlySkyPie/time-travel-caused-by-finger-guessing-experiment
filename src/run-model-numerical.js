import * as fs from 'fs';

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

/**
 * 
 * @param {array} data 
 * @param {number} times 
 */
function doResursion(data, trialTimesPerPeople) {
    process.stdout.write('processing ' + data.length.toString() + " data");
    //console.log('processing...', data.length.toString());
    // console.log('processing...', trialTimesPerPeople);
    data.fill(0);

    let times = data.length * trialTimesPerPeople;
    for (let i = 0; i < times; i++) {
        if (i % Math.floor(times / 100) === 0) {
            process.stdout.write('.');
        }
        let randIndex = Math.floor(Math.random() * data.length),
            randTrial = Math.floor(Math.random() * 100);

        data[randIndex] += (randTrial >= 50) ? 1 : -1;
    }
    process.stdout.write("\n");

    data.sort((a, b) => (b - a));
    let recomputeArray = data.filter(value => (value < 0));

    let secondaryArray = (recomputeArray.length) ? doResursion(recomputeArray, trialTimesPerPeople / 2) : [];
    let primdaryArray = data.filter(value => (value >= 0));
    return primdaryArray.concat(secondaryArray);
}

let peopleAmount = 1000,
    trialTimesPerPeople = 1000000,
    testTimes = 3;

for (let j = 1; j <= testTimes; j++) {
    console.log(`run test: ${j.toString()}/${testTimes}`);
    let array = new Array(peopleAmount).fill(0);

    let result = doResursion(array, trialTimesPerPeople);

    result.sort((a, b) => (b - a));
    saveData(result, "./data/model-numerical/data" + j.toString() + ".txt");

    let max = Math.max(...result),
        delta = Math.ceil(max / 20),
        statistic = new Map();

    result.forEach(value => {
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
    saveData(statistic, "./data/model-numerical/distribution" + j.toString() + ".txt");
}

