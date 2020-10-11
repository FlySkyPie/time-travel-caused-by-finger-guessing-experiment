import * as fs from 'fs';

if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
}

if (!fs.existsSync('./data/experiment2')) {
    fs.mkdirSync('./data/experiment2');
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

    array.forEach((value, index) => {
        if (index % Math.floor(peopleAmount / 100) === 0) {
            process.stdout.write('.');
        }
        for (let i = 0; i < trialTimesPerPeople; i++) {
            let randTrial = Math.floor(Math.random() * 100);
            value += (randTrial >= 50) ? 1 : -1;
            value = (value < 0) ? 0 : value;
            array[index] = value;
        }
    });
    process.stdout.write("\n");

    array.sort((a, b) => (b - a))
    saveData(array, "./data/experiment2/data" + j.toString() + ".txt");

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

    saveData(statistic, "./data/experiment2/distribution" + j.toString() + ".txt");
}