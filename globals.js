export const urls = {
    baseUrl: 'http://ec2-54-208-152-154.compute-1.amazonaws.com/',
};

export const baseConfig = {
    waitForTimeout: parseInt(process.env.WAITFORTIMEOUT, 10) || 10000,
    pageLoadTimeout: parseInt(process.env.PAGELOAD, 10) || 120000,
};

export const alertText = 'Yay! You find it!'
