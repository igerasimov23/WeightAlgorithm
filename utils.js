
export function setBrowser() {
    return process.env.BROWSER_NAME || 'chrome';
}

export function setPlatform() {
    return process.env.PLATFORM || 'macOS 10.13';
}

export function setBrowserVersion() {
    return process.env.BROWSER_VERSION || 'latest';
}


export function browserSizes(device) {
    let browsSize;
    const defaultSize = { width: 1200, height: 1000 };
    switch (device) {
        case 'desktop':
            browsSize = { width: 1200, height: 700 };
            break;
        default:
            browsSize = defaultSize;
    }
    return browsSize;
}

export function setViewportSize(device) {
    const browsSize = browserSizes(device);
    browser.setWindowSize(browsSize.width, browsSize.height);
}

export function setPageLoadStrategy() {
    return process.env.PAGE_LOAD || 'normal';
}

// config
export function capabConfig() {
    if (process.env.SELHOST === 'sauce' || process.env.SELENIUM_HOST === 'sauce') {
        return {
            browserName: this.setBrowser(),
            platformName: this.setPlatform(),
            browserVersion: this.setBrowserVersion(),
            pageLoadStrategy: this.setPageLoadStrategy,
            'sauce:options': {
                build: process.env.JOB_NAME ? `${process.env.JOB_NAME}:${process.env.BUILD_NUMBER}` : `WebdriverioCooking : ${new Date()}`,
                extendedDebugging: process.env.EXTENDDEBUG || false,
                commandTimeout: parseInt(process.env.COMMANDTIMEOUT, 10) || 300,
                idleTimeout: parseInt(process.env.IDLETIMEOUT, 10) || 180,
                maxDuration: parseInt(process.env.MAXDURATION, 10),
                screenResolution: '1600x1200',
            },
        };
    } else {
        return {
            browserName: this.setBrowser(),
        };
    }
}
