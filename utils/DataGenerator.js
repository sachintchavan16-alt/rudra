import crypto from 'crypto';

/** Generate random test data without pulling in an external faker library. */
export const DataGenerator = {
  string(length = 8) {
    return Math.random().toString(36).slice(2, 2 + length);
  },

  uuid() {
    return crypto.randomUUID();
  },

  int(min = 1, max = 1000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  email(domain = 'example.com') {
    return `user_${this.string(6)}@${domain}`;
  },

  phone() {
    return `9${this.int(100000000, 999999999)}`;
  },

  pick(array) {
    return array[this.int(0, array.length - 1)];
  },

  pastDate(daysBack = 30) {
    const d = new Date();
    d.setDate(d.getDate() - this.int(1, daysBack));
    return d.toISOString().split('T')[0];
  },
};
