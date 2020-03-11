export default <T extends any>(value: T, bindLabel: keyof T | ((item: T) => string) = 'name') =>
  typeof bindLabel === 'function' ? bindLabel(value) : value[bindLabel].toString();
