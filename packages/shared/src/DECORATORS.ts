export const logError = (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    try {
      const result = originalMethod.apply(this, args);

      if (result instanceof Promise) {
        return result.catch((err) => {
          console.error(`[${propertyKey}] async error:`, err);
        });
      }

      return result;
    } catch (err) {
      console.error(`[${propertyKey}] sync error:`, err);
      throw err;
    }
  };

  return descriptor;
}