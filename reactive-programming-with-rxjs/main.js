const obs = Rx.Observable
  .interval(1000)
  .take(3)
  .map(v => v * 10);

obs
  .subscribe(index => console.log(`Subscriber: ${index}`));