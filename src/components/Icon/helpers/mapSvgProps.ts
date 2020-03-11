import { CommonPathProps } from 'react-native-svg';

function camelToSnake(string) {
  return string
    .replace(/[\w]([A-Z])/g, function(m) {
      return m[0] + '-' + m[1];
    })
    .toLowerCase();
}

const objectPropsToString = (obj: any) =>
  Object.keys(obj)
    .filter(key => !!obj[key])
    .reduce((acc, key) => acc + ` ${camelToSnake(key)}="${obj[key]}"`, '');

export const mapSvgProps = (
  svgProps: { width?: number | string; height?: number | string } = { width: 40, height: 40 },
  pathProps: CommonPathProps,
  xml: string
) => {
  const svgTagEndMatch = xml.match(/svg.+>/)![0];
  const svgTagEndIndex = xml.indexOf(svgTagEndMatch) + svgTagEndMatch.length - 1;
  const pathTagEndMatch = xml.match(/path.+>/)![0];
  const pathTagEndIndex = xml.indexOf(pathTagEndMatch) + pathTagEndMatch.length - 2;
  const svg =
    xml.slice(0, svgTagEndIndex) +
    objectPropsToString(svgProps) +
    xml.slice(svgTagEndIndex, pathTagEndIndex) +
    objectPropsToString(pathProps) +
    xml.slice(pathTagEndIndex);
  return svg;
};
