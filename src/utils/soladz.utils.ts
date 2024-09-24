export const calculateRank = (solAmount: number) => {
    let rank = 'starter';
    if (solAmount >= 1) {
        rank = 'shrimp'
    }
    if (solAmount >= 10) {
        rank = 'Crab'
    }
    if (solAmount >= 100) {
        rank = 'octopus'
    }
    if (solAmount >= 200) {
        rank = 'fish'
    }
    if (solAmount >= 300) {
        rank = 'dolphin'
    }
    if (solAmount >= 500) {
        rank = 'shark'
    }
    if (solAmount >= 1000) {
        rank = 'whale'
    }
    return rank;
}