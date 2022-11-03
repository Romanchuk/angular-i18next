import { TestBed } from "@angular/core/testing";
import { I18NextModule } from "../../lib";
import { I18N_PROVIDERS } from "../setup";
import { ProjectTestModule } from './projectTests.module';
import { ProjectComponent } from './project.component';

describe('Project component tests', function () {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18NextModule.forRoot(), ProjectTestModule],
      providers: [I18N_PROVIDERS],
    });
  });

  it('should test project component', function () {
    let pc = TestBed.createComponent(ProjectComponent);
    expect(pc).toBeDefined();
    pc.detectChanges();
  });
});

