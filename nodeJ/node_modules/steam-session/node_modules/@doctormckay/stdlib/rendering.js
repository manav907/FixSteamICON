"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressBar = void 0;
/**
 * Render an ASCII progress bar.
 * @param {number} value - The current value of this progress bar
 * @param {number} maxValue - The value at which the task is considered complete
 * @param {int} barWidth - How wide should the bar be, in characters
 * @param {boolean} [showPercentage=false]
 */
function progressBar(value, maxValue, barWidth, showPercentage = false) {
    barWidth -= 2; // subtract 2 from the width because the enclosing square brackets count toward the total width
    let filledChars = Math.round((value / maxValue) * barWidth);
    let pct = showPercentage ? ' ' + Math.round((value / maxValue) * 100) + '% ' : '';
    let pctPosition = Math.round((barWidth / 2) - (pct.length / 2)) + 1;
    let bar = '';
    for (let i = 1; i <= barWidth; i++) {
        if (pct && i == pctPosition) {
            bar += pct;
            i += pct.length - 1;
            continue;
        }
        if (i == filledChars && value < maxValue) {
            bar += '>';
        }
        else {
            bar += i <= filledChars ? '=' : ' ';
        }
    }
    return `[${bar}]`;
}
exports.progressBar = progressBar;
const Rendering = {
    progressBar
};
exports.default = Rendering;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL3JlbmRlcmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQTs7Ozs7O0dBTUc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxLQUFhLEVBQUUsUUFBZ0IsRUFBRSxRQUFnQixFQUFFLGNBQWMsR0FBRyxLQUFLO0lBQzdGLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQywrRkFBK0Y7SUFFOUcsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztJQUM1RCxJQUFJLEdBQUcsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2xGLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXBFLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLFdBQVcsRUFBRTtZQUM1QixHQUFHLElBQUksR0FBRyxDQUFDO1lBQ1gsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLFNBQVM7U0FDVDtRQUVELElBQUksQ0FBQyxJQUFJLFdBQVcsSUFBSSxLQUFLLEdBQUcsUUFBUSxFQUFFO1lBQ3pDLEdBQUcsSUFBSSxHQUFHLENBQUM7U0FDWDthQUFNO1lBQ04sR0FBRyxJQUFJLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQ3BDO0tBQ0Q7SUFFRCxPQUFPLElBQUksR0FBRyxHQUFHLENBQUM7QUFDbkIsQ0FBQztBQU9BLGtDQUFXO0FBTFosTUFBTSxTQUFTLEdBQWM7SUFDNUIsV0FBVztDQUNYLENBQUM7QUFNRixrQkFBZSxTQUFTLENBQUMifQ==