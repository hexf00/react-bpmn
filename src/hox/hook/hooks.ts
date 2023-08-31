import { FLOWABLE_PREFIX } from '@/bpmn/constant/constants';
import { createStore } from 'hox';

export const [useAppSelector, Provider] = createStore(() => {
  return {
    bpmn: {
      prefix: FLOWABLE_PREFIX,
    },
  };
});
