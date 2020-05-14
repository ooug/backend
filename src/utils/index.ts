export const log = (data: any) => {
  if (process.env.NODE_ENV !== 'production') console.log(data);
};

export const error = (data: any) => {
  if (process.env.NODE_ENV !== 'production') console.error(data);
};
