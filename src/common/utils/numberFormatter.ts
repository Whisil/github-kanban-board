const staticNumbers = [1000, 10000, 100000, 1000000];

export const formatNumber = (num: number) => {
    const numFormat = num.toLocaleString('en-US');

    if(num > staticNumbers[3]){
        return `${numFormat.split(',').shift()}M`
    } else if(num > staticNumbers[1] || num > staticNumbers[2]) {
        return `${numFormat.split(',').shift()}K`
    } else {
        return numFormat;
    }
}