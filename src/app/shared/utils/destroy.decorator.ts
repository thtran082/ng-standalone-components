import { MonoTypeOperatorFunction, Subject, takeUntil } from 'rxjs';

export function Destroy(): ClassDecorator {
  return (instance: any) => {
    const originalDestroy = instance.prototype.ngOnDestroy;
    instance.prototype.destroy$ = new Subject();

    instance.prototype.ngOnDestroy = function (...args: any) {
      this.destroy$.next();
      this.destroy$.complete();
      if (originalDestroy) {
        originalDestroy.apply(this, args);
      }
    };
  };
}

export function autoDestroy<T>(instance: any): MonoTypeOperatorFunction<T> {
  return (req$) => req$.pipe(takeUntil(instance.destroy$));
}
