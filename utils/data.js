export function mapDataFromOptions(options, key, value) {
    const pairs = {
        show: false,
    };

    options.forEach((item) => {
        pairs[item[key]] = item[value];
    });

    return pairs;
}
