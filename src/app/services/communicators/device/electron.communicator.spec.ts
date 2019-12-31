import { TestBed } from '@angular/core/testing';

import { ElectronCommunicator } from './electron.communicator';

describe('ElectronCommunicator', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElectronCommunicator = TestBed.get(ElectronCommunicator);
    expect(service).toBeTruthy();
  });
});
