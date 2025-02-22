import { TestBed } from "@angular/core/testing";
import { MOCK_I18N_PROVIDERS } from "../setup";
import { ProjectComponent } from './project.component';

describe('Project component tests', function () {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectComponent],
      providers: [MOCK_I18N_PROVIDERS],
    });
  });

  it('should test project component', function () {
    let pc = TestBed.createComponent(ProjectComponent);
    expect(pc).toBeDefined();
    pc.detectChanges();
  });
});
