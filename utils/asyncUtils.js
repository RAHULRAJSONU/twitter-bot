async function asyncForEach(arr,callback) {
    for (let i of arr) {
        console.log('Processing retwwet for account: ',i);
        const ref = await callback(url);
        console.log('ref---',ref);
    }
    console.log('Finished!');
}

module.exports = asyncForEach;