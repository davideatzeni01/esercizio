import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomColorChartService {

  randomColorPalette = [
    {
      backgroundColor: 'rgba(183,28,28,0.45)',
      borderColor: 'rgba(229,57,53 ,1)',
      pointBorderColor: 'rgba(229,115,115 ,1)',
      pointBackgroundColor: 'rgba(255,205,210 ,1)',
    },
    {
      backgroundColor: 'rgba(183,28,28,0.47)',
      borderColor: 'rgba(216,27,96 ,1)',
      pointBorderColor: 'rgba(240,98,146 ,1)',
      pointBackgroundColor: 'rgba(248,187,208 ,1)',
    },
    {
      backgroundColor: 'rgba(74,20,140,0.5)',
      borderColor: 'rgba(142,36,170 ,1)',
      pointBorderColor: 'rgba(186,104,200 ,1)',
      pointBackgroundColor: 'rgba(225,190,231 ,1)',
    },
    {
      backgroundColor: 'rgba(49,27,146,0.51)',
      borderColor: 'rgba(94,53,177 ,1)',
      pointBorderColor: 'rgba(149,117,205 ,1)',
      pointBackgroundColor: 'rgba(209,196,233 ,1)',
    },
    {
      backgroundColor: 'rgba(26,35,126,0.5)',
      borderColor: 'rgba(57,73,171 ,1)',
      pointBorderColor: 'rgba(121,134,203 ,1)',
      pointBackgroundColor: 'rgba(197,202,233 ,1)',
    },
    {
      backgroundColor: 'rgba(13,71,161,0.47)',
      borderColor: 'rgba(30,136,229 ,1)',
      pointBorderColor: 'rgba(100,181,246 ,1)',
      pointBackgroundColor: 'rgba(187,222,251 ,1)',
    },
    {
      backgroundColor: 'rgba(1,87,155,0.51)',
      borderColor: 'rgba(3,155,229 ,1)',
      pointBorderColor: 'rgba(79,195,247 ,1)',
      pointBackgroundColor: 'rgba(179,229,252 ,1)',
    },
    {
      backgroundColor: 'rgba(0,96,100,0.47)',
      borderColor: 'rgba(0,172,193 ,1)',
      pointBorderColor: 'rgba(77,208,225 ,1)',
      pointBackgroundColor: 'rgba(178,235,242 ,1)',
    },
    {
      backgroundColor: 'rgba(0,77,64,0.45)',
      borderColor: 'rgba(0,137,123 ,1)',
      pointBorderColor: 'rgba(77,182,172 ,1)',
      pointBackgroundColor: 'rgba(178,223,219 ,1)',
    },
    {
      backgroundColor: 'rgba(27,94,32,0.43)',
      borderColor: 'rgba(67,160,71 ,1)',
      pointBorderColor: 'rgba(129,199,132 ,1)',
      pointBackgroundColor: 'rgba(200,230,201 ,1)',
    },
    {
      backgroundColor: 'rgba(51,105,30,0.45)',
      borderColor: 'rgba(124,179,66 ,1)',
      pointBorderColor: 'rgba(174,213,129 ,1)',
      pointBackgroundColor: 'rgba(220,237,200 ,1)',
    },
    {
      backgroundColor: 'rgba(130,119,23,0.45)',
      borderColor: 'rgba(192,202,51 ,1)',
      pointBorderColor: 'rgba(220,231,117 ,1)',
      pointBackgroundColor: 'rgba(240,244,195 ,1)',
    },
    {
      backgroundColor: 'rgba(245,127,23,0.49)',
      borderColor: 'rgba(253,216,53 ,1)',
      pointBorderColor: 'rgba(255,241,118 ,1)',
      pointBackgroundColor: 'rgba(255,249,196 ,1)',
    },
    {
      backgroundColor: 'rgba(255,111,0,0.46)',
      borderColor: 'rgba(255,179,0 ,1)',
      pointBorderColor: 'rgba(255,213,79 ,1)',
      pointBackgroundColor: 'rgba(255,236,179 ,1)',
    },
    {
      backgroundColor: 'rgba(230,81,0,0.45)',
      borderColor: 'rgba(251,140,0 ,1)',
      pointBorderColor: 'rgba(255,183,77 ,1)',
      pointBackgroundColor: 'rgba(255,224,178 ,1)',
    },
    {
      backgroundColor: 'rgba(191,54,12,0.49)',
      borderColor: 'rgba(244,81,30 ,1)',
      pointBorderColor: 'rgba(255,138,101 ,1)',
      pointBackgroundColor: 'rgba(255,204,188 ,1)',
    },
  ];

  constructor() {
  }

  getRandomPaletteColor() {
    return this.randomColorPalette[Math.floor(Math.random() * this.randomColorPalette.length)];
  }
}
