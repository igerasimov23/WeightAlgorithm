import Launchpage from '../pages/LaunchPage'
import { commonSelectors } from '../pages/LaunchPage'
import * as globals from '../globals'


describe('Test', function () {

    before(() => {
        browser.url('');
    });


    it('Task 1', () => {
        const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]

        function compareTwoNumbers(numberOne, NumberTwo) {
            Launchpage.clickAndEnterNumbers($(commonSelectors.leftBowlIndex(numberOne)), numberOne)
            Launchpage.clickAndEnterNumbers($(commonSelectors.rightBowlIndex(NumberTwo)), NumberTwo)
            Launchpage.clickWeightBtn()
            getResult = Launchpage.resultOutput.getText()
            if (getResult === '<') {
                Launchpage.clickCoinNumberAndPrint(numberOne)
            } else {
                Launchpage.clickCoinNumberAndPrint(NumberTwo)
            }
        }

        function clickWeightAndGetText() {
            Launchpage.clickWeightBtn()
            let getResult = Launchpage.resultOutput.getText();
            Launchpage.clickResetBtn()
            return getResult;
        }

        for (let i = 0; i < 4; i++) {
            Launchpage.clickAndEnterNumbers($(commonSelectors.leftBowlIndex(numberArray[i])), numberArray[i])
        }
        for (let i = 4; i < 8; i++) {
            Launchpage.clickAndEnterNumbers($(commonSelectors.rightBowlIndex(numberArray[i])), numberArray[i])
        }


        let getResult = clickWeightAndGetText();

        if (getResult === '=') {
            // click on 8th number and verify
            Launchpage.clickCoinNumberAndPrint(8)
        } else if (getResult === '<') {
            // check left bowl
            for (let i = 0; i < 2; i++) {
                Launchpage.clickAndEnterNumbers($(commonSelectors.leftBowlIndex(numberArray[i])), numberArray[i])
            }
            for (let i = 2; i < 4; i++) {
                Launchpage.clickAndEnterNumbers($(commonSelectors.rightBowlIndex(numberArray[i])), numberArray[i])
            }
            getResult = clickWeightAndGetText();

            if (getResult === '<') {
                compareTwoNumbers(0, 1)
            } else {
                compareTwoNumbers(2, 3)
            }


        } else {
            // check right bowl
            for (let i = 4; i < 6; i++) {
                Launchpage.clickAndEnterNumbers($(commonSelectors.leftBowlIndex(numberArray[i])), numberArray[i])
            }
            for (let i = 6; i < 8; i++) {
                Launchpage.clickAndEnterNumbers($(commonSelectors.rightBowlIndex(numberArray[i])), numberArray[i])
            }


            getResult = clickWeightAndGetText();
            // loop last time
            if (getResult === '<') {
                compareTwoNumbers(4, 5)
            } else {
                compareTwoNumbers(6, 7)
            }


        }


        // compare and output alert text
        let alertText = browser.getAlertText()
        console.log(`Alert text: ${alertText}`);
        assert.equal(alertText, globals.alertText)

        // print game info
        console.log('Weighing were made:');
        Launchpage.gameInfoList.forEach(game => console.log(game.getText()))

    });

});
