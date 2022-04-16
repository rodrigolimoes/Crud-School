import { SchoolClassModel } from './school-class.model';

describe('SchoolClass', () => {
  it('should be defined', () => {
    expect(new SchoolClassModel()).toBeDefined();
  });
});
