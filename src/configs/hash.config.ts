interface HashConfigType {
  application: {
    secret: string;
  };
}

export const HashConfig: HashConfigType = {
  application: {
    secret: process.env.APPLICATION_SECRET,
  },
};
