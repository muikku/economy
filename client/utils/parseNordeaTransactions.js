const maxFileSize = 300000;

/* https://stackoverflow.com/questions/34495796/javascript-promises-with-filereader */
const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const filereader = new FileReader();
    filereader.onload = () => {
      resolve(filereader.result);
    };
    if (file.size > maxFileSize) {
      reject(Error(`Max file size is ${maxFileSize}`));
    }
    filereader.onerror = reject;
    filereader.readAsText(file);
  });
};

const replaceWithCommaAndSplit = (str) => str.replace(/\s/g, '^').split('^');

const accumulate = (value1, value2) => Number((value1 + value2).toFixed(2));

const calculateMonths = (file) => {
  const split = file
    .split('\n')
    .filter((element) => element !== '' && element !== '\r');
  console.log('filtered and split: ', split);

  /* Remove account  */
  split.shift();

  const headers = replaceWithCommaAndSplit(split.shift());
  const restMapped = split.map((row) => {
    const fields = replaceWithCommaAndSplit(row);
    const result = {};
    headers.forEach((header, index) => {
      result[header] = fields[index];
    });
    return result;
  });
  const result = restMapped.reduce((previous, current) => {
    try {
      const date = current['Maksupäivä'];
      const month = date.substring(3, 5);
      const year = date.substring(6, 10);
      const key = `${month}/${year}`;
      const currentValue = Number(
        parseFloat(current['Määrä'].replace(',', '.')).toFixed(2)
      );
      const isPositive = currentValue >= 0;
      const accumulated = previous[key];
      if (accumulated) {
        const { spending, sum, income } = accumulated;
        const newValue = {
          name: key,
          sum: accumulate(sum, currentValue),
          spending: isPositive ? spending : accumulate(spending, currentValue),
          income: isPositive ? accumulate(income, currentValue) : income,
        };
        return { ...previous, [key]: newValue };
      } else {
        return {
          ...previous,
          [key]: {
            name: key,
            sum: currentValue,
            income: isPositive ? currentValue : 0,
            spending: isPositive ? 0 : currentValue,
          },
        };
      }
    } catch (error) {
      return previous;
    }
  }, {});
  return result;
};

const parseFiles = async (filesToUpload) => {
  try {
    const reading = Array.from(filesToUpload).map(async (file) => {
      return await readFile(file);
    });
    const textFiles = await Promise.all(reading);

    const result = textFiles.reduce((previous, current) => {
      const asObject = calculateMonths(current);
      return { ...previous, ...asObject };
    }, {});

    const final = Object.values(result).map((value, index) => ({
      ...value,
      spending: value.spending * -1,
      amt: index + 1,
    }));

    return final;
  } catch (error) {
    console.log(error);
  }
};

export default parseFiles;
