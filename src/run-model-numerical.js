import * as fs from 'fs';

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

/**
 * 
 * @param {array} data 
 * @param {number} times 
 */
function doResursion(data, trialTimesPerPeople) {
    //console.log('processing...', data.length.toString());
   // console.log('processing...', trialTimesPerPeople);
    data.fill(0);

    let times = data.length * trialTimesPerPeople;
    for (let i = 0; i < times; i++) {
        let randIndex = Math.floor(Math.random() * data.length),
            randTrial = Math.floor(Math.random() * 100);

        data[randIndex] += (randTrial >= 50) ? 1 : -1;
    }

    data.sort((a, b) => (b - a));
    let recomputeArray = data.filter(value => (value < 0));

    let secondaryArray = (recomputeArray.length) ? doResursion(recomputeArray, trialTimesPerPeople / 2) : [];
    let primdaryArray = data.filter(value => (value >= 0));
    return primdaryArray.concat(secondaryArray);
}
let peopleAmount = 1000,
    trialTimesPerPeople = 1000000;

let array = new Array(peopleAmount).fill(0),
    statistic = new Array(20).fill(0);

let result = doResursion(array,  trialTimesPerPeople);

saveData(result, "./data/model-numerical/data3.txt");
result.sort((a, b) => (b - a));
saveData(result, "./data/model-numerical/data1.txt");

let max = Math.max(...result),
    min = Math.min(...result),
    delta = Math.ceil((max - min) / 20);

result.forEach(value => {
    let index = Math.floor((value - min) / delta);
    index = (index === 20) ? 19 : index;
    statistic[index] += 1;
})

statistic.forEach((value, index) => {
    statistic[index] = (value / peopleAmount);
});
saveData(statistic, "./data/model-numerical/data2.txt");