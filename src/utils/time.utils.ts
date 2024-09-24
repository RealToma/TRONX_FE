export function calculateTimeLeft(targetDate: number) {
    const now = Date.now();
    const target = targetDate * 1000;
    const diff = target - now;
  
    let timeLeft = {
      days: '00',
      hours: '00',
      mins: '00',
      sec: '00'
    }
  
    if (diff <= 0) {
      return timeLeft;
    }
  
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60) / (1000)))
  
    if (days > 0) timeLeft.days = `${days}`;
    if (hours > 0) timeLeft.hours = `0${hours}`.substr(-2);
    if (minutes > 0) timeLeft.mins = `0${minutes}`.substr(-2);
    timeLeft.sec = `0${seconds}`.substr(-2);
  
    return timeLeft;
  }