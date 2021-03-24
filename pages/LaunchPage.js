export const commonSelectors = {

    // saved recipe icon for given recipe title
    resetBtn:
        node => (`(//button[@id='reset'])[${node}]`),
    leftBowlIndex:
        index => (`#left_${index}`),
    rightBowlIndex:
        index => (`#right_${index}`),
    coinNumber:
        number => (`#coin_${number}`),

};

class LaunchPage {


    get resetBtn() { return $(`${commonSelectors.resetBtn(2)}`)}

    get weightBtn() { return $('#weigh')}

    get resultOutput() { return $(`${commonSelectors.resetBtn(1)}`)}

    get gameInfoList() { return $$('.game-info li')}

    clickAndEnterNumbers(element, number) {
        element.waitForClickable()
        element.click()
        element.addValue(number)


    }

    waitAndClick(element) {
        element.waitForClickable()
        element.click()
    }

    clickResetBtn() {
        this.waitAndClick(this.resetBtn)
    }

    clickWeightBtn() {
        this.waitAndClick(this.weightBtn)
    }

    clickCoinNumberAndPrint(number) {
        this.waitAndClick($(commonSelectors.coinNumber(number)))
        console.log(`number of weighing: ${number}`);
    }


}

export default new LaunchPage();
