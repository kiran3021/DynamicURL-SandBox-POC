import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

//expect.extend(matchers);
import { vi } from 'vitest';

// Mock matchMedia globally
global.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  addListener: vi.fn(),
  removeListener: vi.fn(),
}));
