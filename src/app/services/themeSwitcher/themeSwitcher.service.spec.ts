import { TestBed } from "@angular/core/testing";

import { ThemeSwitcherService } from "./themeSwitcher.service";

describe("ThemeSwitcherService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ThemeSwitcherService = TestBed.get(ThemeSwitcherService);
    expect(service).toBeTruthy();
  });
});
