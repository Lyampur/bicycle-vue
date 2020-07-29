const bike = (name, model, frame, fork, brakes, shifter, tires, speed, weight, price, image, url) =>
            ({name, model, frame, fork, brakes, shifter, tires, speed, weight, price, image, url});

const log = (text, type, date = new Date()) => ({text, type, date});

const bikes = [
  bike('Merida', 'Silex 300', 'Aluminium', 'Carbon', 'TRP Spyre',
        'Sram Apex1', 'Maxxis Rambler', '1x11', 9.9, '77 720', 'images/silex.jpg',
        'https://www.velosklad.ru/velosipedy/bike/19587/merida-silex-300/'),

  bike('Marin', 'Four Corners', 'CrMo', 'CrMo', 'TRP Spyre',
        'Shimano Sora', 'WTB Resolute', '3x9', 13.4, '72 450', 'images/four corners.jpg',
        'https://msk.mountainpeaks.ru/bike_shop/velosipedy/velosiped_marin_four_corners_2020/'),

  bike('PRIDE', 'Rocx Tour Dirt', 'CrMo', 'CrMo', 'TRP Spyre',
        'Sram Apex', 'Maxxis Ikon Skinwall', '2х10', 12.9, '89 800', 'images/tour dirt.jpg',
        'https://double-sports.ru/catalog/velosiped-pride-rocx-dirt-tour-green/'),

  bike('Cube', 'Attain SL', 'Aluminium', 'Carbon', 'Shimano 105 BR-R7070',
        'Shimano 105', 'Conti Ultra Sport', '2x11', 9.6, '113 800', 'images/attain.jpg',
        'https://www.velostrana.ru/cube/attain-sl/'),

  bike('Fairdale', 'Weekender Nomad', 'CrMo', 'CrMo', 'Avid BB7',
        'SRAM Rival', 'Continental Double Fighter', '1x11', 12.1, '89 400', 'images/nomad.jpg',
        'https://www.hellride.ru/catalog/velosipedy/velosiped-fairdale-weekender-nomad-27-5-2020-chernyy/'),

  bike('Cannondale', 'Topstone', 'Aluminium', 'Carbon', 'SRAM Apex 1 HRD',
        'SRAM Apex 1', 'WTB Nano', '1x11', 10.4, '141 540', 'images/topstone.jpg',
        'https://trial-sport.ru/goods/1411053.html'),
];

new Vue({
  el: '#app',
  data: {
    bikes: bikes,
    bike: bikes[0],
    bikeCompare: bikes[0],
    logs: [],
    selectedBikeIndex: 0,
    selectedCompareBikeIndex: 0,
    priceVisibility: false,
    priceCompareVisibility: false,
    search: '',
    modalVisibility: false,
    modalCompareVisibility: false,
    compare: false,
  },
  methods: {
    selectBike: function(index){
      this.bike = this.filteredBikes[index];
      this.selectedBikeIndex = index;
    },
    selectCompareBike: function(index){
      this.bikeCompare = this.filteredBikes[index];
      this.selectedCompareBikeIndex = index;
    },
    openUrl(){
      window.open(this.bike.url, "_blank");
      this.modalVisibility = false;
    },
    openCompareUrl(){
      window.open(this.bikeCompare.url, "_blank");
      this.modalCompareVisibility = false;
    },
    newOrder(){
      this.modalVisibility = false;
      this.logs.push(
        log(`Заказ оформлен - ${this.bike.name} ${this.bike.model}`, 'ok')
      )
    },
    cancelOrder(){
      this.modalVisibility = false;
      this.logs.push(
        log(`Заказ отменён - ${this.bike.name} ${this.bike.model}`, 'cnl')
      )
    },
  },
  computed: {
    bikeCompareBtnText(){
      return this.compare ? 'Просмотр выбранного' : 'Сравнить';
    },
    priceBtnText(){ // == priceBtnText: function(){...}
      return this.priceVisibility ? 'Скрыть цену' : 'Показать цену';
    },
    priceCompareBtnText(){ // == priceBtnText: function(){...}
      return this.priceCompareVisibility ? 'Скрыть цену' : 'Показать цену';
    },
    filteredBikes(){
      return this.bikes.filter((bike) => {
        return bike.name.toLowerCase().includes(this.search.toLowerCase()) || // str.includes(search) ==
               bike.model.toLowerCase().includes(this.search.toLowerCase())   // str.indexOf(search) > -1
      })
    },
  },
  filters: {
    date(value){
      return value.toLocaleString();
    },
  },
});
