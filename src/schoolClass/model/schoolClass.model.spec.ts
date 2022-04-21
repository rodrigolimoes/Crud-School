import { SchoolClassModel } from './schoolClass.model';

describe('SchoolClass', () => {
  it('should be defined', () => {
    expect(new SchoolClassModel()).toBeDefined();
  });
});
