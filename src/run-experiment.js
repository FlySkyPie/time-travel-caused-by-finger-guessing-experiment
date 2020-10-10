import * as fs from 'fs';

if (!fs.existsSync('./data')){
    fs.mkdirSync('./data');
}

if (!fs.existsSync('./data/experiment')){
    fs.mkdirSync('./data/experiment');
}

/**
 * 
 * @param {array<number>} data 
 * @param {string} fileName 
 */
function saveData(data, fileName) {
    let string = "";
    data.forEach(value => {
        string += value.toString() + "\n";
    });

    fs.writeFile(fileName, string, (err) => {
        if (err) return console.log(err);
    });
}

let peopleAmount = 1000,
    trialTimesPerPeople = 1000000;

let array = new Array(peopleAmount).fill(0),
    statistic = new Array(20).fill(0);

for (let i = 0; i < peopleAmount * trialTimesPerPeople; i++) {
    let randIndex = Math.floor(Math.random() * 1000),
        randTrial = Math.floor(Math.random() * 100);

    array[randIndex] += (randTrial >= 50) ? 1 : -1;
    array[randIndex] = (array[randIndex] < 0) ? 0 : array[randIndex];
}

array.sort((a, b) => (b - a))
saveData(array, "./data/experiment/data1.txt");

let max = Math.max(...array),
    min = Math.min(...array),
    delta = Math.ceil((max - min) / 20);

    console.log(min,max);

array.forEach(value => {
    let index = Math.floor((value - min) / delta);
    index = (index === 20) ? 19 : index;
    statistic[index] += 1;
})

statistic.forEach((value, index) => {
    statistic[index] = (value / peopleAmount);
});
saveData(statistic, "./data/experiment/data2.txt");