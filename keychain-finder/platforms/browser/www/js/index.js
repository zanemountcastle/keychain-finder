prevRssi = 0;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.showScanningPage();
    },
    // Bind any events that are required on startup.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        FastClick.attach(document.body); // https://github.com/ftlabs/fastclick
        window.setInterval(function() { // Refresh stats for updated RSSI every 750ms
            app.refreshDeviceList();
        }, 750);
    },
    refreshDeviceList: function() {
        ble.scan([], 5, app.onDiscoverDevice, app.onError);
    },
    calculateDistance: function(rssiVal) {
        newRssi = Math.abs(rssiVal)

        if (prevRssi >= newRssi) {
            app.showGettingHotterPage();
            console.log("Getting hotter!");
        } else {
            app.showGettingColderPage();
            console.log("Getting colder!");
        }
        console.log("New RSSI: " + newRssi);
        console.log("Old RSSI: " + prevRssi);
        prevRssi = (newRssi + prevRssi)/2; // prevRssi is a moving average because RSSI values can vary
    },
    onDiscoverDevice: function(device) {
        deviceId = device.id;
        if (deviceId = "7B573452-B38E-416E-9A2A-E14BB9968CF1" && device.name != null) {
            console.log("\nFound: " + device.name + "\nuuid: " + device.id + "\nrssi: " + device.rssi);
            app.calculateDistance(device.rssi);
        }
    },
    onError: function(reason) {
        navigator.notification.alert(reason, null, 'Error');
    },
    showScanningPage: function() {
        scanningPage.hidden = false;
        gettingHotterPage.hidden = true;
        gettingColderPage.hidden = true;
    },
    showGettingHotterPage: function() {
      scanningPage.hidden = true;
      gettingHotterPage.hidden = false;
      gettingColderPage.hidden = true;
    },
    showGettingColderPage: function() {
      scanningPage.hidden = true;
      gettingHotterPage.hidden = true;
      gettingColderPage.hidden = false;
    },
};

app.initialize();
