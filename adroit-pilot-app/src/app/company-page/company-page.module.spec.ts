import { CompanyPageModule } from './company-page.module';

describe('CompanyPageModule', () => {
  let companyPageModule: CompanyPageModule;

  beforeEach(() => {
    companyPageModule = new CompanyPageModule();
  });

  it('should create an instance', () => {
    expect(companyPageModule).toBeTruthy();
  });
});
